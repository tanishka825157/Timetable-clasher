from django import forms
from .clash_detector import validate_section
from .models import Section


class SectionForm(forms.ModelForm):
    save_anyway = forms.BooleanField(required=False, label="Save anyway (override conflicts)")
    class Meta:
        model = Section
        fields = ["course", "faculty", "room", "timeslot", "semester"]
        widgets = {"semester": forms.TextInput(attrs={"placeholder": "e.g. Fall 2026"})}

    def clean(self):
        cleaned = super().clean()
        required = ("course", "faculty", "room", "timeslot", "semester")
        if all(cleaned.get(key) for key in required):
            result = validate_section(*(cleaned[key] for key in required), exclude_section_id=self.instance.pk)
            self.clash_result = result
            if not result["is_valid"] and not cleaned.get("save_anyway"):
                raise forms.ValidationError("Conflicts found. Select ‘Save anyway’ to explicitly override them.")
        return cleaned
