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
from .info.views import AddUserToRoom, RoomsListView, RemoveUserFromRoom
from .sidebar.views import *
from .info import views
# from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'api/v1/sidebar/?$', sidebar),
    path('api/v1/info', views.info),

    path('register/', plugin_registration, name='register'),

    path('api/v1/onboarding/', include('onboarding.urls')),
    path("api/v1/deals/", include("deals.urls")),
    path('api/v1/prospects/', include('prospect.urls')),

    path('api/v1/api-auth/', include('rest_framework.urls')),
  
    path('api/v1/add-to-room/', AddUserToRoom.as_view()),
    path('api/v1/rooms/', RoomsListView.as_view()),
    path('api/v1/leave-room/', RemoveUserFromRoom.as_view()),
    path("deals/", include("deals.urls")),

    # DOCUMENTATION
    # path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    # path('api/v1/swagger-docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('api/v1/docs/', TemplateView.as_view(template_name='swagger.html', extra_context={'schema_url':'openapi-schema'}), name='swagger-ui'),
]

urlpatterns += static("zuri-root-config.js", document_root="react-spa/dist/zuri-root-config.js")
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]

