import json

import requests

# changed the import to a single import
from common.utils import (
    centrifugo_post,
    handle_failed_request,
    is_authorized,
    is_valid_organisation,
    CustomRequest,
)
from deals.serializers import DealSerializer, DealUpdateSerializer
from django.conf import settings
from rest_framework import status as st
from rest_framework.response import Response
from rest_framework.views import APIView

PLUGIN_ID = settings.PLUGIN_ID


class Deals(APIView):
    """
    This Class perfoms the create deals function
    """

    serializer_class = DealSerializer
    queryset = None

    def get(self, request, org_id):
        """
        this function preforms the get request to the database
        """
        # check authentication
        # if not is_authorized(request):
        #     return handle_failed_request(response=None)

        # if not is_valid_organisation(org_id, request):
        #     return handle_failed_request(response=None)

        print(request)
        response = CustomRequest.get(org_id, "deals")
        return Response({"deals": response}, status=response["status_code"])

    def post(self, request, org_id):
        """
        this function preforms the post request to the database
        """
        # # check authentication
        # if not is_authorized(request):
        #     return handle_failed_request(response=None)

        # if not is_valid_organisation(org_id, request):
        #     return handle_failed_request(response=None)

        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payload = {
            "prospect_id": request.data.get("prospect_id"),
            "name": request.data.get("name"),
            "deal_stage": request.data.get("deal_stage"),
            "amount": request.data.get("amount"),
            "close_date": request.data.get("close_date"),
            "description": request.data.get("description"),
        }
        response = CustomRequest.post(org_id, "deals", payload)
        return Response({"contact": response}, status=response["status_code"])


class DealDetail(APIView):
    """
    This class handles the update/delete deal process
    """

    serializer_class = DealSerializer
    queryset = None

    def put(self, request, org_id, object_id):
        """
        this function preforms the put request to the database
        """
        # check authorization
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        serializer = DealSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.data
        response = CustomRequest.put(org_id, "deals", payload, object_id)
        return Response({"contact": response}, status=response["status_code"])

    def delete(self, request, org_id, object_id):
        """
        this function preforms the delete request to the database
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        response = CustomRequest.delete(org_id, "deals", object_id=object_id)
        return Response({"message": response}, status=response["status_code"])


class DealsBatchDeleteView(APIView):
    """This Class handles the batch delete view for deals"""

    def delete(self, request, org_id):
        """
        this function preforms the put request to the database
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        filter_data = request.data.get("filter")

        response = CustomRequest.delete(org_id, "deals", filter_data=filter_data)
        return Response({"message": response}, status=response["status_code"])


class ReArrangeDeals(APIView):
    """
    This view re-arrange the deals card
    """

    serializer_class = DealUpdateSerializer
    queryset = None

    def put(self, request, org_id):
        """
        This handles the put request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
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
                "organization_id": org_id,
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
                "organization_id": org_id,
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

    def get(self, request, org_id):
        """
        This handles the put request to the DB
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        search = self.request.query_params.get("filter")
        filter = {
            "$or": [
                {"name": {"$regex": search}},
                {"amount": {"$regex": search}},
                {"description": {"$regex": search}},
                {"deal_stage": {"$regex": search}},
                {"close_date": {"$regex": search}},
            ]
        }

        payload = {}

        response = CustomRequest.post(org_id, "deals", payload, filter=filter)
        return Response({"message": response}, status=response["status_code"])
