from django.conf import settings
import requests, json
# from rest_framework.response import Response
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
PROSPECTS_COLLECTION_NAME = settings.PROSPECTS_COLLECTION_NAME
PROSPECTS_ROOM_ID = settings.PROSPECTS_ROOM_ID
DEALS_ROOM_ID = settings.DEALS_ROOM_ID
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION

# Fetch all the test room - public rooms
# Fetch all the actual room - joined rooms




# def getsidebbarinfo(org,user):
#     public_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
#     private_url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ADDED_ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
#     public_r = requests.get(public_url)
#     private_r = requests.get(private_url)
#     public_response = json.loads(public_r.text)
#     private_response = json.loads(private_r.text)
#     if private_response['status']!=200:
#         return Response({"name": PLUGIN_NAME,
#         "description": DESCRIPTION,
#         "plugin_id": PLUGIN_ID,
#         "organisation_id": org,
#         "user_id": user,
#         "group_name": "SALES",
#         "show_group": False,
#         "Public rooms":public_response['data'],
#         "Joined rooms":[]})
#     else:
#         return Response({"name": PLUGIN_NAME,
#         "description": DESCRIPTION,
#         "plugin_id": PLUGIN_ID,
#         "organisation_id": org,
#         "user_id": user,
#         "group_name": "SALES",
#         "show_group": False,
#         "Public rooms":private_response['data'],
#         "Joined rooms":private_response['data']})














def sidebardealsrooms():
    url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}?id={DEALS_ROOM_ID}"
    r = requests.get(url)
    response = json.loads(r.text)
    if response['status'] == 200:
        data = {
            "_id": response['data']['_id'],
            "deals": response['data']['deals']
        }

        return data
        
    else:
        data = {
            "error": "rooms not available"
        }

        return data





def sidebarprospectsrooms():
    url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}?id={PROSPECTS_ROOM_ID}"
    r = requests.get(url)
    response = json.loads(r.text)
    if response['status'] == 200:
        data = {
            "_id": response['data']['_id'],
            "prospects": response['data']['prospects']
        }

        return data
        
    else:
        data = {
            "error": "rooms not available"
        }

        return data







def success_query():
    data = {
        "name": settings.PLUGIN_NAME,
        "plugin_id": settings.PLUGIN_ID,
        "description": settings.DESCRIPTION,
        "organisation_id": settings.ORGANISATION_ID,
        "group_name": "Plugin",
        "show_group": False,
        "joined_rooms": [
            {
            "title": "prospects",
            "id": "6139391dd941c451490f3f2f",
            "url": "https://sales.zuri.chat/api/v1/prospects/",
            "unread": 0,
            "badge_type": "info",
            "members": 15,
            "icon": "spear.png",
            "action": "open"
            },
            {
            "title": "deals",
            "id": "6139393ed941c451490f3f30",
            "url": "https://sales.zuri.chat/api/v1/deals/",
            "unread": 0,
            "badge_type": "info",
            "members": 2,
            "icon": "spear.png",
            "action": "open"
            },
        ],
        "public_rooms": [
            {
                "title": "prospects",
                "url": "https://sales.zuri.chat/api/v1/prospects/",
                "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
                "action" : "open",
                "auto-join" : True
            },

            {
                "title": "deals",
                "url": "https://sales.zuri.chat/api/v1/deals/",
                "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
                "action" : "open",
                "auto-join" : True
            },
        ]
    }

    return data


