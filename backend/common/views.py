import requests, json

from django.http import Http404
from django.conf import settings
from django.shortcuts import render
# from django.views.static import serve as static_serve
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializers import RoomSerializer, RoomCreateSerializer
from rest_framework.decorators import api_view
from rest_framework import status

from drf_spectacular.utils import extend_schema


### api/v1/sidebar?org=5336&user=Devjoseph&token=FGEZJJ-ZFDGB-FDGG
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION

class SidebarView(APIView):
    def get(self,request,*args, **kwargs):
        user = request.GET.get('user')
        org = request.GET.get('org')
        
        if request.GET.get('org') and request.GET.get('user'):
            url = f'https://api.zuri.chat/organizations/{org}/members/{user}'
            headers = {
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpFMU9EazNOM3hIZDNkQlIwUlplRTVVWkcxTlZFWnNUMWRKZWs5SFNYZFBWMVV3VFVSS2JGbHRSbWhPWnowOWZMa0hCYlk1d1RwNDJQV0pmVS03ejNta1dkOElTMEx6ZjU5d0paVy1ZOUZOIiwiZW1haWwiOiJkZXZqb3NlcGhjaGluZWR1QGdtYWlsLmNvbSIsImlkIjoiNjE1N2YxMWU5YjM4YjA5ZTQwMmViYWE2Iiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6Nzk0MDM1NDI2NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.F5_qKjQUVJtsd3aLbdO-pbjdkiKPVFzyW-Dbkr9Tp44",
                "Content-Type" : "application/json",
                }
            
           
            r = requests.get(url,headers=headers)
            print(r.status_code)
            
            if r.status_code:
                print(r.status_code)
                public_url = f'http://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}'
                private_url = f'http://api.zuri.chat/data/read/{PLUGIN_ID}/{ADDED_ROOM_COLLECTION_NAME}/{ORGANISATION_ID}'
                public_r = requests.get(public_url)
                private_r = requests.get(private_url)
                print(private_r,public_r)
                public_response = json.loads(public_r.text)
                private_response = json.loads(private_r.text)
                
                if private_response['status']==200:
                    print(r.status_code)

                    return Response({
                        "name": PLUGIN_NAME,
                        "description": DESCRIPTION,
                        "plugin_id": PLUGIN_ID,
                        "organisation_id": org,
                        "user_id": user,
                        "group_name": "SALES",
                        "show_group": False,
                        "public_rooms":[],
                        "joined_rooms":public_response['data'] if public_response['status'] != 404 else []
                    })
                else:
                    return Response({
                        "name": PLUGIN_NAME,
                        "description": DESCRIPTION,
                        "plugin_id": PLUGIN_ID,
                        "organisation_id": org,
                        "user_id": user,
                        "group_name": "SALES",
                        "show_group": False,
                        "public_rooms":private_response['data'],
                        "joined_rooms":public_response['data'] if public_response['status'] != 404 else []
                    })
            else:
                return Response({
                    "name": PLUGIN_NAME,
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "SALES",
                    "show_group": False,
                    "public_rooms":[],
                    "joined_rooms":[]
                })
        else:
            return Response({
                
                "name": PLUGIN_NAME,
                "description": DESCRIPTION,
                "plugin_id": PLUGIN_ID,
                "organisation_id": org,
                "user_id": user,
                "group_name": "SALES",
                "show_group": False,
                "public_rooms":[],
                "joined_rooms":[]
            })


def is_valid(param):
    return param != "" and param is not None

class InfoView(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                "name": "Sales Prospects Plugin",
                "description": [
                "Zuri.chat plugin",
                "A plugin for Zuri Chat that enables the users to get prospects for their respective businesses "
                ]
                },
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team plugin sales-crm",
                "sidebar_url": "https://sales.zuri.chat/api/v1/sidebar/",
                "ping_url": "https://sales.zuri.chat/api/v1/ping/",
                "homepage_url": "https://sales.zuri.chat/"
                },
                "success": True
        }
        return Response(data=data, status=status.HTTP_200_OK)

class RoomCreateView(APIView):
    serializer_class = RoomCreateSerializer
    @extend_schema(
        description = "Room Name (str) : The name of the room\
            This view creates a room if there isn't a room that has the specified name"
    )
    def post(self, request, *args, **kwargs):
        room_name = request.data.get('room_name')
        user = request.data.get('user')
        icon = request.data.get('icon')
        if not is_valid(user):
            raise Http404("user_id not supplied")
        if not is_valid(room_name):
            raise Http404("room_name not supplied")
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ADDED_ROOM_COLLECTION_NAME}/{ORGANISATION_ID}/"
        res = requests.request("GET", url=get_url)
        if res.status_code == 200 and is_valid(res.json().get('data')):
            rooms = res.json()['data']

            current_room = filter(lambda room: room['name'] == room_name, rooms)
            current_room = list(current_room)

            if len(current_room) > 0:
                return Response({"message":"This room already exists"}, status=status.HTTP_400_BAD_REQUEST)
            data = {
                "plugin_id": PLUGIN_ID,
                "organization_id": ORGANISATION_ID,
                "collection_name": ROOM_COLLECTION_NAME,
                "bulk_write": False,
                "payload": {
                    "name": room_name,
                    "users": [user],
                    "icon":icon
                }
            }
            post_url = 'https://api.zuri.chat/data/write/'
            res = requests.request("POST", url=post_url, data=data)

            if res.status_code in [201, 200]:

                response = {
                    "message": "successful",
                    "room_name": room_name,
                    "members": [user],
                    "rooms":"http://sales.zuri.chat/api/v1/rooms/"
                }
                return Response(data=response, status=status.HTTP_200_OK)
        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

