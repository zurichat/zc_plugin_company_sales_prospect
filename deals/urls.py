from django.urls import path
from .views import DealsListView

urlpatterns = [
    path('', DealsListView.as_view(), name="deals"),
] 