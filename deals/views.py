from django.shortcuts import render
from django.conf import settings
from deals.serializers import DealSerializer
from rest_framework.views import APIView
from django.http import JsonResponse
import requests
import json
from rest_framework.response import Response
from rest_framework import status as st

# Added Import
import pandas as pd

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
        url = "https://api.zuri.chat/data/write"
        
        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
                "plugin_id": "613b677d41f5856617552f1e",
                "organization_id": "613a495f59842c7444fb0246",
                "collection_name": "deals",
                "bulk_write": False,
                "payload": {
                    "prospect_id":serializer.data.get("prospect_id"),
                    "name":serializer.data.get("name"),
                    "deal_stage": serializer.data.get("deal_stage"),
                    "amount":serializer.data.get("amount"),
                    "activity":serializer.data.get("activity"),
                    "description":serializer.data.get("description"),
                }
            }
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        # print(r)
        if response.status_code == 201:
            return Response(data={'message':'Created deal object successfully!',"deal_created":r['data']}, status=st.HTTP_201_CREATED)
        return Response(data={"message":"Creation of deals failed... Try again later."}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)

class DealUpdateView(APIView):
    """
    An endpoint to update a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/api/v1/deals/update/{id}/
    """
    serializer_class = DealSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
                "plugin_id": "613b677d41f5856617552f1e",
                "organization_id": "613a495f59842c7444fb0246",
                "collection_name": "deals",
                "bulk_write": False,
                "object_id":serializer.data.get("_id"),
                "payload": {
                    "prospect_id": serializer.data.get("prospect_id"),
                    "status": serializer.data.get("status"),
                    "amount": serializer.data.get("amount"),
                    "title": serializer.data.get("title")
                }
            }
        response = requests.request("PUT", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message':'successful'}, status=st.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)
      
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
            return Response(data=serializer.data, status=st.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)  


class DealsStageListView(APIView):
    """
    Returns the available deals by the stage they are in the pipeline.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://api.zuri.chat/data/read/613b677d41f5856617552f1e/deals/613a495f59842c7444fb0246/"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            output_data = [data for data in r['data'] if data['deal_stage'] == kwargs['stage']]
            return Response(data=output_data, status=st.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)


# Added detail view
class DealsDetailView(APIView):
    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/deals/612a3a914acf115e685df8e3/"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:

            dataframe = pd.DataFrame(r['data'])
            dataframe.set_index('_id', inplace=True)
            detail_prospect_data = json.loads(dataframe.loc[kwargs["id"], :].to_json())
            detail_prospect_data['_id'] = kwargs["id"]

            serializer = DealSerializer(data=detail_prospect_data, many=False)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=st.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)

# Added deleted view
class DealsDeleteView(APIView):
    """
    An endpoint to delete a deal.
    The endpoint is https://sales.zuri.chat/deals/delete/<str:id>/
    """
    serializer_class = DealSerializer
    queryset = None

    def delete_deal(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/read/delete/id"

        data = {
                    "plugin_id": "000000000000000000000000",
                    "organization_id": "612a3a914acf115e685df8e3",
                    "collection_name": "prospects",
                    "bulk_write": False,
                    "object_id": 'data.get("_id")',
                    "payload": 'data'
                }

        working =True
        if working:
            return JsonResponse(data={
                    'Message': 'This deal has been successfully deleted',
                    
                })

