from common.utils import centrifugo_post
import requests
import json

from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from django.core.paginator import Paginator

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import ProspectSerializer, ProspectUpdateSerializer
# changed the import to a single import
from common.utils import centrifugo_post
from rest_framework.permissions import AllowAny
from common.utils import isAuthorized
from common.utils import isValidOrganisation
from common.utils import handle_failed_request

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
# Create your views here.


class WelcomeView(APIView):
    def get(self, request, *args, **kwargs):
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


def SearchProspects(request, search):

    # # check authentication
    if not isAuthorized(request):
        return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

    if not isValidOrganisation(ORGANISATION_ID, request):
        return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)

    # import requests
    url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}/"
    response = requests.request("GET", url)
    r = response.json()
    # response code should be 200
    if response.status_code == 200:
        liste = []
        for i in r["data"]:
            if (
                (search in i["first_name"])
                or (search in i["last_name"])
                or (search in i["email"])
                or (search in i["company"])
            ):
                liste.append(i)
        return JsonResponse(liste, safe=False)


class ProspectsListView(APIView):
    serializer_class = ProspectSerializer
    queryset = None
    paginate_by = 20

    def get(self, request, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return handle_failed_request(response=None)

        if not isValidOrganisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        if response.status_code == 200:
            r = response.json()
            # centrifugo_post("Prospects", {"event": "join", "token": "elijah"})
            # serializer = ProspectSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            if not r["data"]:
                return Response(
                    data={"message": "This Organization's Prospect list is currently empty."},
                    status=status.HTTP_204_NO_CONTENT)

            paginator = Paginator(r["data"], self.paginate_by)
            page_num = request.query_params.get('page', 1)
            page_obj = paginator.get_page(page_num)
            paginated_data = {
                "contacts": list(page_obj),
                "pageNum": page_obj.number,
                "next": page_obj.has_next(),
                "prev": page_obj.has_previous(),
            }
            return Response(data=paginated_data, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectsCreateView(APIView):
    """
    Documentation here.
    """

    serializer_class = ProspectSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return handle_failed_request(response=None)

        if not isValidOrganisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url = "https://api.zuri.chat/data/write"
        
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "payload": {
                "name": serializer.data.get("name"),
                "email": serializer.data.get("email"),
                "phone_number": serializer.data.get("phone_number"),
                "company": serializer.data.get("company"),
                "twitter": serializer.data.get("twitter"),
                "facebook": serializer.data.get("facebook"),
                "linkedin": serializer.data.get("linkedin"),
                "instagram": serializer.data.get("instagram")
            },
        }
        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        if response.status_code == 201:
            new_prospect = request.data
            # request.data._mutable = True
            # new_prospect["_id"] = r["data"]["object_id"]
            # request.data._mutable = False

            # new_prospect["_id"] = r["data"]["object_id"]
        #     # centrifugo_post(
        #     #     "Prospects",
        #     #     {"event": "new_prospect", "token": "elijah", "object": new_prospect},
        #     # )
            return Response(data=r, status=status.HTTP_201_CREATED)
        return handle_failed_request(response=response)


class ProspectsUpdateView(APIView):
    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        # check authorization
        if not isAuthorized(request):
            return handle_failed_request(response=None)

        if not isValidOrganisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        url = "https://api.zuri.chat/data/write"
        serializer = ProspectUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        object_id = serializer.data.pop("object_id")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "object_id": object_id,
            "payload": serializer.data,
        }
        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            r = response.json()
            if r["data"]["matched_documents"] == 0:
                return Response(
                    data={"message": "There is no prospect with the 'object_id' you supplied."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if r["data"]["modified_documents"] == 0:
                return Response(
                    data={"message": "Prospect update failed. Empty data or invalid values was passed."},
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
            return Response(data=r, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectsBatchDeleteView(APIView):

    def post(self, request, **kwargs):
        # check authentication
        if not isAuthorized(request):
            return handle_failed_request(response=None)

        if not isValidOrganisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        filterData = request.data.get('filter')

        url = "https://api.zuri.chat/data/delete"
        data = {
            "bulk_delete": True,
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "filter": {
                "email": {
                    "$in": filterData
                }
            }
        }

        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            r = response.json()
            if r["data"]["deleted_count"] == 0:
                return Response(
                    data={"message": "There is no prospect matching the 'filter' you supplied."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "delete_prospect",
                    "token": "elijah",
                    "object": {
                        "data": filterData,
                    },
                },
            )
            return Response(data={"message": " Prospect list  deleted successful."}, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectsDeleteView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def delete(self, request, search, *args, **kwargs):
        # # check authentication
        if not isAuthorized(request):
            return handle_failed_request(response=None)

        if not isValidOrganisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "object_id": search,
        }
        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            r = response.json()
            if r["data"]["deleted_count"] == 0:
                return Response(
                    data={"message": "There is no prospect with the 'object_id' you supplied."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "delete_prospect",
                    "token": "elijah",
                    "id": kwargs.get("object_id"),
                },
            )
            return Response(data={"message": "successful"}, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)
