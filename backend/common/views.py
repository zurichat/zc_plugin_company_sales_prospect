import json

import requests
from common.serializers import InstallSerializer
from common.utils import handle_failed_request, is_authorized, is_valid_organisation
from django.conf import settings
from django.core.paginator import Paginator
from rest_framework import status

# from django.views.static import serve as static_serve
from rest_framework.response import Response
from rest_framework.views import APIView

# api/v1/sidebar?org=5336&user=Devjoseph&token=FGEZJJ-ZFDGB-FDGG
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
ROOM_COLLECTION_NAME = settings.ROOM_COLLECTION_NAME
ADDED_ROOM_COLLECTION_NAME = settings.ADDED_ROOM_COLLECTION_NAME
PLUGIN_NAME = settings.PLUGIN_NAME
DESCRIPTION = settings.DESCRIPTION


class SidebarView(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]
    """

    def get(self, request):
        """[summary]

        Args:
            request ([type]): [description]

        Returns:
            [type]: [description]
        """
        user = request.GET.get("user")
        org = request.GET.get("org")

        if request.GET.get("org") and request.GET.get("user"):
            url = f"https://api.zuri.chat/organizations/{org}/members/{user}"
            headers = {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpFMU9EazNOM3hIZDNkQlIwUlplRTVVWkcxTlZFWnNUMWRKZWs5SFNYZFBWMVV3VFVSS2JGbHRSbWhPWnowOWZMa0hCYlk1d1RwNDJQV0pmVS03ejNta1dkOElTMEx6ZjU5d0paVy1ZOUZOIiwiZW1haWwiOiJkZXZqb3NlcGhjaGluZWR1QGdtYWlsLmNvbSIsImlkIjoiNjE1N2YxMWU5YjM4YjA5ZTQwMmViYWE2Iiwib3B0aW9ucyI6eyJQYXRoIjoiLyIsIkRvbWFpbiI6IiIsIk1heEFnZSI6Nzk0MDM1NDI2NSwiU2VjdXJlIjpmYWxzZSwiSHR0cE9ubHkiOmZhbHNlLCJTYW1lU2l0ZSI6MH0sInNlc3Npb25fbmFtZSI6ImY2ODIyYWY5NGUyOWJhMTEyYmUzMTBkM2FmNDVkNWM3In0.F5_qKjQUVJtsd3aLbdO-pbjdkiKPVFzyW-Dbkr9Tp44",
                "Content-Type": "application/json",
            }

            res = requests.get(url, headers=headers)
            print(res.status_code)

            if res.status_code:
                print(res.status_code)
                public_url = f"http://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
                private_url = f"http://api.zuri.chat/data/read/{PLUGIN_ID}/{ROOM_COLLECTION_NAME}/{ORGANISATION_ID}"
                public_r = requests.get(public_url)
                private_r = requests.get(private_url)
                print(private_r, public_r)
                public_response = json.loads(public_r.text)
                private_response = json.loads(private_r.text)

                if private_response["status"] == 200:
                    print(res.status_code)

                    return Response(
                        {
                            "name": PLUGIN_NAME,
                            "category": "sales",
                            "description": DESCRIPTION,
                            "plugin_id": PLUGIN_ID,
                            "organisation_id": org,
                            "user_id": user,
                            "group_name": "SALES",
                            "show_group": False,
                            "public_rooms": [],
                            "joined_rooms": public_response["data"]
                            if public_response["status"] != 404
                            else [],
                        }
                    )
                else:
                    return Response(
                        {
                            "name": PLUGIN_NAME,
                            "category": "sales",
                            "description": DESCRIPTION,
                            "plugin_id": PLUGIN_ID,
                            "organisation_id": org,
                            "user_id": user,
                            "group_name": "SALES",
                            "show_group": False,
                            "public_rooms": private_response["data"],
                            "joined_rooms": public_response["data"]
                            if public_response["status"] != 404
                            else [],
                        }
                    )
            else:
                return Response(
                    {
                        "name": PLUGIN_NAME,
                        "category": "sales",
                        "description": DESCRIPTION,
                        "plugin_id": PLUGIN_ID,
                        "organisation_id": org,
                        "user_id": user,
                        "group_name": "SALES",
                        "show_group": False,
                        "public_rooms": [],
                        "joined_rooms": [],
                    }
                )
        else:
            return Response(
                {
                    "name": PLUGIN_NAME,
                    "category": "sales",
                    "description": DESCRIPTION,
                    "plugin_id": PLUGIN_ID,
                    "organisation_id": org,
                    "user_id": user,
                    "group_name": "SALES",
                    "show_group": False,
                    "public_rooms": [],
                    "joined_rooms": [],
                }
            )


def is_valid(param):
    """[summary]

    Args:
        param ([type]): [description]

    Returns:
        [type]: [description]
    """
    return param != "" and param is not None


class InfoView(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]
    """

    def get(self):
        """[summary]

        Returns:
            [type]: [description]
        """
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                    "name": "Sales Prospects Plugin",
                    "description": [
                        "Zuri.chat plugin",
                        "A plugin for Zuri Chat that enables the users to get prospects for their respective businesses ",
                    ],
                },
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team plugin sales-crm",
                "sidebar_url": "https://sales.zuri.chat/api/v1/sidebar/",
                "ping_url": "https://sales.zuri.chat/api/v1/ping/",
                "homepage_url": "https://sales.zuri.chat/",
            },
            "success": True,
        }
        return Response(data=data, status=status.HTTP_200_OK)


