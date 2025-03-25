from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import login, logout
from django.contrib.auth.hashers import make_password
from .models import User, Question, CareerPath, Course, UserResponse, Booking
from .serializers import (UserSerializer, QuestionSerializer, CareerPathSerializer, 
                         CourseSerializer, UserResponseSerializer, BookingSerializer)
from .models import CareerPrediction
import random

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        data = request.data
        data['password'] = make_password(data['password'])
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()
        
        if user and user.check_password(password):
            login(request, user)
            return Response({'message': 'Login successful'})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({'message': 'Logout successful'})

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class CareerPathViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CareerPath.objects.all()
    serializer_class = CareerPathSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    
    @action(detail=False, methods=['get'])
    def recommended(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        prediction = CareerPrediction.predict_career(request.user.id)
        if not prediction:
            return Response({'error': 'Complete assessment first'}, status=status.HTTP_400_BAD_REQUEST)
            
        courses = Course.objects.filter(career_path=prediction['career_path'])
        serializer = self.get_serializer(courses, many=True)
        return Response({
            'career_prediction': prediction,
            'courses': serializer.data
        })

class UserResponseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = UserResponse.objects.all()
    serializer_class = UserResponseSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BookingViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        course_id = self.request.data.get('course')
        if Booking.objects.filter(user=self.request.user, course_id=course_id).exists():
            raise serializers.ValidationError('Course already booked')
        serializer.save(user=self.request.user)