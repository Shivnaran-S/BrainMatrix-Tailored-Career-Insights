from rest_framework import serializers
from .models import User, Question, CareerPath, Course, UserResponse, Booking

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'email', 'age', 'education', 'current_job']

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text', 'domain']

class CareerPathSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPath
        fields = ['id', 'name', 'description', 'skills_needed']

class CourseSerializer(serializers.ModelSerializer):
    career_path = CareerPathSerializer()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'career_path', 'level', 
                 'duration_hours', 'price', 'content', 'created_at']

class UserResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserResponse
        fields = ['id', 'user', 'question', 'answer']

class BookingSerializer(serializers.ModelSerializer):
    course = CourseSerializer()
    
    class Meta:
        model = Booking
        fields = ['id', 'user', 'course', 'booked_at', 'completed']