import json, requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import ScrapingSerializer
from .facebook_scraper import FacebookScraper
# from .facebook_scraper import get_profile # fix this import 








class ScrapingCreateView(APIView):

    serializer_class = ScrapingSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        data = {"username": username}
        cookies = {
            "c_user":"100009581441147",
            "xs":"18%3AyZbK-SRI7fC4ZQ%3A2%3A1634069525%3A-1%3A3235"
        }
        scrape = get_profile(f"{username}", cookies=cookies)
        data = {
            "Name": scrape['Name'],
            "faceebook_url": f"facebook/{scrape['id']}",
            "photo_url": scrape['profile_picture']
        }

        
       
        return Response(data, status=status.HTTP_201_CREATED)
        
        