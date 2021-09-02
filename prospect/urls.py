from django.urls import path
from .views import *

urlpatterns = [
    path('search/<str:search>', SearchProspects, name='search'),
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
]