import json

import requests
from common.utils import is_authorized, is_valid_organisation
from django.conf import settings
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from email_template.serializers import (
    EmailSerializer,
    EmailUpdateSerializer,
    SendEmailSerializer,
)
from backend.common.utils import CustomRequest

ZURI_API_KEY = settings.ZURI_API_KEY
CENTRIFUGO_LIVE_ENDPOINT = settings.CENTRIFUGO_LIVE_ENDPOINT
API_KEY = settings.API_KEY
CENTRIFUGO_DEBUG_ENDPOINT = settings.CENTRIFUGO_DEBUG_ENDPOINT


PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
# Create your views here.


class EmailTemplate(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]

    Returns:
        [type]: [description]
    """

    serializer_class = EmailSerializer
    queryset = None

    def get(self, request, org_id):
        """[summary]

        Args:
            request ([type]): [description]

        Returns:
            [type]: [description]
        """
        # check if user is authenticated
        # if not is_authorized(request):
        #     return Response(
        #         data={"message": "Missing Cookie/token header or session expired"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )

        # if not is_valid_organisation(ORGANISATION_ID, request):
        #     return Response(
        #         data={"message": "Invalid/Missing organization id"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )
        print(request)
        response = CustomRequest.get(org_id, "email_template")
        return Response({"contact": response}, status=response["status_code"])

    def post(self, request, org_id):
        """[summary]

        Args:
            request ([type]): [description]

        Returns:
            [type]: [description]
        """
        # check if user is authenticated
        # if not is_authorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        # if not is_valid_organisation(ORGANISATION_ID, request):
        #     return Response(data={"message":"Invalid/Missing organization id"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = EmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = {
            "subject": request.data.get("subject"),
            "email": request.data.get("email"),
            "template_name": request.data.get("template_name"),
            "message": request.data.get("message"),
        }
        response = CustomRequest.post(org_id, "email_template", data)
        return Response({"contact": response}, status=response["status_code"])


class EmailDetail(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]
    """

    def get(self, request, org_id, template_id):
        """[summary]

        Args:
            request ([type]): [description]
            id ([type]): [description]

        Returns:
            [type]: [description]
        """

        print(request)
        response = CustomRequest.get(org_id, "email_template", object_id=template_id)
        return Response({"contact": response}, status=response["status_code"])

    def put(self, request, org_id, template_id):
        """
        [summary]

        Args:
            request ([type]): [description]
            template_id ([type]): [description]

        Returns:
            [type]: [description]
        """
        # check if user is authenticated
        # if not is_authorized(request):
        #     return Response(
        #         data={"message": "Missing Cookie/token header or session expired"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )

        # if not is_valid_organisation(ORGANISATION_ID, request):
        #     return Response(
        #         data={"message": "Invalid/Missing organization id"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        # )

        serializer = EmailUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # object_id = serializer.data.get("object_id")

        print(request)
        response = CustomRequest.put(
            org_id, "email_template", payload=serializer.data, object_id=template_id
        )
        return Response({"contact": response}, status=response["status_code"])

    def delete(self, request, org_id, template_id):
        """[summary]

        Args:
            request ([type]): [description]
            template_id ([type]): [description]

        Returns:
            [type]: [description]
        """
        # check if user is authenticated
        # if not is_authorized(request):
        #     return Response(
        #         data={"message": "Missing Cookie/token header or session expired"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )

        # if not is_valid_organisation(ORGANISATION_ID, request):
        #     return Response(
        #         data={"message": "Invalid/Missing organization id"},
        #         status=status.HTTP_401_UNAUTHORIZED,
        #     )
        print(request)
        response = CustomRequest.delete(org_id, "prospects", object_id=template_id)
        return Response({"message": response}, status=response["status_code"])


class EmailSendView(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]

    Returns:
        [type]: [description]
    """

    serializer = SendEmailSerializer
    queryset = None

    def post(self, request):
        """[summary]

        Args:
            request ([type]): [description]

        Returns:
            [type]: [description]
        """
        if not is_authorized(request):
            return Response(
                data={"message": "Missing Cookie/token header or session expired"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if not is_valid_organisation(ORGANISATION_ID, request):
            return Response(
                data={"message": "Invalid/Missing organization id"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        serializer = SendEmailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mail = request.data.get("mail_body")

        url = "https://api.zuri.chat/external/send-mail?custom_mail=1"
        data = {
            "email": request.data.get("email"),
            "subject": request.data.get("subject"),
            "content_type": "text/html",
            "mail_body": f"<div>{mail}</div>",
        }

        response = requests.post(url, data=json.dumps(data))
        print(response.json())
        if response.status_code == 200:
            return Response(
                data={"message": "Mail sent Successfully"}, status=status.HTTP_200_OK
            )
        return Response(
            data={"message": "Try again later"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
