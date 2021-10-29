import json

import requests

# changed the import to a single import
from common.utils import (
    centrifugo_post,
    handle_failed_request,
    is_authorized,
    is_valid_organisation,
)
from deals.serializers import DealSerializer, DealUpdateSerializer
from django.conf import settings
from rest_framework import status as st
from rest_framework.response import Response
from rest_framework.views import APIView

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID


class DealCreateView(APIView):
    """
    An endpoint to create a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/deals/create
    """

    serializer_class = DealSerializer
    queryset = None

    def post(self, request):
        """
        This handles the post request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

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
        prospect = serializer.data.get("prospect_id")

        urlprospect = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}?_id={prospect}"
        responseprospect = requests.request("GET", urlprospect)
        if responseprospect.status_code == 200:
            rprospect = responseprospect.json()
            if not rprospect["data"]:
                return Response(
                    data={
                        "message": "There is no prospect with the 'prospect_id' you supplied."
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )

            response = requests.request("POST", url, data=json.dumps(data))
            res = response.json()
            if response.status_code == 201:
                centrifugo_post(
                    "Deals",
                    {
                        "event": "new_deal",
                        "token": "elijah",
                        "object": res,
                    },
                )
                return Response(
                    data={
                        "message": "Created deal object successfully!",
                        "id": res["data"]["object_id"],
                        "data": request.data,
                    },
                    status=st.HTTP_201_CREATED,
                )
        return handle_failed_request(response=response)


class DealUpdateView(APIView):
    """
    An endpoint to update a deal, takes in prospect_id, status, title, and amount.
    The endpoint is https://sales.zuri.chat/api/v1/deals/update/?id=6155fd4a5a1ecabe7f31ad85
    """

    serializer_class = DealSerializer
    queryset = None

    def put(self, request):
        """
        This handles the put request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        _id = self.request.query_params.get("id")
        if not _id:
            return Response(
                data={"message": "Missing deals 'id' in query string parameters."},
                status=st.HTTP_400_BAD_REQUEST,
            )

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
                "description": request.data.get("description"),
            },
        }
        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            res = response.json()
            if res["data"]["matched_documents"] == 0:
                return Response(
                    data={"message": "There is no deal with the 'id' you supplied."},
                    status=st.HTTP_400_BAD_REQUEST,
                )

            if res["data"]["modified_documents"] == 0:
                return Response(
                    data={
                        "message": "Deal update failed. Empty data or invalid values was passed."
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Deals",
                {
                    "event": "edit_deal",
                    "token": "elijah",
                    "object": res,
                },
            )
            return Response(
                data={"message": "Deal Updated Successfully", "data": res},
                status=st.HTTP_200_OK,
            )
        return handle_failed_request(response=response)


class DealsListView(APIView):
    """
    This class handles the listing of deals for that org
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request):
        """
        This handles the get request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        centrifugo_post("Deals", {"event": "join", "token": "elijah"})
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/deals/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        res = response.json()
        if response.status_code == 200:
            # serializer = DealSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            if res.get("data") is None:
                res["data"] = []
            return Response(data=res["data"], status=st.HTTP_200_OK)
        return handle_failed_request(response=response)


class ReArrangeDeals(APIView):
    """
    This view re-arrange the deals card
    """

    serializer_class = DealUpdateSerializer
    queryset = None

    def put(self, request):
        """
        This handles the put request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        _id = self.request.query_params.get("id")
        if not _id:
            return Response(
                data={"message": "Missing deals 'id' in query string parameters."},
                status=st.HTTP_400_BAD_REQUEST,
            )

        url = "https://api.zuri.chat/data/write"
        serializer = DealUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # check if the re-arrangement data has close deal date
        if serializer.data.get("close_date"):
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

            if response.status_code in [200, 201]:
                res = response.json()
                if res["data"]["matched_documents"] == 0:
                    return Response(
                        data={
                            "message": "There is no deal with the 'id' you supplied."
                        },
                        status=st.HTTP_400_BAD_REQUEST,
                    )

                if res["data"]["modified_documents"] == 0:
                    return Response(
                        data={
                            "message": "Deal update failed. Empty data or invalid values was passed."
                        },
                        status=st.HTTP_400_BAD_REQUEST,
                    )
                centrifugo_post(
                    "Deals",
                    {
                        "event": "edit_deal",
                        "token": "elijah",
                        "object": res,
                    },
                )
                return Response(
                    data={"message": "Deal Updated Successfully", "data": res},
                    status=st.HTTP_200_OK,
                )
            return handle_failed_request(response=response)

        else:  # the deal card has not been drag to close deal section
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

            if response.status_code in [200, 201]:
                res = response.json()
                if res["data"]["matched_documents"] == 0:
                    return Response(
                        data={
                            "message": "There is no deal with the 'id' you supplied."
                        },
                        status=st.HTTP_400_BAD_REQUEST,
                    )

                if res["data"]["modified_documents"] == 0:
                    return Response(
                        data={
                            "message": "Deal update failed. Empty data or invalid values was passed."
                        },
                        status=st.HTTP_400_BAD_REQUEST,
                    )
                centrifugo_post(
                    "Deals",
                    {
                        "event": "edit_deal",
                        "token": "elijah",
                        "object": res,
                    },
                )
                return Response(
                    data={"message": "Deal Updated Successfully", "data": res},
                    status=st.HTTP_200_OK,
                )
            return handle_failed_request(response=response)


class DealsFilterListView(APIView):
    """
    Filters existing deals by the provided search criteria.
    pass the filter_by keyword as a parameter eg http://127.0.0.1:8200/api/v1/deals/filter/?filter=benshi
    filter params can be anything on the deal name,stage,etc.
    """

    def get(self, request):
        """
        This handles the put request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

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
                    {"close_date": {"$regex": search}},
                ]
            },
        }

        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            res = response.json()
            return Response(data={"data": res["data"]}, status=st.HTTP_200_OK)
        return handle_failed_request(response=response)


class DealsBatchDeleteView(APIView):
    """This handles the mutiple delete process for deals"""

    def post(self, request):
        """
        This handles the post request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        filter_data = request.data.get("filter")

        url = "https://api.zuri.chat/data/delete"
        data = {
            "bulk_delete": True,
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "filter": {"prospect_id": {"$in": filter_data}},
        }

        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            res = response.json()
            if res["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no deal with the 'object_id' you supplied."
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Deals",
                {
                    "event": "delete_deals",
                    "token": "elijah",
                    "object": {"data": filter_data},
                },
            )
            return Response(
                data={"message": "Deal list deleted successful."}, status=st.HTTP_200_OK
            )
        return handle_failed_request(response=response)


class DealsDeleteView(APIView):
    """
    An endpoint to delete a deal.
    The endpoint is https://sales.zuri.chat/deals/delete/
    Pass the id as a parameter eg https://sales.zuri.chat/deals/delete/?id=123234555
    """

    def post(self, request):
        """
        This handles the post request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        _id = self.request.query_params.get("id")

        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "deals",
            "bulk_write": False,
            "object_id": _id,
        }

        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            res = response.json()
            if res["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no deals with the 'object_id' you supplied."
                    },
                    status=st.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "delete_deal",
                    "token": "elijah",
                    "id": res,
                },
            )
            return Response(
                data={"message": "Deals deleted successfully!"}, status=st.HTTP_200_OK
            )
        return handle_failed_request(response=response)
