from django.db import models

DAY_CHOICES = [(day, day) for day in ("Mon", "Tue", "Wed", "Thu", "Fri", "Sat")]


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self): return self.name


class Faculty(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="faculty")
    def __str__(self): return self.name


class FacultyUnavailability(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name="unavailability")
    day_of_week = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    reason = models.CharField(max_length=255, blank=True)
    def __str__(self): return f"{self.faculty} — {self.day_of_week} {self.start_time:%H:%M}-{self.end_time:%H:%M}"


class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    building = models.CharField(max_length=120)
    capacity = models.PositiveIntegerField()
    has_projector = models.BooleanField(default=False)
    def __str__(self): return f"{self.name} ({self.building})"


class Course(models.Model):
    code = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=200)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name="courses")
    expected_strength = models.PositiveIntegerField()
    def __str__(self): return f"{self.code} — {self.name}"


class TimeSlot(models.Model):
    day_of_week = models.CharField(max_length=3, choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    class Meta:
        unique_together = ("day_of_week", "start_time", "end_time")
        ordering = ["day_of_week", "start_time"]
    def __str__(self): return f"{self.day_of_week} {self.start_time:%H:%M}–{self.end_time:%H:%M}"


class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="sections")
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name="sections", db_index=True)
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="sections", db_index=True)
    timeslot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE, related_name="sections")
    semester = models.CharField(max_length=50, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        indexes = [models.Index(fields=["room", "semester"]), models.Index(fields=["faculty", "semester"])]
    def __str__(self): return f"{self.course} | {self.faculty} | {self.room} | {self.timeslot} ({self.semester})"
