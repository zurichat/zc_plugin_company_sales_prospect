from onboarding.serializers import OnboardingSerializer
from rest_framework.views import APIView
import requests
import json
from rest_framework.response import Response
from rest_framework import status as st

# Create your views here.
class OnboardingCreateView(APIView):
    serializers_class = OnboardingSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        url = "https://zccore.herokuapp.com/data/write"
        company = request.data['company']
        sector = request.data['sector']
        position = request.data['position']
        data = {
                "plugin_id": "000000000000000000000000",
                "organization_id": "612a3a914acf115e685df8e3",
                "collection_name": "onboarding",
                "bulk_write": False,
                "payload": {
                    "company":company,
                    "sector":sector,
                    "position":position,
                
            }      
        }
        
        response = requests.request("POST", url,data=json.dumps(data))
        r = response.json()
        if response.status_code == 201:
            return Response(data={'message':'successful'}, status=status.HTTP_201_CREATED)
        return Response(data={"message":"Try again later"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)