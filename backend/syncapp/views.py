import json

import requests
from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response

# from rest_framework.views import APIView
# from rest_framework.decorators import api_view




# from common.utils import handle_failed_request, is_valid_organisation, is_authorized

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
CREATED_ROOMS = settings.CREATED_ROOMS
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME


def sync_function(request):
    """[summary]

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """    
    print(request)
    url = "https://api.zuri.chat/marketplace/plugins/6169bdd9eb5b3de309e7e27a/"
    response = requests.get(url)
    print("response: ")
    print(response)
    print("response.json(): ")
    print(response.json()["data"]["id"])
    return JsonResponse(response.json())


def test_function():
    """[summary]

    Args:
        request ([type]): [description]

    Returns:
        [type]: [description]
    """    
    # patch_function()
    return Response({"status": True, "message": "OK"}, status=status.HTTP_200_OK)


def patch_function():
    """[summary]

    Returns:
        [type]: [description]
    """    
    url = "https://api.zuri.chat/plugins/6169bdd9eb5b3de309e7e27a/sync"
    response = requests.patch(url, data={"id": []})
    return JsonResponse(response.json())


# # def test_function_view(request, org_id, member_id, *args, **kwargs):
# def test_function(request):
#     result = sync_function(request)
#     return result


def patch(payload):
    """[summary]

    Args:
        payload ([type]): [description]
    """    
    url = "https://api.zuri.chat/data/write"

    data = {
        "plugin_id": PLUGIN_ID,
        "organization_id": ORGANISATION_ID,
        "collection_name": "collection_name",
        "bulk_write": False,
        "payload": payload,
    }
    response = requests.request("PUT", url, data=json.dumps(data))
    return response.json()

