from django.urls import path
from .views import ProspectsDetailView,SearchProspects,ProspectsCreateView,ProspectsListView


urlpatterns = [
    path('search/<str:search>', SearchProspects, name='search'),
    path('create', ProspectsCreateView.as_view()),
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
    path('update/',views.ProspectsUpdateView.as_view()),
] 
