from common.utils import centrifugo_post
from django.conf import settings
from deals.serializers import DealSerializer, DealUpdateSerializer
from rest_framework.views import APIView
import requests, json
from rest_framework.response import Response
from rest_framework import status as st
from common.utils import centrifugo_post  # changed the import to a single import
from prospect.authcheck import isAuthorized
from prospect.orgcheck import isValidOrganisation


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
        # # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)

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

        urlprospect = (
            f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        )
        responseprospect = requests.request("GET", urlprospect)
        print(responseprospect.status_code, "here")
        if responseprospect.status_code != "200":
            prospectdata = responseprospect.json()["data"]
            liste = []
            prospectid = request.data.get("prospect_id")
            for i in prospectdata:
                if prospectid == i["_id"]:
                    liste.append(i)
            if len(liste) == 0:
                return Response(
                    data={
                        "message": "Prospect ID not found"
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        # print(r)
        if response.status_code == 201:

            centrifugo_post(
                "Deals",
                {
                    "event": "new_deal",
                    "token": "elijah",
                    "object": r,
                },
            )
            # return Response(data={'message':'Created deal object successfully!',"deal_created":r['data']}, status=st.HTTP_201_CREATED)
            return Response(
                data={
                    "message": "Created deal object successfully!",
                    "data": request.data,
                },
                status=st.HTTP_201_CREATED,
            )

        return Response(
            data={"message": "Creation of deals failed... Try again later."},
            status=response.status_code,
        )

    def get(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        response = requests.request("GET", url)
        r = response.json()
        if response.status_code == 200:
            serializer = DealSerializer(data=r["data"], many=True)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=st.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class DealUpdateView(APIView):
    """
    An endpoint to update a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/api/v1/deals/update/{id}/
    """

    serializer_class = DealUpdateSerializer
    queryset = None

    def put(self, request, id, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        
        
        url = "https://api.zuri.chat/data/write"
        serializer = DealUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "object_id": id,
            "payload": serializer.data,
        }
        response = requests.put(url, data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code >= 200 and response.status_code < 300:
            centrifugo_post(
                "Deals",
                {
                    "event": "edit_deal",
                    "token": "elijah",
                    "object": r,
                },
            )
            return Response(
                data={"message": "Deal Updated Successfully"},
                status=st.HTTP_201_CREATED,
            )
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class DealsListView(APIView):
    """
    Documentation here.
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        
        # centrifugo_post("Deals", {"event": "join", "token": "elijah"})
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        r = response.json()
        print(response.status_code)
        print(response)  # new
        if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
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
        url = "https://api.zuri.chat/data/write"
        serializer = DealUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        get_id = serializer.data
        get_all_data = serializer.data
        del get_all_data["_id"]
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "filter": {},
            "object_id": get_id['_id'],
            "payload": get_all_data,
        }
        response = requests.put(url, data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code >= 200 and response.status_code < 300:
            # centrifugo_post(
            #     "Deals",
            #     {
            #         "event": "edit_deal",
            #         "token": "elijah",
            #         "object": r,
            #     },
            # )
            return Response(
                data={"message": "Deal Updated Successfully"},
                status=st.HTTP_201_CREATED,
            )
        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )

class DealsFilterListView(APIView):
    """
    Filters existing deals by the provided search criteria. For now, this is limited to just the name field.
    """

    serializer_class = DealSerializer
    queryset = None

    def post(self, request, search, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        

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
                ]
            },
        }

        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        if response.status_code == 200:
            return Response(data={"data": r["data"]}, status=st.HTTP_201_CREATED)

        return Response(
            data={"message": "Try again later"},
            status=st.HTTP_500_INTERNAL_SERVER_ERROR,
        )


# class DealsStageListView(APIView):
#     """
#     Returns the available deals by the stage they are in the pipeline.
#     """

#     serializer_class = DealSerializer
#     queryset = None

#     def post(self, request, *args, **kwargs):

#         url = "https://api.zuri.chat/data/read"

#         data = {
#                 "plugin_id": PLUGIN_ID,
#                 "collection_name": "deals",
#                 "organization_id": ORGANISATION_ID,
#                 "filter": {
#                     "deal_stage": request.data.get("deal_stage")}
#                 }

#         response = requests.request("POST", url, data=json.dumps(data))
#         r = response.json()
#         if response.status_code == 200:
#             return Response(data={"data": r["data"]}, status=st.HTTP_201_CREATED)

#         return Response(data={"message":"Try again later"}, status=st.HTTP_500_INTERNAL_SERVER_ERROR)


class DealsDeleteView(APIView):
    """
    An endpoint to delete a deal.
    The endpoint is https://sales.zuri.chat/deals/delete/<str:id>/
    """

    serializer_class = DealSerializer
    queryset = None

    def delete(self, request, id):
         # # check authentication
        if not isAuthorized(request):
            return Response(data={"message":"Missing Cookie/token header or session expired"}, status=st.HTTP_401_UNAUTHORIZED)
        
        if not isValidOrganisation(ORGANISATION_ID, request):
            return Response(data={"message":"Invalid/Missing organization id"}, status=st.HTTP_401_UNAUTHORIZED)
        
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

        if response.status_code == 200:

            if r["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no deals with this object id you supplied"
                    },
                    status=st.HTTP_400_BAD_REQUEST,
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
            status=response.status_code,
        )
