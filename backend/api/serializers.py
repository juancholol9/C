from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Report

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ReportSerializer(serializers.ModelSerializer):
    # Represent the teacher as a read-only field showing the username
    teacher = serializers.ReadOnlyField(source='teacher.username')

    class Meta:
        model = Report
        fields = ["id", "teacher", "student", "reason", "notes", "signed", "created_at"]
        extra_kwargs = {"teacher": {"read_only": True}}
