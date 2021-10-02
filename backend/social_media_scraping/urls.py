from django.urls import path
from .views import ScrapingCreateView

urlpatterns = [
    path('', ScrapingCreateView.as_view(), name="scraping"),
]