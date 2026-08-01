from datetime import time
from django.core.management.base import BaseCommand
from timetable.models import Course, Department, Faculty, Room, Section, TimeSlot


class Command(BaseCommand):
    help = "Create realistic demo data, including intentional conflicts."
    def handle(self, *args, **options):
        Section.objects.all().delete(); TimeSlot.objects.all().delete(); Course.objects.all().delete(); Faculty.objects.all().delete(); Room.objects.all().delete(); Department.objects.all().delete()
        names = ["Computer Science", "Mathematics", "Physics", "Business", "Humanities"]
        departments = [Department.objects.create(name=name) for name in names]
        faculty = [Faculty.objects.create(name=f"Dr {chr(65+i)}", email=f"faculty{i}@college.edu", department=departments[i % 5]) for i in range(15)]
        rooms = [Room.objects.create(name=f"Room {100+i}", building="Academic Block" if i < 6 else "Science Block", capacity=30 + i * 10, has_projector=i % 2 == 0) for i in range(10)]
        courses = [Course.objects.create(code=f"{['CS','MA','PH','BU','HU'][i % 5]}{101+i}", name=f"{names[i % 5]} Studies {i+1}", department=departments[i % 5], expected_strength=25 + (i % 6) * 15) for i in range(30)]
        slots = [TimeSlot.objects.create(day_of_week=day, start_time=time(hour), end_time=time(hour+1)) for day in ("Mon","Tue","Wed","Thu","Fri","Sat") for hour in (9,10,11,12,14)]
        for i in range(50):
            Section.objects.create(course=courses[i % 30], faculty=faculty[i % 15], room=rooms[i % 10], timeslot=slots[i % len(slots)], semester="Fall 2026")
        # Intentional room and faculty conflicts for the audit page.
        Section.objects.create(course=courses[1], faculty=faculty[0], room=rooms[0], timeslot=slots[0], semester="Fall 2026")
        Section.objects.create(course=courses[2], faculty=faculty[0], room=rooms[1], timeslot=slots[0], semester="Fall 2026")
        self.stdout.write(self.style.SUCCESS("Demo data created: 5 departments, 15 faculty, 10 rooms, 30 courses and 52 sections."))
