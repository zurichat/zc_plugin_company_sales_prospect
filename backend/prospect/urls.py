from django.urls import path
from .views import (
    ProspectsUpdateView,
    SearchProspects,
    ProspectsCreateView,
    WelcomeView,
    ProspectsListView,
    ProspectsDeleteView,
    ProspectsBatchDeleteView,
)


urlpatterns = [
    path("search/<str:search>/", SearchProspects, name="search"),
    path("<str:org_id>/create/", ProspectsCreateView.as_view()),
    path("<str:org_id>/", ProspectsListView.as_view(), name="prospects"),
    path("welcome/", WelcomeView.as_view(), name="welcome_mail"),
    path("update/", ProspectsUpdateView.as_view()),
    path("delete/batch/", ProspectsBatchDeleteView.as_view()),
    path("delete/<str:search>/", ProspectsDeleteView.as_view()),
]

# reminder to remove the org_id