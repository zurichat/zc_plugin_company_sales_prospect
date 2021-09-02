from django.shortcuts import render
from django.conf import settings

from django.views import generic
from .models import Deal

class DealUpdateView(generic.UpdateView):
    template_name = 'edit.html'
    model = Deal
    fields = ()

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
PLUGIN_NAME = settings.PLUGIN_NAME
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
PLUGIN_NAME = settings.PLUGIN_NAME
