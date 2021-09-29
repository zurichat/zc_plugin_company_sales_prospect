import requests
from rest_framework.response import Response
from rest_framework import status

def isValidOrganisation(organisationId,request):
    token = request.headers['Authorization']
    if(organisationId):
        # verify if the organisation id is valid from zuri core
        url = f"https://api.zuri.chat/organizations/{organisationId}"
        header = {'Authorization': 'Bearer ' + token}
        r = requests.get(url, headers=header)
        status_code = r.json()['status']
        # Check if status code is 200
        print(r.json())
        if(status_code == 200):
            return True
        else:
            return False


    else:
        return False