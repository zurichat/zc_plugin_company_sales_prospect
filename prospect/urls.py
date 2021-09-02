from django.urls import path
from . import views

urlpatterns = [
    path('search/<str:search>', views.SearchProspects, name='search'),
]