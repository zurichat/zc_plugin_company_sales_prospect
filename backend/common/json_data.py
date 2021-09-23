from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import requests
import json

def success_query():
    data = {
        "name": "sales plugin",
        "plugin_id": settings.PLUGIN_ID,
        "description": settings.DESCRIPTION,
        "organisation_id": settings.ORGANIZATION_ID,
        "group_name": settings.PLUGIN_NAME,
        "user_id": f"123456",
        "show_group": False,
        "joined_rooms": [
            {
            "title": "prospects",
            "id": "6139391dd941c451490f3f2f",
            "url": "https://sales.zuri.chat/prospects/",
            "unread": 0,
            "badge_type": "info",
            "members": 15,
            "icon": "spear.png",
            "action": "open"
            },
            {
            "title": "deals",
            "id": "6139393ed941c451490f3f30",
            "url": "https://sales.zuri.chat/deals/",
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
                "url": "https://sales.zuri.chat/prospects/",
                "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
                "action" : "open",
                "auto-join" : True
            },

            {
                "title": "deals",
                "url": "https://sales.zuri.chat/deals/",
                "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
                "action" : "open",
                "auto-join" : True
            },
        ]
    }

    return data

# def no_query_params():
#     data = {
#         "name": "sales plugin",
#         "plugin_id": settings.PLUGIN_ID,
#         "description": settings.DESCRIPTION,
#         "organisation_id": settings.ORGANIZATION_ID,
#         "group_name": settings.PLUGIN_NAME,
#         "show_group": False,
#         "joined_rooms": [],
#         "public_rooms": [
#             {
#                 "title": "prospects",
#                 "url": "https://sales.zuri.chat/prospects/",
#                 "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
#                 "action" : "open",
#                 "auto-join" : True
#             },

#             {
#                 "title": "deals",
#                 "url": "https://sales.zuri.chat/deals/",
#                 "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
#                 "action" : "open",
#                 "auto-join" : True
#             },
#         ]
#     }

#     return data