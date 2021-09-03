from rest_framework import generics
from django.http import JsonResponse
from django.conf import settings
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import ProspectSerializer
import requests, json
import pandas as pd
from django.http import HttpResponse
import requests

from django.core.mail import send_mail


from django.http import HttpResponse
import requests


# Create your views here.
"""
This view shows how the plugin was registered
"""
def plugin_registration(request):
    url = "https://zccore.herokuapp.com/plugin/register"

    payload = {
    "name": "sales_prospects",
    "description": "A Sales Prospects Plugin",
    "template_url": "https://sales.zuri.chat",
    "sidebar_url": "https://sales.zuri.chat/sidebar",
    "install_url":  "https://sales.zuri.chat/install",
    "icon_url": "icon.png",
    "developer_email":"azeezsodiqkayode@gmail.com",
    "developer_name":"Sodiq Azeez"
    }
    working =True
    if working:
        return JsonResponse(data={
                'Message': 'This plugin has been registered on the marketplace',
                "plugin_id": "000000000000000000000000",
                "organization_id": "612a3a914acf115e685df8e3",
                "collection_name": "prospects",
                
            })



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
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ProspectsDetailView(APIView):
    serializer_class = ProspectSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/prospects/612a3a914acf115e685df8e3/"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:

            dataframe = pd.DataFrame(r['data'])
            dataframe.set_index('_id', inplace=True)
            detail_prospect_data = json.loads(dataframe.loc[kwargs["id"], :].to_json())
            detail_prospect_data['_id'] = kwargs["id"]
            serializer = ProspectSerializer(data=detail_prospect_data, many=False)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def SearchProspects(request, search):
    import requests
    url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/prospects/612a3a914acf115e685df8e3/"
    response = requests.request("GET", url)
    r = response.json()
    # response code should be 200
    if response.status_code == 200:    
        liste=[]
        for i  in r['data']:
            if (search in i['first_name']) or (search in i['last_name']) or (search in i['email']) or  (search in i['company']):
                liste.append(i)
        return JsonResponse(liste,safe=False)



class ProspectsCreateView(APIView):
    """
    Documentation here.
    """

    serializer_class = ProspectSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/data/write"
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        company = request.data['company']
        title = request.data['title']
        email = request.data['email']
        deal_stages = request.data['deal_stages']
        data = {
                "plugin_id": "000000000000000000000000",
                "organization_id": "612a3a914acf115e685df8e3",
                "collection_name": "prospects",
                "bulk_write": False,
                "payload": {
                    "first_name":first_name,
                    "last_name":last_name,
                    "company":company,
                    "title":title,
                    "email":email,
                    "deal_stages":deal_stages
                }
            }
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message':'successful'}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
      
      
def welcome(request):
    """
    this functions sends a welcome email to new leads
    still in development stage
    would configure it properly during production
    """
    send_mail(
        subject = f'Welcome {request.user}',
        message = f'Hello {request.user} your account was successfully created',
        from_email = settings.EMAIL_HOST_USER,
        recipient_list = ['test1@dummy.com']
            )
    return JsonResponse({"message":"welcome mail has been sent successfully"})      
    
   



class ProspectsUpdateView(APIView):
    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/data/write"
        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
                "plugin_id": "000000000000000000000000",
                "organization_id": "612a3a914acf115e685df8e3",
                "collection_name": "prospects",
                "bulk_write": False,
                "object_id":serializer.data.get("_id"),
                "payload": serializer.data
            }
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message':'successful'}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

