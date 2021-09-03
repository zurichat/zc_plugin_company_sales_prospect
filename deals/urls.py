from django.urls import path
from deals.views import DealCreateView, DealUpdateView

urlpatterns = [
  path("create/", DealCreateView.as_view()),
  path("update/<str:id>/", DealUpdateView.as_view()),
  path('list/', DealsListView.as_view())
]