import json

import requests
from django.http import Http404
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.views import APIView
from rest_framework import serializers


class RoomSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    room_name = serializers.CharField()


def is_valid(param):
    return param != "" and param is not None


@api_view(['GET'])
def info(request):
    if request.method == 'GET':
        data = {
            "info":{
                "name": "info",
                "url": "https://sales.zuri.chat/api/info"
            },
            "about":{
                "name": "about",
                "url": "https://sales.zuri.chat/api/info"
            }
        }
        return Response(data, status=status.HTTP_200_OK)


class AddUserToRoom(APIView):
    """
    Room Name (str) : The name of the room
    User Id (int): The id of the user to be added to the rooom\n
    This view creates a room if there isn't a room that has the specified name\n
    If there's a room with the name specified, the room's members are merely updated
    in the sense that the userId supplied is added to the room.\n
    """
    serializer_class = RoomSerializer

    def post(self, request, *args, **kwargs):

        room_name = request.data.get('room_name')
        user = request.data.get('user')
        if not is_valid(user):
            raise Http404("user_id not supplied")
        if not is_valid(room_name):
            raise Http404("room_name not supplied")
        method = "POST"
        current_users = []
        object_id = None
        get_url = "https://api.zuri.chat/data/read/613b677d41f5856617552f1e/sales_room/613a495f59842c7444fb0246"
        res = requests.request("GET", url=get_url)
        if res.status_code == 200 and is_valid(res.json().get('data')):
            rooms = res.json()['data']

            current_room = filter(lambda room: room['name'] == room_name, rooms)
            current_room = list(current_room)

            if len(current_room) > 0:
                method = "PUT"
                object_id = current_room[0]['_id']
                current_users = current_room[0]['users']

        current_users.append(user)
        current_users = list(set(current_users))

        post_url = 'https://api.zuri.chat/data/write'
        data = {
            "plugin_id": "613b677d41f5856617552f1e",
            "organization_id": "613a495f59842c7444fb0246",
            "collection_name": "sales_room",
            "object_id": object_id,
            "bulk_write": False,
            "payload": {
                "name": room_name,
                "users": current_users
            }
        }
        res = requests.request(method, url=post_url, data=json.dumps(data))

        if res.status_code in [201, 200]:

            response = {
                "message": "successful",
                "room_name": room_name,
                "members": current_users,
                "rooms":"http://sales.zuri.chat/api/v1/rooms/"
            }
            return Response(data=response, status=status.HTTP_200_OK)

        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RoomsListView(APIView):
    def get(self, request, *args, **kwargs):
        get_url = "https://api.zuri.chat/data/read/613b677d41f5856617552f1e/sales_room/613a495f59842c7444fb0246"
        res = requests.request("GET", url=get_url)
        if res.status_code == 200 and is_valid(res.json().get('data')):
            return Response(data=res.json()['data'], status=status.HTTP_200_OK)
        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
#
# class DeleteUserToRoom(APIView):
#     serializer_class = RoomSerializer
#
#     def post(self, request, *args, **kwargs):
#
#         room_name = request.data.get('room_name')
#         user = request.data.get('user')
#         if not is_valid(user):
#             raise Http404("user_id not supplied")
#         if not is_valid(room_name):
#             raise Http404("room_name not supplied")
#
#         current_users = []
#         object_id = None
#         get_url = "https://api.zuri.chat/data/read/613b677d41f5856617552f1e/sales_room/613a495f59842c7444fb0246"
#         res = requests.request("GET", url=get_url)
#         if res.status_code == 200 and is_valid(res.json()['data']):
#             rooms = res.json()['data']
#
#             current_room = filter(lambda room: room['name'] == room_name, rooms)
#             current_room = list(current_room)
#
#             if len(current_room) > 0:
#                 current_users.append(user)
#                 current_users = list(set(current_users))
#                 REMOVE THE ID FROM THE CURRENT USERS OF THAT ROOM THEN UPDATE THE ROOM WITH THE CURRENT USERS
#                 post_url = 'https://api.zuri.chat/data/write'
#                 data = {
#                     "plugin_id": "613b677d41f5856617552f1e",
#                     "organization_id": "613a495f59842c7444fb0246",
#                     "collection_name": "sales_room",
#                     "object_id": object_id,
#                     "bulk_write": False,
#                 }
#                 res = requests.request("DELETE", url=post_url, data=json.dumps(data))
#
#                 if res.status_code in [201, 200]:
#                     response = {
#                         "message": "successful",
#                         "room_name": room_name,
#                         "members": current_users
#                     }
#                     return Response(data=response, status=status.HTTP_200_OK)
#
#         return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)