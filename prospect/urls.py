from django.urls import path
from .views import ProspectsDetailView, ProspectsUpdateView, SearchProspects,ProspectsCreateView,WelcomeEmailView,ProspectsListView


urlpatterns = [
    path('search/<str:search>',SearchProspects, name='search'),
    path('create',ProspectsCreateView.as_view()),
    path('', ProspectsListView.as_view(), name="prospects"),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
    path('<str:id>/welcome/',WelcomeEmailView.as_view(),name='welcome_mail'),
    path('update/<str:id>', ProspectsUpdateView.as_view()),
] 

