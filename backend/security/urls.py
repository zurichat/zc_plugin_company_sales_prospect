from django.urls import path
from .views import access_endoints

urlpatterns = [
    path("security/ ", access_endoints, name="security"),
    
]