from datetime import time
from django.test import TestCase
from timetable.clash_detector import check_capacity, check_faculty_clash, check_room_clash, validate_section
from timetable.models import Course, Department, Faculty, Room, Section, TimeSlot


class ClashDetectorTests(TestCase):
    def setUp(self):
        self.department = Department.objects.create(name="Computing")
        self.faculty = Faculty.objects.create(name="Dr A", email="a@example.com", department=self.department)
        self.other_faculty = Faculty.objects.create(name="Dr B", email="b@example.com", department=self.department)
        self.course = Course.objects.create(code="CS101", name="Programming", department=self.department, expected_strength=40)
        self.room = Room.objects.create(name="R1", building="Main", capacity=50)
        self.other_room = Room.objects.create(name="R2", building="Main", capacity=20)
        self.morning = TimeSlot.objects.create(day_of_week="Mon", start_time=time(10), end_time=time(11))
        self.overlap = TimeSlot.objects.create(day_of_week="Mon", start_time=time(10, 30), end_time=time(11, 30))
        self.back_to_back = TimeSlot.objects.create(day_of_week="Mon", start_time=time(11), end_time=time(12))
        self.section = Section.objects.create(course=self.course, faculty=self.faculty, room=self.room, timeslot=self.morning, semester="Fall 2026")

    def test_same_room_overlapping_clashes(self): self.assertEqual(check_room_clash(self.room, self.overlap, "Fall 2026"), [self.section])
    def test_back_to_back_is_not_a_clash(self): self.assertFalse(check_room_clash(self.room, self.back_to_back, "Fall 2026"))
    def test_different_rooms_not_a_room_clash(self): self.assertFalse(check_room_clash(self.other_room, self.overlap, "Fall 2026"))
    def test_same_faculty_overlapping_clashes(self): self.assertEqual(check_faculty_clash(self.faculty, self.overlap, "Fall 2026"), [self.section])
    def test_capacity_violation(self): self.assertTrue(check_capacity(self.other_room, self.course))
    def test_excluding_edited_section(self): self.assertTrue(validate_section(self.course, self.faculty, self.room, self.morning, "Fall 2026", self.section.pk)["is_valid"])
