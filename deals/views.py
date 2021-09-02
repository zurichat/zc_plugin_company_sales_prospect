from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import DealSerializer
import requests, json

class DealCreateView(APIView):
    """
    This view write data to the ZuriCore API and returns a success message
    """

    serializer_class = DealSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/data/write"
        prospect_id = request.data['prospect_id']
        status = request.data['status']
        amount = request.data['amount']
        
        data = {
                "plugin_id": "000000000000000000000000",
                "organization_id": "612a3a914acf115e685df8e3",
                "collection_name": "deals",
                "bulk_write": False,
                "payload": {
                    "prospect_id":prospect_id,
                    "status":status,
                    "amount":amount,
                }
            }

        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message':'successful'}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class DealsListView(APIView):
    """
    Documentation here.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/deals/612a3a914acf115e685df8e3/"
        response = requests.request("GET", url)
        r = response.json()
        print(response.status_code)
        print(response) #new
        if response.status_code == 200:
            serializer = DealSerializer(data=r['data'], many=True)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


