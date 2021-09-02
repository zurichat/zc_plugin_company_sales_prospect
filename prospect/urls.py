from django.urls import path
from .views import ProspectsDetailView,SearchProspects,ProspectsCreateView,ProspectsListView,welcome


urlpatterns = [
    path('search/<str:search>',SearchProspects, name='search'),
    path('create',ProspectsCreateView.as_view()),
    path('welcome/',welcome,name='welcome_mail'),
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
] 

