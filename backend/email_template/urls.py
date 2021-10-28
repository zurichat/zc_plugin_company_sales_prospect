from django.urls import path
from email_template.views import (
    EmailTemplateCreateView,
    EmailTemplateListView,
    EmailTemplateUpdateView,
    EmailTemplateDeleteView,
    EmailSendView,
    EmailDetailView,
)

urlpatterns = [
    path("create/", EmailTemplateCreateView.as_view(), name="create-template"),
    path("<str:_id>/", EmailDetailView.as_view()),
    path("sendmail/<str:id>/", EmailSendView.as_view(), name="send-email"),
    path("", EmailTemplateListView.as_view(), name="list-template"),
    path(
        "update/<str:template_id>/",
        EmailTemplateUpdateView.as_view(),
        name="update-template",
    ),
    path(
        "delete/<str:template_id>/",
        EmailTemplateDeleteView.as_view(),
        name="delete-template",
    ),
]
