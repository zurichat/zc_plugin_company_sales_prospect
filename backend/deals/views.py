from common.utils import centrifugo_post
from django.conf import settings
from deals.serializers import DealSerializer, DealUpdateSerializer
from rest_framework.views import APIView
import requests, json
from rest_framework.response import Response
from rest_framework import status as st
from common.utils import centrifugo_post  # changed the import to a single import
from common.utils import isAuthorized
from common.utils import isValidOrganisation


PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID


class DealCreateView(APIView):
    """
    An endpoint to create a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/deals/create
    """

    serializer_class = DealSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url = "https://api.zuri.chat/data/write"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "payload": {
                "prospect_id": request.data.get("prospect_id"),
                "name": request.data.get("name"),
                "deal_stage": request.data.get("deal_stage"),
                "amount": request.data.get("amount"),
                "close_date": request.data.get("close_date"),
                "description": request.data.get("description"),
            },
        }
        prospect = request.data.get("prospect_id")

        urlprospect = (
            f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}?_id={prospect}"
        )
        responseprospect = requests.request("GET", urlprospect)
        print(responseprospect.status_code, "here")
        if responseprospect.status_code == 200:
            response = requests.request("POST", url, data=json.dumps(data))
            r = response.json()
            print(r)
            if response.status_code == 201:
                centrifugo_post(
                    "Deals",
                    {
                        "event": "new_deal",
                        "token": "elijah",
                        "object": r,
                    },
                )
                return Response(
                    data={
                        "message": "Created deal object successfully!",
                        "id":r['data']["object_id"],
                        "data": request.data,
                    },
                    status=st.HTTP_201_CREATED,
                )
            return Response(
                data={"message": "Creation of deals failed... Try again."},
                status=st.HTTP_400_BAD_REQUEST,
            )

        if responseprospect.status_code != 200:
            return Response(
                    data={
                        "message": "Prospect ID not found"
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
        


class DealUpdateView(APIView):
    """
    An endpoint to update a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/api/v1/deals/update/?id=6155fd4a5a1ecabe7f31ad85
    """

    serializer_class = DealSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        
        _id = self.request.query_params.get("id")
        url = "https://api.zuri.chat/data/write"
        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "object_id": _id,
            "payload": {
                "prospect_id": request.data.get("prospect_id"),
                "name": request.data.get("name"),
                "deal_stage": request.data.get("deal_stage"),
                "amount": request.data.get("amount"),
                "close_date": request.data.get("close_date"),
                "description": request.data.get("description"),},
        }
        response = requests.put(url, data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]>0)):
            centrifugo_post(
                "Deals",
                {
                    "event": "edit_deal",
                    "token": "elijah",
                    "object": r,
                },
            )
            return Response(
                data={"message": "Deal Updated Successfully","data":request.data},
                status=st.HTTP_200_OK,
            )
        elif response.status_code == 422:
            return Response(
                data={"message": "error processing request:invalid characters present"
                },
                status=st.HTTP_422_UNPROCESSABLE_ENTITY
                )
        elif ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]<1)):
            return Response(
                data={"message": "no deal with that id bruv"
                },
                status=st.HTTP_400_BAD_REQUEST
                )
        return Response(
            data={"message": "Check Prospects Field and try again"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class DealsListView(APIView):
    """
    Documentation here.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        
        centrifugo_post("Deals", {"event": "join", "token": "elijah"})
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            if r.get("data") == None:
                r['data'] = []
            return Response(data=r["data"], status=st.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )



class ReArrangeDeals(APIView):
    """
        This view re-arrange the deals card
    """
    serializer_class = DealUpdateSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        _id = self.request.query_params.get("id")
        url = "https://api.zuri.chat/data/write"
        serializer = DealUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        ######## check if the re-arrangement data has close deal date
        if request.data.get('close_date'):
            data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": "deals",
                "bulk_write": False,
                "object_id": _id,
                "payload": {
                    "deal_stage": request.data.get("deal_stage"),
                    "close_date": request.data.get("close_date"),
                },
            }
            response = requests.put(url, data=json.dumps(data))
            r = response.json()
            if ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]>0)):
                centrifugo_post(
                    "Deals",
                    {
                        "event": "edit_deal",
                        "token": "elijah",
                        "object": r,
                    },
                )
                return Response(
                    data={"message": "Deal Updated Successfully","data":request.data},
                    status=st.HTTP_200_OK,
                )
            elif response.status_code == 422:
                return Response(
                    data={"message": "error processing request:invalid characters present"
                    },
                    status=st.HTTP_422_UNPROCESSABLE_ENTITY
                    )
            elif ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]<1)):
                return Response(
                    data={"message": "no deal with that id found"
                    },
                    status=st.HTTP_400_BAD_REQUEST
                    )
            return Response(
                data={"message": "Check Prospects Field and try again"},
                status=st.HTTP_500_INTERNAL_SERVER_ERROR,
            )


        else: ############ the deal card has not been drag to close deal section
            data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": "deals",
                "bulk_write": False,
                "object_id": _id,
                "payload": {
                    "deal_stage": request.data.get("deal_stage"),
                },
            }
            response = requests.put(url, data=json.dumps(data))
            r = response.json()
            if ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]>0)):
                centrifugo_post(
                    "Deals",
                    {
                        "event": "edit_deal",
                        "token": "elijah",
                        "object": r,
                    },
                )
                return Response(
                    data={"message": "Deal Updated Successfully","data":request.data},
                    status=st.HTTP_200_OK,
                )
            elif response.status_code == 422:
                return Response(
                    data={"message": "error processing request:invalid characters present"
                    },
                    status=st.HTTP_422_UNPROCESSABLE_ENTITY
                    )
            elif ((response.status_code in [200, 201]) and (r["data"]["matched_documents"]<1)):
                return Response(
                    data={"message": "no deal with that id found"
                    },
                    status=st.HTTP_400_BAD_REQUEST
                    )
            return Response(
                data={"message": "Check Prospects Field and try again"},
                status=st.HTTP_500_INTERNAL_SERVER_ERROR,
            )


class DealsFilterListView(APIView):
    """
    Filters existing deals by the provided search criteria.
    pass the filter_by keyword as a parameter eg http://127.0.0.1:8200/api/v1/deals/filter/?filter=benshi
    filter params can be anything on the deal name,stage,etc.
    """
    def get(self, request, *args, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)

        search = self.request.query_params.get("filter")
        url = "https://api.zuri.chat/data/read"
        data = {
            "plugin_id": PLUGIN_ID,
            "collection_name": "deals",
            "organization_id": ORGANISATION_ID,
            "filter": {
                "$or": [
                    {"name": {"$regex": search}},
                    {"amount": {"$regex": search}},
                    {"description": {"$regex": search}},
                    {"deal_stage": {"$regex": search}},
                    {"close_date":{"$regex": search}},
                ]
            },
        }

        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        if response.status_code == 200:
            return Response(data={"data": r["data"]}, status=st.HTTP_200_OK)
        if response.status_code == 400:
            return Response(
                data={"message":"Please check your input again"},
                status=st.HTTP_400_BAD_REQUEST
                )
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class DealsBatchDeleteView(APIView):

    def post(self, request, **kwargs):
        # check authentication
        # if not isAuthorized(request):
        #     return Response(data={"message": "Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)

        # if not isValidOrganisation(ORGANISATION_ID, request):
        #     return Response(data={"message": "Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        filterData = request.data.get('filter')

        url = "https://api.zuri.chat/data/delete"
        data = {
            "bulk_delete": True,
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            # "object_id": [],
            "collection_name": "deals",
            "filter": {
                    "prospect_id": {
                        "$in": filterData
                    }
            }
        }

        response = requests.request("POST", url, data=json.dumps(data))
        print(response.json())
        if response.status_code == 200:
            r = response.json()
            if r["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no deal with this object id you supplied"
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Deals",
                {
                    "event": "delete_deals",
                    "token": "elijah",
                    "object": {
                        "data": filterData
                    },
                },
            )
            return Response(data={"message": " Deal list deleted successful"}, status=st.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_400_BAD_REQUEST
        )

class DealsDeleteView(APIView):
    """
    An endpoint to delete a deal.
    The endpoint is https://sales.zuri.chat/deals/delete/
    Pass the id as a parameter eg https://sales.zuri.chat/deals/delete/?id=123234555
    """

    def post(self, request):
         # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)

        id = self.request.query_params.get("id")
        
        
        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "object_id": id,
        }

        response = requests.request("POST", url, data=json.dumps(data))

        r = response.json()

        print(r["data"])
        if ((response.status_code == 200) and (r["data"]["deleted_count"])) == 0:
            return Response(
                data={
                    "message": "There is no deals with this object id you supplied"
                },
                status=st.HTTP_400_BAD_REQUEST
            )
        if response.status_code == 200:
            centrifugo_post(
                "Deals",
                {
                    "event": "delete_deal",
                    "token": "elijah",
                    "object": r,
                },
            )
            return Response(
                data={
                    "message": "deals with object id "
                    + data["object_id"]
                    + " deleted successfully!"
                },
                status=st.HTTP_200_OK,
            )
        return Response(
            data={"message": "deals deletion fails... Try again later."},
            status=st.HTTP_502_BAD_GATEWAY,
        )