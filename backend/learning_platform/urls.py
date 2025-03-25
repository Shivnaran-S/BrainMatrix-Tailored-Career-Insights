from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from courses.views import (UserViewSet, QuestionViewSet, CareerPathViewSet, 
                          CourseViewSet, UserResponseViewSet, BookingViewSet)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'career-paths', CareerPathViewSet, basename='careerpath')
router.register(r'courses', CourseViewSet, basename='course')
router.register(r'responses', UserResponseViewSet, basename='response')
router.register(r'bookings', BookingViewSet, basename='booking')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)