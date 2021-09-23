
from django.conf import settings
from deals.serializers import DealSerializer, DealUpdateSerializer
from rest_framework.views import APIView
import requests, json
from rest_framework.response import Response
from rest_framework import status as st


PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID

class DealCreateView(APIView):
    """
    An endpoint to create a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/deals/create
    """

    serializer_class = DealUpdateSerializer
    queryset = None
    def post(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
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
        
        urlprospect = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        responseprospect = requests.request("GET", urlprospect)
        # print(responseprospect.status_code,'here')
        if(responseprospect.status_code!='200'):
            prospectdata = responseprospect.json()['data']
            liste = []
            prospectid = request.data.get("prospect_id")
            for i in prospectdata:
              if (prospectid == i["_id"]):
                liste.append(i)
            if len(liste) == 0:
                 return Response(data={"message":"prospect id you supplied does not exist, please provide a valid prospect id"}, status=st.HTTP_200_OK)
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        # print(r)
        if response.status_code == 201:
            return Response(data={'message':'Created deal object successfully!',"deal_created":r['data']}, status=st.HTTP_201_CREATED)

        return Response(data={"message":"Creation of deals failed... Try again later."}, status=response.status_code)

    def get(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            serializer = DealSerializer(data=r['data'], many=True)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=st.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)  

class DealUpdateView(APIView):
    """
    An endpoint to update a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/api/v1/deals/update/{id}/
    """
    serializer_class = DealUpdateSerializer
    queryset = None

    def put(self, request, id, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        serializer = DealUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": "deals",
                "bulk_write": False,
                "object_id":id,
                "payload": serializer.data
            }
        response = requests.put(url,data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code >= 200 and response.status_code < 300:
            return Response(data={'message':'Deal Updated Successfully'}, status=st.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)
        
class DealsListView(APIView):
    """
    Documentation here.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        r = response.json()
        print(response.status_code)
        print(response) #new
        if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            return Response(data=r['data'], status=st.HTTP_200_OK)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR) 



class DealsFilterListView(APIView):
    """
    Filters existing deals by the provided search criteria. For now, this is limited to just the name field.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            output_data = [data for data in r['data'] if kwargs['filter'].lower() in str(data['name']).lower()]
            if len(output_data) > 0:
                return Response(data=output_data, status=st.HTTP_200_OK)
            else:
                return Response(data={"message":"There are no deals matching your search"}, status=st.HTTP_404_NOT_FOUND)
        return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)

# a view to list deals by stages
class DealsStageListView(APIView):
    """
    Returns the available deals by the stage they are in the pipeline.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):

        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            for output_data in r['data']:
                if output_data['deal_stage'] == kwargs['stage']:
                    return Response(data=output_data, status=st.HTTP_200_OK)
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
            
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
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


