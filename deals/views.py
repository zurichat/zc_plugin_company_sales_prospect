from django.shortcuts import render
from django.conf import settings
from deals.serializers import DealSerializer
from rest_framework.views import APIView
from rest_framework import status
import requests
import json
from rest_framework.response import Response
from rest_framework import status as st
#PLUGIN_ID = settings.PLUGIN_ID
#ORGANISATION_ID = settings.ORGANISATION_ID
#PLUGIN_NAME = settings.PLUGIN_NAME





class DealCreateView(APIView):
    """
    An endpoint to create a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/deals/create
    """

    serializer_class = DealSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/data/write"
        prospect_id = request.data['prospect_id']
        status = request.data['status']
        title = request.data['title']
        amount = request.data['amount']
        data = {
                "plugin_id": settings.PLUGIN_ID,
                "organization_id": settings.ORGANISATION_ID,
                "collection_name": "deals",
                "bulk_write": False,
                "payload": {
                    #"_id": _id,
                    "prospect_id":prospect_id,
                    "status":status,
                    "amount":amount,
                    "title":title,
                }
            }
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message':'Created deal object successfully!'}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Creation of deals failed... Try again later."}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)