class SearchSalesInfo(APIView):
    """
    Filters existing prospect by the provided search criteria.
    pass the filter_by keyword as a parameter eg http://127.0.0.1:8200/api/v1/deals/search?collection=prospects&key=buyer123,jgjk,gkj
    filter params can be anything on the deal name,stage,etc.
    """

    def get(self, request, org_id, user_id):
        """[summary]

        Args:
            request ([type]): [description]
            org_id ([type]): [description]
            user_id ([type]): [description]

        Returns:
            [type]: [description]
        """
        # print(org_id)
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(org_id, request):
            return handle_failed_request(response=None)

        # search = request.query_params
        # if search["collection"]:
        collection_name = request.query_params.get("collection") or None
        if collection_name not in ["prospects", "deals"]:
            return Response(
                data={"data": "collection must either be prospects  or deals "},
                status=400,
            )
        key_word = request.query_params.get("key") or []
        if key_word:
            key_word = key_word.split(",")
        url = "https://api.zuri.chat/data/read"
        data = {
            "plugin_id": PLUGIN_ID,
            "collection_name": collection_name,
            "organization_id": ORGANISATION_ID,
            "filter": {},
        }
        if len(key_word) > 0:
            data["filter"] = {
                "user_id": user_id,
                "$or": [
                    {"name": {"$in": key_word}},
                    {"facebook": {"$in": key_word}},
                    {"instagram": {"$in": key_word}},
                    {"email": {"$in": key_word}},
                    {"linkedin": {"$in": key_word}},
                    {"amount": {"$in": key_word}},
                    {"description": {"$in": key_word}},
                    {"twitter": {"$in": key_word}},
                    {"close_date": {"$in": key_word}},
                    {"company": {"$in": key_word}},
                    {"phone_number": {"$in": key_word}},
                ],
            }
        else:
            data["filter"] = {"user_id": user_id}

        if len(key_word) > 0:
            data["filter"] = {
                "user_id": user_id,
                "$or": [
                    {"deal_stage": {"$in": key_word}},
                    {"amount": {"$in": key_word}},
                    {"description": {"$in": key_word}},
                    {"close_date": {"$in": key_word}},
                    {"name": {"$in": key_word}},
                ],
            }
        else:
            data["filter"] = {"user_id": user_id}
        # print(data["filter"])
        response = requests.request("POST", url, data=json.dumps(data))

        # print(response.status_code)
        if response.status_code in [200, 201]:
            # if response.status_code == 200:
            res = response.json()
            #    according to zuri main devs all plugins must contain this format, if it does not have it, it should be set to null
            # 	"title":"name of resource item",
            # 	"email":"can be empty if it doesn't apply",
            # 	"description":"",
            # 	"Image_url":"if any",
            # 	"created_at":"",
            # 	"url":"resource item redirect url",
            # 	"plugin":"",

            # print(r["data"])
            new_prospect_list = []
            for each_prospect in res["data"]:
                each_prospect["title"] = "Sales"
                each_prospect["Image_url"] = ""
                each_prospect["url"] = f"https://zuri.chat/sales/{collection_name}"
                each_prospect["plugin"] = "Sales plugin"
                new_prospect_list.append(each_prospect)
            paginate_by = request.query_params.get("paginate_by", 20)
            paginator = Paginator(res["data"], paginate_by)
            page_num = request.query_params.get("page", 1)
            page_obj = paginator.get_page(page_num)
            paginated_data = {
                "contacts": list(page_obj),
                "pageNum": page_obj.number,
                "next": page_obj.has_next(),
                "prev": page_obj.has_previous(),
            }
            return Response(data={"data": paginated_data}, status=response.status_code)
        # print(response.status_code)
        return handle_failed_request(response=response)


class InstallPlugin(APIView):
    """[summary]

    Args:
        APIView ([type]): [description]

    Returns:
        [type]: [description]
    """

    serializer_class = InstallSerializer

    def post(self, request):
        """[summary]

        Args:
            request ([type]): [description]

        Returns:
            [type]: [description]
        """
        serializer = InstallSerializer(data=request.data)
        n_headers = request.headers["Authorization"]
        if serializer.is_valid():
            install_payload = serializer.data
            org_id = install_payload["organisation_id"]
            user_id = install_payload["user_id"]
            print(org_id, user_id)

            # new_token = db.token()
            # print(new_token)

            url = f"https://api.zuri.chat/organizations/{org_id}/plugins"
            print(url)
            payload = {"plugin_id": settings.PLUGIN_ID, "user_id": user_id}
            v2load = json.dumps(payload).encode("utf-8")
            headers = {"Authorization": f"{n_headers}"}
            print(headers)
            response = requests.request("POST", url, headers=headers, data=v2load)
            installed = json.loads(response.text)
            print(installed)
            if installed["status"] == 200:
                room_url = (
                    f"https://sales.zuri.chat/api/v1/org/{org_id}/users/{user_id}/room/"
                )
                room_payload = {"room_name": "sales"}
                res = requests.request("POST", room_url, data=room_payload)
                print(res.status_code, res._content, room_payload)
                if res.status_code in [200, 201]:
                    print("room created")
                return Response(
                    {
                        "success": True,
                        "data": {"redirect_url": "/sales"},
                        "message": "sucessfully installed",
                    },
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"Plugin has already been added"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
