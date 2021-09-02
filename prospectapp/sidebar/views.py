from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings


@api_view(['GET'])
def sidebar(request):
    if request.method == 'GET':
        data = {
            "pluginId": settings.PLUGIN_ID,
            "pluginName": settings.PLUGIN_NAME,
            "organisationId": settings.ORGANIZATION_ID,
            "prospect":{
                "name": "prospect",
                "url": "https://sales.zuri.chat/prospect/"
            },
            "deals":{
                "name": "deals",
                "url": "https://sales.zuri.chat/deals/"
            }
        }
        return Response(data, status=status.HTTP_200_OK)