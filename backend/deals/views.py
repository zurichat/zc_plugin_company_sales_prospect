
from common.utils import centrifugo_post
from django.conf import settings
from deals.serializers import DealSerializer, DealUpdateSerializer
from rest_framework.views import APIView
import requests, json
from rest_framework.response import Response
from rest_framework import status as st
from common.utils import centrifugo_post #changed the import to a single import

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID



