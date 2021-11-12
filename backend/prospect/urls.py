from django.urls import path
from prospect.views import (
    ProspectsBatchDeleteView,
    Prospects,
    ProspectDetail,
    WelcomeView,
    search_prospects,
)

urlpatterns = [
    path(
        "org/<str:org_id>/prospects/", Prospects.as_view(), name="create_get_prospects"
    ),
    path(
        "org/<str:org_id>/prospects/<str:object_id>/",
        ProspectDetail.as_view(),
    ),
    path(
        "org/<str:org_id>/prospects/delete/batch/", ProspectsBatchDeleteView.as_view()
    ),
    path("prospects/search/<str:search>/", search_prospects, name="search"),
    path("prospects/welcome/", WelcomeView.as_view(), name="welcome_mail"),
]

# reminder to remove the org_id
