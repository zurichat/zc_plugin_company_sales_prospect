from django.urls import path
from deals.views import (
    DealCreateView,
    DealUpdateView,
    DealsListView,
    DealsDeleteView,
    # DealsStageListView,
    DealsFilterListView,
)

urlpatterns = [
    path("create/", DealCreateView.as_view()),
    path("update/<str:id>/", DealUpdateView.as_view()),
    path("", DealsListView.as_view()),
    path("delete/<str:id>/", DealsDeleteView.as_view()),
    # path("stage/", DealsStageListView.as_view()),
    path("filter/<str:search>/", DealsFilterListView.as_view()),
]
