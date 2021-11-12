from django.urls import path
from email_template.views import EmailDetail, EmailSendView, EmailTemplate

urlpatterns = [
    path(
        "org/<str:org_id>/email/", EmailTemplate.as_view(), name="create_get_templates"
    ),
    path(
        "org/<str:org_id>/email/<str:template_id>/",
        EmailDetail.as_view(),
        name="get_update_delete_template",
    ),
    path(
        "org/<str:org_id>/email/send/<str:id>/",
        EmailSendView.as_view(),
        name="send_email",
    ),
]
