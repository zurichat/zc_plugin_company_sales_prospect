import requests
import json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import EmailSerializer, EmailUpdateSerializer
from common.utils import isAuthorized
from common.utils import isValidOrganisation

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
# Create your views here.

class EmailTemplateCreateView(APIView):
    """
    create email template
    """
    serializer_class = EmailSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        # check if user is authenticated
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        # if not isValidOrganisation(ORGANISATION_ID, request):
        #     return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = EmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        url = "https://api.zuri.chat/data/write"
        subject = request.data.get("subject")
        to_email = request.data.get("to_email")
        # from_email = request.data.get("from_email")
        message = request.data.get("message")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "email_template",
            "bulk_write": False,
            "payload": {
                "subject": subject,
                "from_email": "hngi8@hng.tech",
                "to_email": to_email,
                "message": message,
            },
        }
        response = requests.post(url, data=json.dumps(data))
        if response.status_code == 201:
            return Response(data=response.json(), status=status.HTTP_201_CREATED)
        return Response(
            data={"message": "Try again later"},
            status=response.status_code,
        )


class EmailTemplateListView(APIView):
    """
    lists available templates
    """
    serializer_class = EmailSerializer
    queryset = None

    def get(self, request, *args, **kwargs):
        # check if user is authenticated        
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        # if not isValidOrganisation(ORGANISATION_ID, request):
        #     return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)

        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/email_template/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        if response.status_code == 200:
            return Response(
                data=response.json(),
                status=status.HTTP_200_OK
            )


class EmailTemplateUpdateView(APIView):
    """
    update created templates
    """
    serializer_class = EmailUpdateSerializer
    queryset = None

    def put(self, request, template_id, *args, **kwargs):
        # check if user is authenticated        
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        # if not isValidOrganisation(ORGANISATION_ID, request):
        #     return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)      

        url = "https://api.zuri.chat/data/write"
        serializer = EmailUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # object_id = serializer.data.get("object_id")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "email_template",
            "bulk_write": False,
            "object_id": template_id,
            "payload": serializer.data,
        }
        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            response = response.json()
            return Response(data=response, status=status.HTTP_200_OK)

        return Response(
            data={"message": "Try again later", "data": request.data},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class EmailTemplateDeleteView(APIView):
    """
    delete created templates
    """
    def delete(self, request, template_id, *args, **kwargs):
        # check if user is authenticated
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        # if not isValidOrganisation(ORGANISATION_ID, request):
        #     return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)

        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "email_template",
            "object_id": template_id,
        }
        response = requests.post(url, data=json.dumps(data))
        print(response.text)
        if response.status_code == 200:
            r = response.json()
            return Response(data={"message": f"{template_id} was deleted successfully"}, status=status.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
