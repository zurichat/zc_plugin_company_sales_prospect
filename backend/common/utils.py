import json, requests#, time
import logging

from django.conf import settings

from rest_framework.exceptions import ParseError, AuthenticationFailed
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

ZURI_API_KEY = settings.ZURI_API_KEY
CENTRIFUGO_LIVE_ENDPOINT = settings.CENTRIFUGO_LIVE_ENDPOINT
API_KEY = settings.API_KEY
CENTRIFUGO_DEBUG_ENDPOINT = settings.CENTRIFUGO_DEBUG_ENDPOINT

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID

from dataclasses import dataclass

@dataclass
class CustomRequest:
    @staticmethod
    def get(org_id, collection_name, params=None):
        print(org_id)
        print(collection_name)
        print(params)
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{collection_name}/{org_id}"
        print(url)
        response = requests.get(url) # the important function
        print(response)
        r = response.json() # important result # first json() block
        print(r)
        if response.status_code == 200:
            print(response.status_code)
            result = response.json()
            print(result) # second json() block
            result['status_code'] = response.status_code
            print(result['status_code'])
            print(response.status_code)
            return result # storage of that important result. That SECOND block of code.

    @staticmethod
    def post(org_id, collection_name, payload):
        print('org_id:')
        print(org_id)   ###############

        print('collection_name:')
        print(collection_name) ##############
        
        print('payload:')
        print(payload) ###############

        print('url:')
        url = f"https://api.zuri.chat/data/write"
        print(url)

        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": payload,
        }
        print('Data:')
        print(data)
        print('Payload:')
        # payload.update(
        #     {
        #         # 'organization_id': org_id,
        #         # 'collection_name': collection_name,
        #         # 'bulk_write':False,
        #         #'payload' : payload,

        #         "plugin_id": PLUGIN_ID,
        #         "organization_id": ORGANISATION_ID,
        #         "collection_name": "prospects",
        #         "bulk_write": False,
        #     }
        # )
        print(payload)
        print('json.dumps(data):')
        print(json.dumps(data))
        response = requests.post(url, data=json.dumps(data)) #######################
        print('response = requests.post(url, data=json.dumps(data):')
        print(response)
        print('response.json():')
        r = response.json()
        print(r)
        if response.status_code == 201:
            print('response.status_code:')
            print(response.status_code)
            print('response.json():')
            result = response.json()
            print(response.json())
            result['status_code'] = response.status_code
            print("result['status_code']:")
            print(result['status_code'])
            print('response.status_code')
            print(response.status_code)
            return result

    @staticmethod
    def put(payload):
        url = f"https://api.zuri.chat/data/write"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": collection_name,
            "bulk_write": False,
            "payload": payload,
        }
        response = requests.request("PUT", url, data=json.dumps(data))
        r = response.json()

    @staticmethod
    def delete(payload):
        url = f"https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "payload": payload,
        }
        response = requests.request("DELETE", url, data=json.dumps(data))
        r = response.json()

def centrifugo_post(room, data):
    command = {
        "method": "publish",
        "params": {
            "channel": room,
            "data": data
        }
    }
    data = json.dumps(command)
    headers = {"Content-type": "application/json", "Authorization": "apikey " + ZURI_API_KEY}
    resp = requests.post(CENTRIFUGO_LIVE_ENDPOINT, data=data, headers=headers)
    print(resp)
    # time.sleep(10)
    return resp.json()

def isAuthorized(request):
    try:
        authorization_content = request.headers['Authorization']
        url = 'https://api.zuri.chat/auth/verify-token/'
        headers = {"Authorization":authorization_content}
        r = requests.request("GET", url=url, headers=headers)
        print(r.status_code)
        if r.status_code == 200:
            return True
        raise AuthenticationFailed(detail="Invalid Authorization type or token.")

    except KeyError:
        raise ParseError(detail="Missing 'Authorization' header.")

    except AuthenticationFailed as e:
        raise e

    except:
        return False

def isValidOrganisation(organisationId, request):
    try:
        authorization_content = request.headers['Authorization']
        url = f"https://api.zuri.chat/organizations/{organisationId}"
        headers = {"Authorization":authorization_content}
        r = requests.get(url, headers=headers)
        print(r.status_code)
        if r.status_code == 200:
            return True
        raise AuthenticationFailed(detail="Invalid organizationId.")

    except KeyError:
        raise ParseError(detail="Missing 'Authorization' header.")

    except AuthenticationFailed as e:
        raise e

    except:
        return False

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if isinstance(exc, requests.ConnectionError):
        logging.error("An Error occurred while connecting to ZURI server: {}".format(exc))
        response = Response(
            data={"message": "An Error occurred while connecting to ZURI server. Try again later."},
            status=status.HTTP_503_SERVICE_UNAVAILABLE)

    if not response:
        logging.error("Something unexpected happened: {}".format(exc))
        response = Response(
            data={"message": "Something unexpected happened. Try again later."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return response









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
    UNEXPECTED_ERROR_MESSAGE = "Something unexpected happened. Try again later."

    if response is None:
        return Response(
            data={"message": UNEXPECTED_ERROR_MESSAGE},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    status_code = response.status_code

    if status_code >= 500:
        return Response(
            data={"message": "ZURI server returned a {} error. Try again later.".format(status_code)},
            status=status.HTTP_502_BAD_GATEWAY)

    try:
        r = response.json()
    except:
        return Response(
            data={"message": "ZURI server returned an invalid response.".format(status_code)},
            status=status.HTTP_502_BAD_GATEWAY)

    if status_code >= 400:
        Response(
            data={"message": "Something was wrong with your request. Check your payload."},
            status=status_code)
    return Response(
            data={"message": UNEXPECTED_ERROR_MESSAGE},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

