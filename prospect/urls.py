from django.urls import path
from .views import ProspectsListView,ProspectsCreateView

urlpatterns = [
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('prospects/create', ProspectsCreateView.as_view(), name="prospects"),
] 