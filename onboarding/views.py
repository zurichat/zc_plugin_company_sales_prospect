from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import OnboardingSerializer
import json
import requests

class OnboardingListView(APIView):

    serializer_class = OnboardingSerializer
    queryset = None

    def get(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/read/613b677d41f5856617552f1e/user_profil/613a495f59842c7444fb0246"
        response = requests.request("GET", url)
        print(response.status_code)
        if response.status_code == 200:
            r = response.json()
            serializer = OnboardingSerializer(data=r['data'], many=True)
            serializer.is_valid(raise_exception=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        return Response(data={"message": "Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class OnboardingCreateView(APIView):

    serializer_class = OnboardingSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        url = "https://api.zuri.chat/data/write"
        company = request.data['company']
        sector = request.data['sector']
        position = request.data['position']
        data = {
            "plugin_id": "613b677d41f5856617552f1e",
            "organization_id": "613a495f59842c7444fb0246",
            "collection_name": "user_profil",
            "bulk_write": False,
            "payload": {
                "company": company,
                "sector": sector,
                "position": position
            }
        }
        response = requests.request("POST", url, data=json.dumps(data))
        r = response.json()
        print(response.status_code)
        print(r)
        if response.status_code == 201:
            return Response(data={'message': 'successful'}, status=status.HTTP_201_CREATED)
        return Response(data={"message": "Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)