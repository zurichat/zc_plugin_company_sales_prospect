"""conf URL Configuration

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

from common.views import SidebarView
from django.conf import settings

# from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from django.conf.urls.static import static
from django.contrib import admin
from django.conf.urls import url
from django.urls import include, path, re_path
from django.views.generic import TemplateView
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

SchemaView = get_schema_view(
    openapi.Info(
        title="Progress Tracker API",
        default_version="1.0.0",
        description="Tracks the progress of past interns",
        #   terms_of_service="https://www.google.com/policies/terms/",
        #   contact=openapi.Contact(email="contact@snippets.local"),
        #   license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("common.urls")),
    path("api/v1/", include("syncapp.urls")),
    path("api/v1/", include("deals.urls")),
    path("api/v1/", include("prospect.urls")),
    path("api/v1/", include("email_template.urls")),
    # path("api/v1/api-auth/", include("rest_framework.urls")),
    path("sidebar", SidebarView.as_view(), name="sidebar"),
    # DOCUMENTATION
    # path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    # path('api/v1/swagger-docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]

# urlpatterns += static("zuri-root-config.js", document_root="react-spa/dist/zuri-root-config.js")
# urlpatterns += static("/static/zuri-zuri-plugin-company-sales-prospects.js", document_root="react-spa/epictetus/dist/zuri-zuri-plugin-company-sales-prospects.js")
urlpatterns += [
    url(
        r"^swagger(?P<format>\.json|\.yaml)$",
        SchemaView.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    url(
        r"^api/v1/docs/$",
        SchemaView.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    url(
        r"^redoc/$", SchemaView.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
