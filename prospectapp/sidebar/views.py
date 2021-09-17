from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import requests
import json
from .json_data import *
### api/v1/sidebar?org=5336&user=Devjoseph&token=FGEZJJ-ZFDGB-FDGG

@api_view(['GET'])
def sidebar(request):
    if request.GET.get('token') and request.GET.get('user') and request.GET.get('org')  :
        token = request.GET.get('token')
        user_id = request.GET.get('user')
        org = request.GET.get('user')
        data = success_query(user_id, org, token)
        if data == 501:
            data = no_query_params()
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response(data, status=status.HTTP_200_OK)
    else:
        data = no_query_params()
        return Response(data, status=status.HTTP_200_OK)
        
        


