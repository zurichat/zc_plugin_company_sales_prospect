from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ProspectSerializer
import requests
import json

from rest_framework import filters
from rest_framework import generics
from django.http import JsonResponse
from django.conf import settings
# Create your views here.

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
PLUGIN_NAME = settings.PLUGIN_NAME

class ProspectsListView(APIView):
    """
    This view reads data from ZuriCore API and returns a list of available 
    prospects
    """

    serializer_class = ProspectSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/prospects/612a3a914acf115e685df8e3/"
        response = requests.request("GET", url)
        print(response.status_code)
        if response.status_code == 200:
            r = response.json()
            serializer = ProspectSerializer(data=r['data'], many=True)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={"message": "Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def SearchProspects(request, search):
    import requests
    url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/prospects/612a3a914acf115e685df8e3/"
    response = requests.request("GET", url)
    r = response.json()
    print(response.status_code)
    if response.status_code == 200:
        liste = []
        for i in r['data']:
            if (search in i['first_name']) or (search in i['last_name']) or (search in i['email']) or (search in i['company']):
                liste.append(i)
        return JsonResponse(liste, safe=False)


