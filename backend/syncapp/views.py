from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view


import json
import requests

from django.conf import settings
from django.http import JsonResponse

from common.utils import handle_failed_request, isValidOrganisation, isAuthorized

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
CREATED_ROOMS = settings.CREATED_ROOMS
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME




def sync_function(request):
    print(request)
    url = 'https://api.zuri.chat/marketplace/plugins/6169bdd9eb5b3de309e7e27a/'
    response = requests.get(url)
    print('response: ')
    print(response)
    print('response.json(): ')
    print(response.json()['data']['id'])
    return JsonResponse(response.json())

def test_function(request):
    # patch_function()
    return Response({"status": True, "message":"OK"}, status=status.HTTP_200_OK)
    

def patch_function():
    url = 'https://api.zuri.chat/plugins/6169bdd9eb5b3de309e7e27a/sync'
    response = requests.patch(url, data={"id": []})
    return JsonResponse(response.json())










# # def test_function_view(request, org_id, member_id, *args, **kwargs):
# def test_function(request):
#     result = sync_function(request)
#     return result













def patch(payload):
        url = f"https://api.zuri.chat/data/write"

        data = {

            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": payload,
        }
        response = requests.request("PUT", url, data=json.dumps(data))
        r = response.json()

# class ProspectsCreateView(APIView):
#     """
#     Documentation here.
#     """

#     serializer_class = ProspectSerializer
#     queryset = None

#     def post(self, request, org_id,user_id, *args, **kwargs):
#         # # check authentication
#         # if not isAuthorized(request):
#         #     return handle_failed_request(response=None)

#         # if not isValidOrganisation(ORGANISATION_ID, request):
#         #     return handle_failed_request(response=None)

#         print(request)
#         print(org_id)

#         sync_function(request)

#         # serializer = ProspectSerializer(data=request.data)
#         # print(serializer)

#         serializer.is_valid(raise_exception=True)
#         print(serializer.is_valid(raise_exception=True))
        
#         payload = {

#                 "name": serializer.data.get("name"),
#                 "email": serializer.data.get("email"),
#                 "organisation_id": org_id,
#                 "user_id": user_id,
#                 "phone_number": serializer.data.get("phone_number"),
#                 "company": serializer.data.get("company"),
#                 "twitter": serializer.data.get("twitter"),
#                 "facebook": serializer.data.get("facebook"),
#                 "linkedin": serializer.data.get("linkedin"),
#                 "instagram": serializer.data.get("instagram")
#         }
#         print(payload)

#         response = CustomRequest.post(org_id,'prospects', payload)
#         print(response)