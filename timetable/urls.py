from django.urls import path
from . import views

app_name = "timetable"
urlpatterns = [
    path("", views.grid, name="grid"), path("timetable/", views.grid, name="grid"),
    path("sections/create/", views.section_create, name="section_create"), path("sections/check/", views.live_clash_check, name="live_check"),
    path("clashes/", views.clash_report, name="clash_report"), path("export/", views.export_excel, name="export"),
]
