from django.conf import settings
import requests
import json



def sidebardealsrooms():
    url = "https://api.zuri.chat/data/read/614105b66173056af01b4cca/salesrooms/613a495f59842c7444fb0246?id=614d11271df928467cc563d8"
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
    url = "https://api.zuri.chat/data/read/614105b66173056af01b4cca/salesrooms/613a495f59842c7444fb0246?id=614d12901df928467cc563df"
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


