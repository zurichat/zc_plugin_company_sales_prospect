import json, requests#, time

from django.conf import settings

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
