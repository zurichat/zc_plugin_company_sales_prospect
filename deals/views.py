from django.shortcuts import render
from django.conf import settings

# Added generic view file and imported models
from django.views import generic
from .models import Deal


PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
PLUGIN_NAME = settings.PLUGIN_NAME

# Added UpdateView class
class DealUpdateView(generic.UpdateView):
    template_name = 'update.html'
    model = Deal
    fields = ()