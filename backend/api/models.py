from django.db import models
from django.contrib.auth.models import User

class Report(models.Model):
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports")
    student = models.CharField(max_length=100)
    reason = models.CharField(max_length=200)
    notes = models.TextField(blank=True, null=True)  # Extra notes to the parent
    signed = models.BooleanField(default=False)       # Status of the report: signed or not signed
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.student} by {self.teacher.username}"
