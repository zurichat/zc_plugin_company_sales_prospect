# import requests
# from rest_framework.response import Response
# from rest_framework import status


# def isAuthorized(request):

#     # # check if the 'Cookie' header exists in the request
#     # if('Cookie' in request.headers):
#     #     # verify if the Cookie is valid from zuri core
#     #     url = 'https://api.zuri.chat/auth/verify-token/'
#     #     cookie = [x for x in request.headers['Cookie'].split(';') if x.startswith('f6822af94e29ba112be310d3af45d5c7')][0]
#     #     # seperate cookie in key value pair format
#     #     key, value = cookie.split('=')
#     #     r = requests.get(url, cookies={key:value})
#     #     status_code = r.json()['status']

#     #     print(status_code)

#     #     # Check if status code is 200
#     #     if(status_code == 200):
#     #         return True
#     #     else:
#     #         return False
#     # print(request.headers)

#     if('Authorization' in request.headers):
#         # verify if the Authorization token is valid from zuri core
#         print(request.headers["Authorization"])
#         url = 'https://api.zuri.chat/auth/verify-token/'
#         header = {'Authorization': 'Bearer ' + request.headers['Authorization']}
#         r = requests.get(url, headers=header)
#         status_code = r.json()['status']
        
#         print(status_code)
#         if(status_code == 200):
#             return True
#         else:
#             return False

#     else:
#         return False


#     import requests
# from rest_framework.response import Response
# from rest_framework import status

# def isAuthorized(request):
#     if('Authorization' in request.headers):
#         # verify if the Authorization token is valid from zuri core
#         url = 'https://api.zuri.chat/auth/verify-token/'
#         header = {'Authorization': 'Bearer ' +
#                   request.headers['Authorization']}
#         r = requests.get(url, headers=header)
#         status_code = r.json()['status']

#         print(status_code)

#         # Check if status code is 200
#         if(status_code == 200):
#             return True
#         else:
#             return False

#     else:
#         return False

import requests
from rest_framework.response import Response
from rest_framework import status

def isAuthorized(request):
    if('Authorization' in request.headers):
        # verify if the Authorization token is valid from zuri core
        url = 'https://api.zuri.chat/auth/verify-token/'
        header = {'Authorization': 'Bearer ' +
                  request.headers['Authorization']}
        r = requests.get(url, headers=header)
        status_code = r.json()['status']

        print(status_code)

        # Check if status code is 200
        if(status_code == 200):
            return True
        else:
            return False

    else:
        return False