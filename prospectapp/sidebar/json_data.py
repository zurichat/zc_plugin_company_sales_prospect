from rest_framework.response import Response
from rest_framework import status
from django.contrib.sites.shortcuts import get_current_site
from django.conf import settings
import requests
import json

def success_query(user_id, org, token):
    if user_id == "Devjoseph":
        data = {
            "name": "sales plugin",
            "plugin_id": settings.PLUGIN_ID,
            "description": settings.DESCRIPTION,
            "organisation_id": settings.ORGANIZATION_ID,
            "group_name": settings.PLUGIN_NAME,
            "user_id": f"{user_id}",
            "show_group": False,
            "joined_rooms": [
                {
                "title": "eni4sure vs none",
                "id": "6139391dd941c451490f3f2f",
                "url": "https://chess.zuri.chat/game?id=6139391dd941c451490f3f2f",
                "unread": 0,
                "badge_type": "info",
                "members": 15,
                "icon": "spear.png",
                "action": "open"
                },
                {
                "title": "trending",
                "id": "6139393ed941c451490f3f30",
                "url": "https://channels.zuri.chat/create-channel",
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
    else:
        return 501



def no_query_params():
    data = {
        "name": "sales plugin",
        "plugin_id": settings.PLUGIN_ID,
        "description": settings.DESCRIPTION,
        "organisation_id": settings.ORGANIZATION_ID,
        "group_name": settings.PLUGIN_NAME,
        "show_group": False,
        "joined_rooms": [],
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