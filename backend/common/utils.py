import json
import logging
from dataclasses import dataclass

import requests  # , time
from django.conf import settings
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed, ParseError
from rest_framework.response import Response
from rest_framework.views import exception_handler

ZURI_API_KEY = settings.ZURI_API_KEY
CENTRIFUGO_LIVE_ENDPOINT = settings.CENTRIFUGO_LIVE_ENDPOINT
API_KEY = settings.API_KEY
CENTRIFUGO_DEBUG_ENDPOINT = settings.CENTRIFUGO_DEBUG_ENDPOINT

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID


@dataclass
class CustomRequest:
    """[summary]

    Returns:
        [type]: [description]
    """

    @staticmethod
    def get(org_id, collection_name):
        """[summary]

        Args:
            org_id ([type]): [description]
            collection_name ([type]): [description]

        Returns:
            [type]: [description]
        """
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{collection_name}/{org_id}"
        response = requests.get(url)  # the important function
        if response.status_code == 200:
            result = response.json()
            result["status_code"] = response.status_code
            return result  # storage of that important result.
        return response

    @staticmethod
    def post(collection_name, payload):
        """[summary]

        Args:
            org_id ([type]): [description]
            collection_name ([type]): [description]
            payload ([type]): [description]

        Returns:
            [type]: [description]
        """
        url = "https://api.zuri.chat/data/write"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": payload,
        }

        response = requests.post(url, data=json.dumps(data))
        if response.status_code == 201:
            result = response.json()
            result["status_code"] = response.status_code
            return result
        return response

    @staticmethod
    def put(payload):
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
        res = response.json()
        return res

    @staticmethod
    def delete(payload):
        """[summary]

        Args:
            payload ([type]): [description]
        """
        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "payload": payload,
        }
        response = requests.request("DELETE", url, data=json.dumps(data))
        res = response.json()
        return res


def centrifugo_post(room, data):
    """[summary]

    Args:
        room ([type]): [description]
        data ([type]): [description]

    Returns:
        [type]: [description]
    """
    command = {"method": "publish", "params": {"channel": room, "data": data}}
    data = json.dumps(command)
    headers = {
        "Content-type": "application/json",
        "Authorization": "apikey " + ZURI_API_KEY,
    }
    resp = requests.post(CENTRIFUGO_LIVE_ENDPOINT, data=data, headers=headers)
    print(resp)
    # time.sleep(10)
    return resp.json()


def is_authorized(request):
    """[summary]

    Args:
        request ([type]): [description]

    Raises:
        AuthenticationFailed: [description]
        ParseError: [description]
        e: [description]

    Returns:
        [type]: [description]
    """
    try:
        authorization_content = request.headers["Authorization"]
        url = "https://api.zuri.chat/auth/verify-token/"
        headers = {"Authorization": authorization_content}
        res = requests.request("GET", url=url, headers=headers)
        print(res.status_code)
        if res.status_code == 200:
            return True
        raise AuthenticationFailed(detail="Invalid Authorization type or token.")

    except KeyError:
        raise ParseError(detail="Missing 'Authorization' header.")

    except AuthenticationFailed as _e:
        return _e


def is_valid_organisation(organisation_id, request):
    """[summary]

    Args:
        organisationId ([type]): [description]
        request ([type]): [description]

    Raises:
        AuthenticationFailed: [description]
        ParseError: [description]
        e: [description]

    Returns:
        [type]: [description]
    """
    try:
        authorization_content = request.headers["Authorization"]
        url = f"https://api.zuri.chat/organizations/{organisation_id}"
        headers = {"Authorization": authorization_content}
        res = requests.get(url, headers=headers)
        print(res.status_code)
        if res.status_code == 200:
            return True
        raise AuthenticationFailed(detail="Invalid organizationId.")

    except KeyError:
        raise ParseError(detail="Missing 'Authorization' header.")

    except AuthenticationFailed as _e:
        return _e


def custom_exception_handler(exc, context):
    """[summary]

    Args:
        exc ([type]): [description]
        context ([type]): [description]

    Returns:
        [type]: [description]
    """
    response = exception_handler(exc, context)

    if isinstance(exc, requests.ConnectionError):
        logging.error(
            f"An Error occurred while connecting to ZURI server: {exc}".format(exc)
        )
        response = Response(
            data={
                "message": "An Error occurred while connecting to ZURI server. Try again later."
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )

    if not response:
        logging.error(f"Something unexpected happened: {exc}".format(exc))
        response = Response(
            data={"message": "Something unexpected happened. Try again later."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return response


def sidebar_update(res):
    """[summary]

    Args:
        res ([type]): [description]

    Returns:
        [type]: [description]
    """
    sidebar_updates = {
        "event": "sidebar_update",
        "plugin_id": "sales.zuri.chat",
        "data": {
            "name": "Company Sales Prospects",
            "group_name": "SALES",
            "show_group": False,
            "button_url": "/sales",
            "public_rooms": [res],
            "joined_rooms": [res],
        },
    }
    return sidebar_updates


# write data ( collect_name, objr.ect_) r
# read data
# commons/constants.py
# class ResponseText:
#     success = "",
#     error = ""

# {"message":ResponseText.error}
# ResponseText.error

#  Proper error responses for each view
#  Views should use serializers in returning data except ListViews

# Centrifugo in Views


def handle_failed_request(response=None):
    """[summary]

    Args:
        response ([type], optional): [description]. Defaults to None.

    Returns:
        [type]: [description]
    """
    error_message = "Something unexpected happened. Try again later."

    if response is None:
        return Response(
            data={"message": error_message},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    status_code = response.status_code

    if status_code >= 500:
        return Response(
            data={
                "message": f"ZURI server returned a {status_code} error. Try again later.".format(
                    status_code
                )
            },
            status=status.HTTP_502_BAD_GATEWAY,
        )

    if status_code >= 400:
        Response(
            data={
                "message": "Something was wrong with your request. Check your payload."
            },
            status=status_code,
        )
    return Response(
        data={"message": error_message},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )
