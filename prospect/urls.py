from django.urls import path
<<<<<<< HEAD
from .views import ProspectsListView

urlpatterns = [
    path('prospects/', ProspectsListView.as_view(), name="prospects"),
=======
from . import views

urlpatterns = [
    path('search/<str:search>', views.SearchProspects, name='search'),
>>>>>>> 3db0fbe89b6800db0513225b4f17c57ff5c21a73
]