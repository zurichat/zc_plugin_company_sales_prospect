from django.urls import path
from .views import ProspectsDetailView
from . import views

urlpatterns = [
    path('search/<str:search>', views.SearchProspects, name='search'),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
] 