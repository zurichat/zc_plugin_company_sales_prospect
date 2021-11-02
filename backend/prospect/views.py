import json

import requests
from common.utils import (
    CustomRequest,
    centrifugo_post,
    handle_failed_request,
    is_authorized,
    is_valid_organisation,
)

# changed the import to a single import
from django.conf import settings
from django.core.mail import send_mail

# from django.core.paginator import Paginator
from django.http import JsonResponse
from prospect.serializers import ProspectSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

PLUGIN_ID = settings.PLUGIN_ID
# Create your views here.


class WelcomeView(APIView):
    """
    this functions sends a welcome email to new leads
       still in development stage
       would configure it properly during production
    """

    def get(self, request):
        """
        this functions sends a welcome email to new leads
        still in development stage
        would configure it properly during production
        """
        send_mail(
            subject=f"Welcome {request.user}",
            message=f"Hello {request.user} your account was successfully created",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["test1@dummy.com"],
        )
        return JsonResponse({"message": "welcome mail has been sent successfully"})


def search_prospects(request, org_id, search):
    """
    this fuction will allow the user to search for a prospects
    """
    # check authentication
    if not is_authorized(request):
        return Response(
            data={"message": "Missing Cookie/token header or session expired"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not is_valid_organisation(org_id, request):
        return Response(
            data={"message": "Invalid/Missing organization id"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # import requests
    url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{org_id}/"
    response = requests.request("GET", url)
    res = response.json()
    # response code should be 200
    if response.status_code == 200:
        liste = []
        for i in res["data"]:
            if (
                (search in i["first_name"])
                or (search in i["last_name"])
                or (search in i["email"])
                or (search in i["company"])
            ):
                liste.append(i)
        return JsonResponse(liste, safe=False)
    return JsonResponse({"message": "not found"})


class ProspectsListView(APIView):
    """
    This class returns a list of avaliable prospects in the DB
    """

    def get(self, request, org_id):
        """
        this function preforms the get request to the database
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)
        response = CustomRequest.get(org_id, "prospects")
        return Response({"contact": response}, status=response["status_code"])


class ProspectsCreateView(APIView):
    """
    This Class perfoms the create prospects function
    """

    serializer_class = ProspectSerializer
    queryset = None

    def post(self, request, org_id):
        """
        this function preforms the post request to the database
        """
        # # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        payload = {
            "name": serializer.data.get("name"),
            "email": serializer.data.get("email"),
            "phone_number": serializer.data.get("phone_number"),
            "company": serializer.data.get("company"),
            "twitter": serializer.data.get("twitter"),
            "facebook": serializer.data.get("facebook"),
            "linkedin": serializer.data.get("linkedin"),
            "instagram": serializer.data.get("instagram"),
        }
        response = CustomRequest.post(org_id, "prospects", payload)
        return Response({"contact": response}, status=response["status_code"])


class ProspectsUpdateView(APIView):
    """
    This class handles the update prospects process
    """

    serializer_class = ProspectSerializer
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

        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.data
        response = CustomRequest.put(org_id, "prospects", payload, object_id)
        return Response({"contact": response}, status=response["status_code"])


class ProspectsBatchDeleteView(APIView):
    """This Class handles the batch delete view for prospects"""

    def post(self, request, org_id):
        """
        this function preforms the put request to the database
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        filter_data = request.data.get("filter")

        response = requests.delete(org_id, "prospects", filter_data=filter_data)
        return Response({"contact": response}, status=response["status_code"])


class ProspectsDeleteView(APIView):
    """
    this class handles the delete process for each prospect
    """

    permission_classes = [AllowAny]
    authentication_classes = []

    def delete(self, request, org_id, object_id):
        """
        this function preforms the delete request to the database
        """
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        response = CustomRequest.delete(org_id, "prospects", object_id=object_id)
        return Response({"message": response}, status=response["status_code"])


class ProspectDetailsView(APIView):
    """
    this class handles the detail view for each prospect
    """

    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request, org_id):
        """
        this function preforms the put request to the database
        """
        # check authorization
        # if not is_authorized(request):
        # return handle_failed_request(response=None)

        # if not is_valid_organisation(org_id, request):
        # return handle_failed_request(response=None)

        url = "https://api.zuri.chat/data/write"
        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        object_id = request.data.get("object_id")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": org_id,
            "collection_name": "prospects",
            "bulk_write": False,
            "object_id": object_id,
            "payload": serializer.data,
        }
        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            res = response.json()
            if res["data"]["matched_documents"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect with the 'object_id' you supplied."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if res["data"]["modified_documents"] == 0:
                return Response(
                    data={
                        "message": "Prospect update failed. Empty data or invalid values was passed."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "edit_prospect",
                    "token": "elijah",
                    "object": serializer.data,
                },
            )
            return Response(data=res, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)
