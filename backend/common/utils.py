import json, requests#, time

from django.conf import settings

ZURI_API_KEY = settings.ZURI_API_KEY
CENTRIFUGO_LIVE_ENDPOINT = settings.CENTRIFUGO_LIVE_ENDPOINT
API_KEY = settings.API_KEY
CENTRIFUGO_DEBUG_ENDPOINT = settings.CENTRIFUGO_DEBUG_ENDPOINT

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID

from dataclasses import dataclass

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
    except:
        return False

@dataclass
class CustomRequest:
    @staticmethod
    def get(org_id, collection_name, params=None):
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/{collection_name}/{org_id}"
        response = requests.get(url)
        r = response.json()
        if response.status_code == 200:
            return response.json()

    @staticmethod
    def post(payload):
        url = f"https://api.zuri.chat/data/write"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "payload": payload,
        }
        response = requests.request("POST", url, data=json.dumps(data))

    @staticmethod
    def put(payload):
        url = f"https://api.zuri.chat/data/write"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
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
