from django.urls import path
from .views import ProspectsDetailView, ProspectsUpdateView, SearchProspects,ProspectsCreateView,welcome,ProspectsListView



urlpatterns = [
    path('search/<str:search>',SearchProspects, name='search'),
    path('create',ProspectsCreateView.as_view()),
    path('welcome/',welcome,name='welcome_mail'),
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
    path('update/', ProspectsUpdateView.as_view()),
] 

