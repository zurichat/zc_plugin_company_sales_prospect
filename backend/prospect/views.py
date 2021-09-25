from common.utils import centrifugo_post
import requests, json

from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import ProspectSerializer

from rest_framework.permissions import AllowAny

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
# Create your views here.


class ProspectsListView(APIView):
    serializer_class = ProspectSerializer
    queryset = None

    def get(self, request, *args, **kwargs):
        # # check authentication
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)
        centrifugo_post("Prospects", {"event":"join","token":"elijah"})
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        print(response.status_code)
        if response.status_code == 200:
            r = response.json()
            # serializer = ProspectSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            return Response(data=r["data"], status=status.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


def SearchProspects(request, search):
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


class ProspectsCreateView(APIView):
    """
    Documentation here.
    """

    serializer_class = ProspectSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        # # check authentication
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        url = "https://api.zuri.chat/data/write"
        name = request.data.get("name")
        email = request.data.get("email")
        phone_number = request.data.get("phone_number")
        deal_stage = request.data.get("deal_stage")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "payload": {
                "name": name,
                "phone_number": phone_number,
                "email": email,
                "deal_stage": deal_stage,
            },
        }
        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data=r, status=status.HTTP_201_CREATED)
        return Response(
            data={"message": "Try again later"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


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


class ProspectsUpdateView(APIView):
    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        object_id = serializer.data.get("_id")
        try:
            del request.data["_id"]
        except:
            pass
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "object_id": object_id,
            "payload": request.data,
        }
        response = requests.put(url, data=json.dumps(data))
        print(response.status_code)
        # print(serializer.data)
        # print(serializer.data.get("object_id"))
        if response.status_code == 200 or 201:
            return Response(data=response, status=status.HTTP_201_CREATED)
        return Response(
            data={"message": "Try again later", "data": request.data},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )


class ProspectsDeleteView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def delete(self, request, pk):
        # # check authentication
        # if not isAuthorized(request):
        #     return Response(data={"message":"Missing Cookie/token header or session expired"}, status=status.HTTP_401_UNAUTHORIZED)

        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "object_id": pk,
        }
        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        if response.status_code == 200:
            if r["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect with this object id you supplied"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(data={"message": "successful"}, status=status.HTTP_200_OK)
        return Response(
            data={"message": "Try again later"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
