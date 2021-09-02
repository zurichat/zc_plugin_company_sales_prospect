from django.urls import path
from .views import ProspectsDetailView

urlpatterns = [
    path('<str:id>/', ProspectsDetailView.as_view(), name="detail prospects"),
] 
