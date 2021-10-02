import json, requests
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .serializers import ScrapingSerializer
from .facebook_scraper import FacebookScraper


class ScrapingCreateView(APIView):

    serializer_class = ScrapingSerializer
    queryset = None

    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        data = {"username": username}
        fb_scraper = FacebookScraper()
        scrape = fb_scraper.get_profile(data["username"])
        return Response(scrape, status=status.HTTP_201_CREATED)
        
        