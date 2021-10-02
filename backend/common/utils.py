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








# def isAuthorized(request):
#     try:
#         authorization_content = request.headers['Authorization']
#         url = 'https://api.zuri.chat/auth/verify-token/'
#         headers = {"Authorization":authorization_content}
#         r = requests.request("GET", url=url, headers=headers)
#         print(r.status_code)
#         if r.status_code == 200:
#             return True
#         raise AuthenticationFailed(detail="Invalid Authorization type or token.")

#     except KeyError:
#         raise ParseError(detail="Missing 'Authorization' header.")

#     except AuthenticationFailed as e:
#         raise e

#     except:
#         return False

# def isValidOrganisation(organisationId, request):
#     try:
#         authorization_content = request.headers['Authorization']
#         url = f"https://api.zuri.chat/organizations/{organisationId}"
#         headers = {"Authorization":authorization_content}
#         r = requests.get(url, headers=headers)
#         print(r.status_code)
#         if r.status_code == 200:
#             return True
#         raise AuthenticationFailed(detail="Invalid organizationId.")

#     except KeyError:
#         raise ParseError(detail="Missing 'Authorization' header.")

#     except AuthenticationFailed as e:
#         raise e

#     except:
#         return False
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



