from django.urls import path
from .views import ProspectsDetailView
from .views import *

urlpatterns = [
    path('search/<str:search>', SearchProspects, name='search'),
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
] 
