from django.urls import path
from deals.views import DealCreateView, DealListView

urlpatterns = [
  path("create/", DealCreateView.as_view()),
  path("list/", DealListView.as_view()),
]
