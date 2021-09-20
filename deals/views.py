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
        data = {
                "plugin_id": "614105b66173056af01b4cca",
                "organization_id": "613a495f59842c7444fb0246",
                "collection_name": "deals",
                "bulk_write": False,
                "payload": {
                    "prospect_id":request.data.get("prospect_id"),
                    "name":request.data.get("name"),
                    "deal_stage": request.data.get("deal_stage"),
                    "amount":request.data.get("amount"),
                    "close_date":request.data.get("close_date"),
                    "description":request.data.get("description"),
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
                "plugin_id": "614105b66173056af01b4cca",
                "organization_id": "613a495f59842c7444fb0246",
                "collection_name": "deals",
                "bulk_write": False,
                "object_id":serializer.data.get("_id"),
                "payload": {
                    "prospect_id":request.data.get("prospect_id"),
                    "name":request.data.get("name"),
                    "deal_stage": request.data.get("deal_stage"),
                    "amount":request.data.get("amount"),
                    "close_date":request.data.get("close_date"),
                    "description":request.data.get("description"),
                }
            }
        response = requests.request("PUT", url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 200:
            return Response(data={'message':'Deal Updated Successfully'}, status=st.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)
      
class DealsListView(APIView):
    """
    Documentation here.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = "https://api.zuri.chat/data/read/614105b66173056af01b4cca/deals/613a495f59842c7444fb0246"
        response = requests.request("GET", url)
        r = response.json()
        print(response.status_code)
        print(response) #new
        if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            return Response(data=r['data'], status=st.HTTP_200_OK)
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

    def delete(self, request,id):
        url = "https://api.zuri.chat/data/delete" 
        data = {
            
                "plugin_id": "614105b66173056af01b4cca",
                "organization_id": "613a495f59842c7444fb0246",
                "collection_name": "deals",
                "bulk_write": False,
                "object_id": id,
                }
        print(id)
        
        response = requests.request("POST", url,data=json.dumps(data))
        
        r=response.json()
        print(r['data'])
        
        if response.status_code == 200:
            
        # print(r)
          if r["data"]["deleted_count"] == 0 :
            return Response(data={'message':'There is no deals with this object id you supplied'}, status=st.HTTP_400_BAD_REQUEST)
          if response.status_code == 200:
            return Response(data={'message':'deals with object id '+ data["object_id"] +' deleted successfully!'}, status=st.HTTP_200_OK)
        return Response(data={"message":"deals deletion fails... Try again later."}, status=response.status_code)
        
        
        # response = requests.request("POST", url, data)
        # r = response.json()
        # print(r.status_code)
        # return Response(data=r.status_code)
        #print(response)
        #if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            #return Response(data=r['data'], status=st.HTTP_200_OK)
        #return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)


