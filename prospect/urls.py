from django.urls import path
from .views import (
    ProspectsDetailView,
    ProspectsUpdateView,
    SearchProspects,
    ProspectsCreateView,
    welcome,
    ProspectsListView,
    ProspectsDeleteView,
)


urlpatterns = [
    path('search/<str:search>/', SearchProspects, name='search'),
    path('create/', ProspectsCreateView.as_view()),
    path('', ProspectsListView.as_view(), name="prospects"),
    path('welcome/', welcome, name='welcome_mail'),
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
    path('update/<str:id>/', ProspectsUpdateView.as_view()),
    path('delete/<str:id>/', ProspectsDeleteView.as_view())
]
