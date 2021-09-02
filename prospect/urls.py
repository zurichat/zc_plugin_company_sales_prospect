from django.urls import path
from .views import ProspectsListView

urlpatterns = [
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
]