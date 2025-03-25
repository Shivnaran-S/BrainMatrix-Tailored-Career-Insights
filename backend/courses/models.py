from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.core.validators import MinValueValidator, MaxValueValidator
import joblib
import os
from django.conf import settings
import numpy as np
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    full_name = models.CharField(max_length=100)
    age = models.IntegerField(validators=[MinValueValidator(16), MaxValueValidator(100)])
    education = models.CharField(max_length=100)
    current_job = models.CharField(max_length=100, blank=True, null=True)
    
    # Adding related_name to prevent reverse accessor clashes
    groups = models.ManyToManyField(
        Group, 
        related_name='courses_user_set',  # Custom reverse accessor for groups
        blank=True
    )
    
    user_permissions = models.ManyToManyField(
        Permission, 
        related_name='courses_user_permissions_set',  # Custom reverse accessor for user_permissions
        blank=True
    )

    def __str__(self):
        return self.username

class Question(models.Model):
    text = models.CharField(max_length=255)
    domain = models.CharField(max_length=100)  # Technical, Creative, Business, etc.
    
    def __str__(self):
        return self.text

class CareerPath(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    skills_needed = models.TextField()
    
    def __str__(self):
        return self.name

class Course(models.Model):
    LEVEL_CHOICES = [
        ('B', 'Beginner'),
        ('I', 'Intermediate'),
        ('A', 'Advanced'),
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    career_path = models.ForeignKey(CareerPath, on_delete=models.CASCADE)
    level = models.CharField(max_length=1, choices=LEVEL_CHOICES)
    duration_hours = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class UserResponse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    
    class Meta:
        unique_together = ('user', 'question')
    
    def __str__(self):
        return f"{self.user.username} - {self.question.text} - {self.answer}"

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    booked_at = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('user', 'course')
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title}"

class CareerPrediction:
    @staticmethod
    def predict_career(user_id):
        # Load the trained model
        model_path = os.path.join(settings.BASE_DIR, 'courses', 'ml_model', 'classifier.pkl')
        model = joblib.load(model_path)
        
        # Get user responses
        responses = UserResponse.objects.filter(user_id=user_id)
        if not responses.exists():
            return None
            
        # Prepare input data for prediction
        answers = [r.answer for r in responses]
        input_data = np.array(answers).reshape(1, -1)
        
        # Make prediction
        prediction = model.predict(input_data)
        probabilities = model.predict_proba(input_data)
        
        return {
            'career_path': CareerPath.objects.get(id=prediction[0]),
            'confidence': round(probabilities[0][prediction[0]] * 100, 2)
        }