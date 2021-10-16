from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view

from .serializers import RoomCreateSerializer, RoomSerializer

from.utils import isAuthorized
import json

import requests
from django.conf import settings
from django.http import JsonResponse
from common.utils import centrifugo_post,sidebar_update
from .utils import handle_failed_request, isValidOrganisation
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
CREATED_ROOMS = settings.CREATED_ROOMS
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME





def is_valid(param):
    return param != "" and param is not None

class CreateRoomApi(APIView):
    serializer_class = RoomCreateSerializer
    
    def post(self,request,org_id,member_id,*args, **kwargs):
        serializer = RoomCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        room_name = serializer.data.get('room_name')
        member = member_id
        #checks for the room
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}/"
        res = requests.request("GET", url=get_url)
        if res.status_code == 200:
            print("sigh 2")
            data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": org_id,
                "collection_name": ROOM_COLLECTION_NAME,
                "bulk_write": False,
                "payload": {
                    "room_name": room_name,
                    "room_member_id": [member],
                }
            }
            
            post_url = 'https://api.zuri.chat/data/write'
            res = requests.request("POST", url=post_url, data=json.dumps(data))
            print(res.status_code,res._content)
            if res.status_code in [201, 200]:
                print("sigh 2")
                print(res.json())
                responses = res.json()
                room_url_data = responses['data']
                print("sigh 2")
                room_url = room_url_data['object_id']
                data_with_url = {
                "plugin_id": PLUGIN_ID,
                "organization_id": org_id,
                "collection_name": ROOM_COLLECTION_NAME,
                "object_id": room_url,
                "bulk_write": False,
                "payload": {
                    "room_url": f"/sales/{room_url}"
                    }
                }
                #add the room url to the room for the side bar to see
                res_url = requests.request("PATCH", url=post_url, data=json.dumps(data_with_url))
                print(res_url.status_code)
                if res_url.status_code in [201, 200]:
                    response = {
                        "room_id":room_url,
                        "room_name": room_name,
                        "members": member,
                        "room_url": f"/sales/{room_url}"
                        
                    }
                    print("sigh 2")
                    # centrifugo_post(room_name,sidebar_update(response))
                    return Response(data=response, status=status.HTTP_200_OK)
                return Response(data={"message":"room created but no url inserted yet"}, status=status.HTTP_200_OK)
        return Response(data={"message": "failed"}, status=status.HTTP_400_BAD_REQUEST)


class AddUsersToRoomApi(APIView):
    serializer_class = RoomSerializer
    
    def post(self,request, org_id,room_id,member_id,*args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        room_id = room_id
        member_id = member_id
        members = serializer.data.get('members_id')
        current_users = []
        object_id = None
        method = "POST"
        #checks for the room
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{org_id}"
        res = requests.request("GET", url=get_url)
        print(res.status_code,res._content)
        print("sigh 0")
        if res.status_code == 200 and is_valid(res.json().get('data')):
            print("sigh 1")
            rooms = res.json()['data']
            current_room = filter(lambda room: room.get('_id') == room_id, rooms)
            current_room = list(current_room)
            print(current_room)
            print(method)
            if len(current_room) > 0:
                method = "PUT"
            object_id = current_room[0]['_id']
            current_users = current_room[0]['room_member_id']
            room_name = current_room[0]['room_name']
            #adds the new user for the room
            for i in members:
                current_users.append(i)
            current_users = list(set(current_users))
            post_url = 'https://api.zuri.chat/data/write'
            data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": ROOM_COLLECTION_NAME,
                "object_id": object_id,
                "bulk_write": False,
                "payload": {
                    "room_member_id": current_users
                }
            }
            resp = requests.request(method, url=post_url, data=json.dumps(data))
            print(resp.json())
            if resp.status_code in [201, 200]:
                response = {
                    "room_id":object_id,
                    "room_name": room_name,
                    "members": current_users,
                    "room_url": f"/sales/{object_id}"
                }
                return Response(data=response, status=status.HTTP_200_OK)
            else:
                try:
                    return Response(data=resp.json(), status=status.HTTP_400_BAD_REQUEST)
                except:
                    return Response(data={"message": "SIGH"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RemoveUserFromRoomApi(APIView):
    serializer_class = RoomSerializer
    
    def post(self, request,org_id,room_id,member_id, *args, **kwargs):
        serializer = RoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{org_id}/"
        room_id = room_id
        member_id = member_id
        user_to_remove = serializer.data.get('members_id')
        #checks for the room
        res = requests.request("GET", url=get_url)
        if res.status_code == 200:
            print("sigh 1")
            rooms = res.json()['data']
            current_room = filter(lambda room: room.get('_id') == room_id, rooms)
            current_room = list(current_room)
            print(current_room)
            object_id = current_room[0]['_id']
            current_users = current_room[0]['room_member_id']
            room_name = current_room[0]['room_name']
            print(current_users)
            print(user_to_remove)
            for i in list(user_to_remove): 
                print(i)   
                if (i in current_users):
                    print("sigh 2")
                    #removes the new user for the room
                    current_users.remove(i)
                print(current_users)
                patch_url = 'https://api.zuri.chat/data/write'
                data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": ROOM_COLLECTION_NAME,
                "object_id": object_id,
                "bulk_write": False,
                "payload": {
                    "room_member_id": current_users
                }
            }
                resp = requests.request("PATCH", url=patch_url, data=json.dumps(data))
                print(resp.json())
                if resp.status_code in [201, 200]:
                    response = {
                        "room_id":object_id,
                        "room_name": room_name,
                        "members": current_users,
                        "room_url": f"/sales/{object_id}"
                    }
                    return Response(data=response, status=status.HTTP_200_OK)
                else:
                    try:
                        return Response(data=resp.json(), status=status.HTTP_400_BAD_REQUEST)
                    except:
                        return Response(data={"message": "SIGH"}, status=status.HTTP_400_BAD_REQUEST)
            return Response(data={"message": "SIGH"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RoomDetailApi(APIView):
    def get(self,request,org_id,room_id, *args, **kwargs):

        print(request)
        print(org_id)
        print(room_id)

        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{org_id}/"
        room_id = room_id

        print(room_id)

        res = requests.request("GET", url=get_url)
        print(res)
        print(res.json())
        if res.status_code == 200:
            rooms = res.json()['data']
            current_room = filter(lambda room: room.get('_id') == room_id, rooms)
            current_room = list(current_room)
            object_id = current_room[0]['_id']
            current_users = current_room[0]['room_member_id']
            room_name = current_room[0]['room_name']
            response = {
                    "room_id":object_id,
                    "room_name": room_name,
                    "members": current_users,
                    "room_url": f"/sales/{object_id}"
                }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data="No rooms for this Org", status=status.HTTP_404_NOT_FOUND)
