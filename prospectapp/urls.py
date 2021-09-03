"""prospectapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from prospect.views import plugin_registration

from .sidebar.views import *
from .info import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path("sidebar/", sidebar),
    path('api/info', views.info),
    path('prospects/', include('prospect.urls')),
    path('register/', plugin_registration, name='register'),
    path("deals/", include("deals.urls")),
]
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

