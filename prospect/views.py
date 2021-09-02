from django.shortcuts import render
from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse

# Create your views here.

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
PLUGIN_NAME = settings.PLUGIN_NAME

def welcome(request):
    """
    this functions sends a welcome email to new leads
    """
    send_mail(
        subject = f'Welcome {request.user}',
        message = f'Hello {request.user} your account was successfully created'
,
        from_email = settings.EMAIL_HOST_USER,
        recipient_list = ['test1@dummy.com']
            )
    return JsonResponse({"message":"welcome mail has been sent successfully"})