class AddUserToRoom(APIView):
    serializer_class = RoomSerializer
    @extend_schema(
        description = "Room Name (str) : The name of the room\
            User Id (int): The id of the user to be added to the rooom\n\
            This view creates a room if there isn't a room that has the specified name\n\
            If there's a room with the name specified, the room's members are merely updated\
            in the sense that the userId supplied is added to the room.\n"
    )
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
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}/"
        res = requests.request("GET", url=get_url)
        if res.status_code == 200 and is_valid(res.json().get('data')):
            rooms = res.json()['data']

            current_room = filter(lambda room: room.get('name') == room_name, rooms)
            current_room = list(current_room)

            if len(current_room) > 0:
                method = "PUT"
                object_id = current_room[0]['_id']
                current_users = current_room[0]['users']

        current_users.append(user)
        current_users = list(set(current_users))

        post_url = 'https://api.zuri.chat/data/write/'
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": ROOM_COLLECTION_NAME,
            "object_id": object_id,
            "bulk_write": False,
            "payload": {
                "name": room_name,
                "users": current_users
            }
        }
        res = requests.request(method, url=post_url, data=json.dumps(data))
        print(res.json())
        if res.status_code in [201, 200]:

            response = {
                "message": "successful",
                "room_name": room_name,
                "members": current_users,
                "rooms":"http://sales.zuri.chat/api/v1/rooms/"
            }
            return Response(data=response, status=status.HTTP_200_OK)
        else:
            try:
                return Response(data=res.json(), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            except:
                return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RoomsListView(APIView):
    def get(self, request, *args, **kwargs):
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}/"
        res = requests.request("GET", url=get_url)
        print(res.json())
        if res.status_code == 200 and is_valid(res.json().get('data')):
            return Response(data=res.json()['data'], status=status.HTTP_200_OK)
        return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RemoveUserFromRoom(APIView):
 
         
    serializer_class = RoomSerializer
    def post(self, request, *args, **kwargs):
        
        # url to fetch all rooms
        get_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}/"
        
        # make a get request to the url to fetch all existing rooms 
        user_to_remove = request.data.get('user')
        room_name = request.data.get('room_name')
        
        res = requests.request("GET", url=get_url)
        if res.status_code != 200:
            return Response(data={"message": "error occur while retrieving data for all rooms"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # extract rooms from the response
        rooms = res.json()['data']
        
        current_room = filter(lambda room: room['name'] == room_name, rooms)
        current_room = list(current_room)
        print(current_room)
        if len(current_room) == 0:
            return Response(data={"message": "Room does not exist"}, status=status.HTTP_404_NOT_FOUND)

        object_id = current_room[0]['_id']
        current_users = current_room[0]['users']
        print(user_to_remove , current_users)
        
        if (user_to_remove in current_users):
            #  return Response(data={"message": "This user does not belong to this room"}, status=status.HTTP_404_NOT_FOUND)
            current_users.remove(user_to_remove)
            print(current_users)
            #   current_users = set(current_users)
            put_url = 'https://api.zuri.chat/data/write/'
            data = {
                    "plugin_id": PLUGIN_ID,
                    "organization_id": ORGANISATION_ID,
                    "collection_name": "sales_room",
                    "object_id": object_id,
                    "bulk_write": False,
                    "payload": {
                        "name": room_name,
                        "users": current_users
                    }
                }
            res = requests.request("POST", url=put_url, data=json.dumps(data))
            if res.status_code in [201, 200]:
                return Response(data={"message":"user "+ user_to_remove + " has been removed from room "+ room_name}, status=status.HTTP_200_OK)
            return Response(data={"message": "failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(data={"message": "This user does not exist to this room"}, status=status.HTTP_404_NOT_FOUND)

# def serve(request, path, document_root=None, show_indexes=False):
#     """
#     An override to `django.views.static.serve` that will allow us to add our
#     own headers for development.

#     Like `django.views.static.serve`, this should only ever be used in
#     development, and never in production.
#     """
#     response = static_serve(request, path, document_root=document_root,
#         show_indexes=show_indexes)

#     response['Access-Control-Allow-Origin'] = '*'
#     return response
def access_endoints(request):
    print('eeede')
    
    ENDPOINTS = [
        "https://sales.zuri.chat/api/v1/prospects/",
        "https://sales.zuri.chat/api/v1/prospects/{id}/",
        "https://sales.zuri.chat/api/v1/prospects/create/",
        "https://sales.zuri.chat/api/v1/prospects/update/{id}",
        "https://sales.zuri.chat/api/v1/prospects/delete/{id}",
        "https://sales.zuri.chat/api/v1/deals/",
        "https://sales.zuri.chat/api/v1/deals/{id}",
        "https://sales.zuri.chat/api/v1/deals/create/",
        "https://sales.zuri.chat/api/v1/deals/update/{id}",
        "https://sales.zuri.chat/api/v1/deals/delete/{id}",
        "https://sales.zuri.chat/api/v1/add-to-room/",
        "https://sales.zuri.chat/api/v1/room/",
        "https://sales.zuri.chat/api/v1/leave-room/",
        "https://sales.zuri.chat/api/v1/sidebar/",
    ]
    GET_ENDPOINTS = [
        "https://sales.zuri.chat/api/v1/prospects/",
        "https://sales.zuri.chat/api/v1/prospects/{id}/",
        "https://sales.zuri.chat/api/v1/deals/",
        "https://sales.zuri.chat/api/v1/deals/{id}/",
        "https://sales.zuri.chat/api/v1/room/",
        "https://sales.zuri.chat/api/v1/sidebar/",
    ]

    POST_ENDPOINTS = [
        "https://sales.zuri.chat/api/v1/prospects/create/",
        "https://sales.zuri.chat/api/v1/deals/create/",
        "https://sales.zuri.chat/api/v1/prospects/delete/{id}/",
        "https://sales.zuri.chat/api/v1/deals/delete/{id}/",
        "https://sales.zuri.chat/api/v1/prospects/delete/batch/",
        "https://sales.zuri.chat/api/v1/deals/delete/batch/",
        "https://sales.zuri.chat/api/v1/add-to-room/",
        "https://sales.zuri.chat/api/v1/leave-room/",
    ]

    status_codes = []
    responses = []
     
    for endpoint in GET_ENDPOINTS:
        # organisation_content = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TkRBeU5qazNOSHhIZDNkQlIwUlplRTVxVlRCT1YxSnNXVEpGTlUxSFZUVk5iVTVvV1ZSU2FVMVhSbXRPZHowOWZMdUpuaHVOMHZodV9Tbk13T0dXRUgwQVY5RTFNTFlCUFU2RWxwZW9Hd1BwIiwiZW1haWwiOiJrb3JkdGVjaG5vbEBnbWFpbC5jb20iLCJpZCI6IjYxNjU0NWRlY2E5MGU5MmNhYTRiMWFkNyIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5NDEyMjYwNTEsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.52INh852cLlAedLPWa7Dg6n9xv9pSkvi9UcEJhNFwkc"
        # authorization_content = organisation_content
        # # url = 'https://api.zuri.chat/auth/verify-token/'
        # headers = {"Authorization":f'Bearer {authorization_content}'}
        # r = requests.request("GET", url=endpoint, headers=headers)
        r = requests.get(endpoint)
        status_codes.append(r.status_code)
        print(r.status_code)

        try:
            data = r.json()
            data["status_code"] = r.status_code
            data["method"] = "GET"
            data["type"] = "Status"
            data["endpoint"] = endpoint
            data["success"] = True
        except:
            data = {"success": False}
        responses.append(data)

    for endpoint in POST_ENDPOINTS:
        # organisation_content = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TkRBeU5qazNOSHhIZDNkQlIwUlplRTVxVlRCT1YxSnNXVEpGTlUxSFZUVk5iVTVvV1ZSU2FVMVhSbXRPZHowOWZMdUpuaHVOMHZodV9Tbk13T0dXRUgwQVY5RTFNTFlCUFU2RWxwZW9Hd1BwIiwiZW1haWwiOiJrb3JkdGVjaG5vbEBnbWFpbC5jb20iLCJpZCI6IjYxNjU0NWRlY2E5MGU5MmNhYTRiMWFkNyIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5NDEyMjYwNTEsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.52INh852cLlAedLPWa7Dg6n9xv9pSkvi9UcEJhNFwkc"
        # authorization_content = request.headers['Authorization']
        # url = 'https://api.zuri.chat/auth/verify-token/'
        # headers = {"Authorization":authorization_content}
        # r = requests.request("GET", url=url, headers=headers)
        r = requests.get(endpoint)
        status_codes.append(r.status_code)
        print(status_codes)

        try:
            data = r.json()
            data["status_code"] = r.status_code
            data["method"] = "POST"
            data["type"] = "Status"
            data["endpoint"] = endpoint
            data["success"] = True
        except:
            data = {"success": False}
        responses.append(data)

    statuses = []
    # report = "OK!"
    # for i in responses:
    #     statuses.append(i["success"])
    # if not all(statuses):
    #     report = "ERROR"
    # context = {"responses": responses, "report": report}
    # # print(context)

    return render(request, 'index.html', {"responses":responses})