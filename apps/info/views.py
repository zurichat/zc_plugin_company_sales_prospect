from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site


@api_view(['GET'])
def info(request):
    if request.method == 'GET':
        data = {
            "about":{
                "name": "about",
                "url": f"{get_current_site(request)}/sales/"
            }
        }
        return Response(data, status=status.HTTP_200_OK)