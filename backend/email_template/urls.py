from django.urls import path
from .views import EmailTemplateCreateView, EmailTemplateListView, EmailTemplateUpdateView, EmailTemplateDeleteView

urlpatterns = [
    path("create/",EmailTemplateCreateView.as_view(), name="create-template"),
    path("",EmailTemplateListView.as_view(), name="list-template"),
    path("update/<str:template_id>/",EmailTemplateUpdateView.as_view(),name="update-template"),
    path("delete/<str:template_id>/",EmailTemplateDeleteView.as_view(),name="delete-template")
]