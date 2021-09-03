from django.urls import path
from deals.views import DealCreateView

urlpatterns = [
  path("create/", DealCreateView.as_view()),
]