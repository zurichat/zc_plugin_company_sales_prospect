from django.urls import path
from deals.views import (
    DealCreateView,
    DealUpdateView,
    DealsListView,
    DealsDeleteView,
    # DealsStageListView,
    DealsFilterListView,
    ReArrangeDeals
)

urlpatterns = [
    path("create/", DealCreateView.as_view()),
    path("update/", DealUpdateView.as_view()),
    path("", DealsListView.as_view()),
    path("re-arrange/", ReArrangeDeals.as_view()),
    path("delete/", DealsDeleteView.as_view()),
    # path("stage/", DealsStageListView.as_view()),
    path("filter/", DealsFilterListView.as_view()),
]
