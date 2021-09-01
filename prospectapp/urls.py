from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .sidebar.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",TemplateView.as_view(template_name='index.html')),
    path("sidebar/", sidebar),
    path('', include("prospect.urls")),
]
