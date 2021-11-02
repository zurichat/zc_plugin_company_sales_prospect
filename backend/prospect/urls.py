from django.urls import path
from prospect.views import (
    ProspectsBatchDeleteView,
    ProspectsCreateView,
    ProspectsDeleteView,
    ProspectsListView,
    ProspectsUpdateView,
    WelcomeView,
    search_prospects,
)

urlpatterns = [
    path(
        "prospects/org/<str:org_id>/delete/<str:object_id>/",
        ProspectsDeleteView.as_view(),
    ),
    path("prospects/search/<str:search>/", search_prospects, name="search"),
    # path("search/<str:search>/", SearchProspects, name="search"),
    path("prospects/org/<str:org_id>/create/", ProspectsCreateView.as_view()),
    path("prospects/org/<str:org_id>/", ProspectsListView.as_view(), name="prospects"),
    path("prospects/welcome/", WelcomeView.as_view(), name="welcome_mail"),
    path(
        "prospects/org/<str:org_id>/update/<str:object_id>/",
        ProspectsUpdateView.as_view(),
    ),
    path(
        "prospects/org/<str:org_id>/delete/batch/", ProspectsBatchDeleteView.as_view()
    ),
    # path("details/<str:id>/", ProspectDetailsView.as_view()),
]

# reminder to remove the org_id
