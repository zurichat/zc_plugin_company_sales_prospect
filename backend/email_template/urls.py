from django.urls import path
from email_template.views import (
    EmailDetailView,
    EmailSendView,
    EmailTemplateCreateView,
    EmailTemplateDeleteView,
    EmailTemplateListView,
    EmailTemplateUpdateView,
)

urlpatterns = [
    path("email-template/create/", EmailTemplateCreateView.as_view(), name="create-template"),
    path("email-template/<str:_id>/", EmailDetailView.as_view()),
    path("email-template/sendmail/<str:id>/", EmailSendView.as_view(), name="send-email"),
    path("email-template/", EmailTemplateListView.as_view(), name="list-template"),
    path(
        "email-template/update/<str:template_id>/",
        EmailTemplateUpdateView.as_view(),
        name="update-template",
    ),
    path(
        "email-template/delete/<str:template_id>/",
        EmailTemplateDeleteView.as_view(),
        name="delete-template",
    ),
]
