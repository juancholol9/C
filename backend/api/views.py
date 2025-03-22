from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ReportSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Report

class ReportListCreate(generics.ListCreateAPIView):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return reports created by the logged-in teacher
        user = self.request.user
        return Report.objects.filter(teacher=user)

    def perform_create(self, serializer):
        # Automatically set the teacher field based on the logged-in user.
        if serializer.is_valid():
            serializer.save(teacher=self.request.user)
        else:
            print(serializer.errors)

class ReportDelete(generics.DestroyAPIView):
    serializer_class = ReportSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow deletion of reports created by the logged-in teacher
        user = self.request.user
        return Report.objects.filter(teacher=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
