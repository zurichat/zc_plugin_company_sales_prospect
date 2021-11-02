from deals.views import DealCreateView  # DealsStageListView,
from deals.views import (
    DealsBatchDeleteView,
    DealsDeleteView,
    DealsFilterListView,
    DealsListView,
    DealUpdateView,
    ReArrangeDeals,
)
from django.urls import path

urlpatterns = [
    path("deals/org/<str:org_id>/create/", DealCreateView.as_view()),
    path("deals/org/<str:org_id>/update/", DealUpdateView.as_view()),
    path("deals/org/<str:org_id>/", DealsListView.as_view()),
    path("deals/org/<str:org_id>/re-arrange/", ReArrangeDeals.as_view()),
    path("deals/org/<str:org_id>/delete/", DealsDeleteView.as_view()),
    path("deals/org/<str:org_id>/delete/batch/", DealsBatchDeleteView.as_view()),
    # path("stage/", DealsStageListView.as_view()),
    path("deals/org/<str:org_id>/filter/", DealsFilterListView.as_view()),
]
