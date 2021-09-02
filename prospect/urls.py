from django.urls import path
from .views import ProspectsDetailView
from .views import *

urlpatterns = [
    path('search/<str:search>', views.SearchProspects, name='search'),
    path('create',views.ProspectsCreateView.as_view()),
    path('welcome/',views.welcome,name='welcome_mail')
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
] 

