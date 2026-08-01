"""Reusable, query-efficient timetable conflict checks."""
from .models import Section


def intervals_overlap(day1, start1, end1, day2, start2, end2):
    """Intervals overlap only on the same day; back-to-back slots are valid."""
    return day1 == day2 and start1 < end2 and start2 < end1


def _conflicts(queryset, timeslot):
    return [section for section in queryset.select_related("timeslot", "course", "faculty", "room")
            if intervals_overlap(timeslot.day_of_week, timeslot.start_time, timeslot.end_time,
                                 section.timeslot.day_of_week, section.timeslot.start_time, section.timeslot.end_time)]


def check_room_clash(room, timeslot, semester, exclude_section_id=None):
    sections = Section.objects.filter(room=room, semester=semester)
    if exclude_section_id: sections = sections.exclude(pk=exclude_section_id)
    return _conflicts(sections, timeslot)


def check_faculty_clash(faculty, timeslot, semester, exclude_section_id=None):
    sections = Section.objects.filter(faculty=faculty, semester=semester)
    if exclude_section_id: sections = sections.exclude(pk=exclude_section_id)
    return _conflicts(sections, timeslot)


def check_capacity(room, course):
    return course.expected_strength > room.capacity


def validate_section(course, faculty, room, timeslot, semester, exclude_section_id=None):
    room_clashes = check_room_clash(room, timeslot, semester, exclude_section_id)
    faculty_clashes = check_faculty_clash(faculty, timeslot, semester, exclude_section_id)
    capacity_exceeded = check_capacity(room, course)
    return {"room_clashes": room_clashes, "faculty_clashes": faculty_clashes,
            "capacity_exceeded": capacity_exceeded,
            "is_valid": not (room_clashes or faculty_clashes or capacity_exceeded)}
