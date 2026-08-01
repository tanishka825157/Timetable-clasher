from collections import defaultdict
from io import BytesIO

from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import redirect, render
from openpyxl import Workbook

from .clash_detector import validate_section
from .forms import SectionForm
from .models import Course, Department, Faculty, Room, Section, TimeSlot


def _filtered_sections(request):
    sections = Section.objects.select_related("course", "faculty", "room", "timeslot", "course__department")
    if request.GET.get("department"):
        sections = sections.filter(course__department_id=request.GET["department"])
    if request.GET.get("faculty"):
        sections = sections.filter(faculty_id=request.GET["faculty"])
    if request.GET.get("room"):
        sections = sections.filter(room_id=request.GET["room"])
    if request.GET.get("semester"):
        sections = sections.filter(semester=request.GET["semester"])
    return sections.order_by("timeslot__day_of_week", "timeslot__start_time")


@login_required
def section_create(request):
    form = SectionForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        form.save()
        return redirect("timetable:grid")
    return render(request, "timetable/section_form.html", {"form": form})


@login_required
def live_clash_check(request):
    values = {key: request.POST.get(key) for key in ("course", "faculty", "room", "timeslot", "semester")}
    if not all(values.values()):
        return render(request, "timetable/clash_partial.html", {"ready": False})
    try:
        result = validate_section(Course.objects.get(pk=values["course"]), Faculty.objects.get(pk=values["faculty"]),
                                  Room.objects.get(pk=values["room"]), TimeSlot.objects.get(pk=values["timeslot"]), values["semester"])
    except (Course.DoesNotExist, Faculty.DoesNotExist, Room.DoesNotExist, TimeSlot.DoesNotExist):
        return render(request, "timetable/clash_partial.html", {"ready": False})
    return render(request, "timetable/clash_partial.html", {"ready": True, "result": result})


@login_required
def grid(request):
    sections = list(_filtered_sections(request))
    days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    slots = list(TimeSlot.objects.order_by("start_time", "end_time").values_list("start_time", "end_time").distinct())
    clashes = set()
    for section in sections:
        check = validate_section(section.course, section.faculty, section.room, section.timeslot, section.semester, section.pk)
        if not check["is_valid"]: clashes.add(section.pk)
    cells = defaultdict(list)
    for section in sections: cells[(section.timeslot.start_time, section.timeslot.end_time, section.timeslot.day_of_week)].append(section)
    grid_rows = [{"label": f"{start:%H:%M}–{end:%H:%M}", "day_cells": [cells[(start, end, day)] for day in days]} for start, end in slots]
    return render(request, "timetable/grid.html", {"sections": sections, "days": days, "grid_rows": grid_rows, "clashes": clashes,
        "departments": Department.objects.all(), "faculty_list": Faculty.objects.all(), "rooms": Room.objects.all()})


@login_required
def clash_report(request):
    semester = request.GET.get("semester", "")
    sections = Section.objects.select_related("course", "faculty", "room", "timeslot").filter(semester=semester) if semester else Section.objects.none()
    room_pairs, faculty_pairs, capacity = [], [], []
    seen_room, seen_faculty = set(), set()
    for section in sections:
        result = validate_section(section.course, section.faculty, section.room, section.timeslot, section.semester, section.pk)
        for other in result["room_clashes"]:
            pair = tuple(sorted((section.pk, other.pk)))
            if pair not in seen_room: seen_room.add(pair); room_pairs.append((section, other))
        for other in result["faculty_clashes"]:
            pair = tuple(sorted((section.pk, other.pk)))
            if pair not in seen_faculty: seen_faculty.add(pair); faculty_pairs.append((section, other))
        if result["capacity_exceeded"]: capacity.append(section)
    return render(request, "timetable/clash_report.html", {"semester": semester, "semesters": Section.objects.values_list("semester", flat=True).distinct(), "room_pairs": room_pairs, "faculty_pairs": faculty_pairs, "capacity": capacity})


@login_required
def export_excel(request):
    workbook = Workbook(); sheet = workbook.active; sheet.title = "Timetable"
    sheet.append(["Day", "Time", "Course", "Faculty", "Room", "Semester"])
    for s in _filtered_sections(request): sheet.append([s.timeslot.day_of_week, f"{s.timeslot.start_time:%H:%M}–{s.timeslot.end_time:%H:%M}", s.course.code, s.faculty.name, s.room.name, s.semester])
    for cell in sheet[1]: cell.font = __import__("openpyxl").styles.Font(bold=True)
    output = BytesIO(); workbook.save(output)
    response = HttpResponse(output.getvalue(), content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    response["Content-Disposition"] = 'attachment; filename="timetable.xlsx"'
    return response
