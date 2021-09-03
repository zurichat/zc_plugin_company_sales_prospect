from django.urls import path
from deals.views import DealCreateView, DealsListView

urlpatterns = [
  path("create/", DealCreateView.as_view()),
  path('list/', DealsListView.as_view(),),
]