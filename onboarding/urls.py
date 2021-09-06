from django.urls import path
from .views import OnboardingCreateView


urlpatterns =[
    path('', OnboardingCreateView.as_view()),
]