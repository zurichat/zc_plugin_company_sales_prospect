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

# from django.views.static import serve as static_serve

@api_view(['GET'])
def sidebar(request):
    data = success_query()
    return Response(data, status=status.HTTP_200_OK)
    

# def serve(request, path, document_root=None, show_indexes=False):
#     """
#     An override to `django.views.static.serve` that will allow us to add our
#     own headers for development.

#     Like `django.views.static.serve`, this should only ever be used in
#     development, and never in production.
#     """
#     response = static_serve(request, path, document_root=document_root,
#         show_indexes=show_indexes)

#     response['Access-Control-Allow-Origin'] = '*'
#     return response