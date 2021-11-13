# from deals.views import DealCreateView  # DealsStageListView,
from deals.views import (
    DealsBatchDeleteView,
    Deals,
    DealsFilterListView,
    ReArrangeDeals,
    DealDetail,
)
from django.urls import path

urlpatterns = [
    path("org/<str:org_id>/deals/", Deals.as_view()),
    path("org/<str:org_id>/deals/re-arrange/", ReArrangeDeals.as_view()),
    path("org/<str:org_id>/deals/delete/batch/", DealsBatchDeleteView.as_view()),
    path("org/<str:org_id>/deals/filter/", DealsFilterListView.as_view()),
    path("org/<str:org_id>/deals/<str:object_id>/", DealDetail.as_view()),
    # path("stage/", DealsStageListView.as_view()),
]
