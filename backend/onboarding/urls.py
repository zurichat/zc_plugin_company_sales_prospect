from django.urls import path
from .views import OnboardingCreateView, OnboardingListView

urlpatterns = [
    path('create/', OnboardingCreateView.as_view()),
    path('', OnboardingListView.as_view(), name="user_profile"),
]
