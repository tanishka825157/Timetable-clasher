from django.contrib import admin
from .models import Course, Department, Faculty, FacultyUnavailability, Room, Section, TimeSlot

@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin): search_fields = ("name",)
@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin): list_display = ("name", "email", "department"); search_fields = ("name", "email"); list_filter = ("department",)
@admin.register(FacultyUnavailability)
class FacultyUnavailabilityAdmin(admin.ModelAdmin): list_display = ("faculty", "day_of_week", "start_time", "end_time", "reason"); list_filter = ("day_of_week",)
@admin.register(Room)
class RoomAdmin(admin.ModelAdmin): list_display = ("name", "building", "capacity", "has_projector"); search_fields = ("name", "building")
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin): list_display = ("code", "name", "department", "expected_strength"); search_fields = ("code", "name"); list_filter = ("department",)
@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin): list_display = ("day_of_week", "start_time", "end_time"); list_filter = ("day_of_week",)
@admin.register(Section)
class SectionAdmin(admin.ModelAdmin): list_display = ("course", "faculty", "room", "timeslot", "semester"); list_filter = ("semester", "faculty", "room"); search_fields = ("course__code", "course__name", "faculty__name")
