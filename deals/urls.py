from django.urls import path
from deals.views import (
  DealCreateView, DealUpdateView, 
  DealsListView, DealsDetailView, 
  DealsDeleteView, DealsStageListView,
  DealsFilterListView
  )

urlpatterns = [
  path("create/", DealCreateView.as_view()),
  path("update/<str:id>/", DealUpdateView.as_view()),
  path('', DealsListView.as_view()),
  path('<str:id>/', DealsDetailView.as_view()),
  path("delete/<str:id>/",  DealsDeleteView.as_view()),
  path("stages/<str:stage>/",  DealsStageListView.as_view()),
  path("filters/<str:filter>/",  DealsFilterListView.as_view()),
]