from django.shortcuts import render
import requests
import json

from django.http import JsonResponse
from django.conf import settings
from django.core.mail import send_mail
from django.core.paginator import Paginator

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
# Create your views here.


def access_endoints(request):
    # ENDPOINTS = [
    #     "https://sales.zuri.chat/api/v1/prospects/",
    #     "https://sales.zuri.chat/api/v1/prospects/{id}/",
    #     "https://sales.zuri.chat/api/v1/prospects/create/",
    #     "https://sales.zuri.chat/api/v1/prospects/update/{id}",
    #     "https://sales.zuri.chat/api/v1/prospects/delete/{id}",
    #     "https://sales.zuri.chat/api/v1/deals/",
    #     "https://sales.zuri.chat/api/v1/deals/{id}",
    #     "https://sales.zuri.chat/api/v1/deals/create/",
    #     "https://sales.zuri.chat/api/v1/deals/update/{id}",
    #     "https://sales.zuri.chat/api/v1/deals/delete/{id}",
    #     "https://sales.zuri.chat/api/v1/add-to-room/",
    #     "https://sales.zuri.chat/api/v1/room/",
    #     "https://sales.zuri.chat/api/v1/leave-room/",
    #     "https://sales.zuri.chat/api/v1/sidebar/", 
    # ]

    GET_ENDPOINTS = [
        "https://sales.zuri.chat/api/v1/prospects/",
        "https://sales.zuri.chat/api/v1/prospects/{id}/",
        "https://sales.zuri.chat/api/v1/deals/",
        "https://sales.zuri.chat/api/v1/deals/{id}/",
        "https://sales.zuri.chat/api/v1/room/",
        "https://sales.zuri.chat/api/v1/sidebar/",
    ]

    POST_ENDPOINTS = [
        "https://sales.zuri.chat/api/v1/prospects/create/",
        "https://sales.zuri.chat/api/v1/deals/create/",
        "https://sales.zuri.chat/api/v1/prospects/delete/{id}/",
        "https://sales.zuri.chat/api/v1/deals/delete/{id}/",
        "https://sales.zuri.chat/api/v1/prospects/delete/batch/",
        "https://sales.zuri.chat/api/v1/deals/delete/batch/",
        "https://sales.zuri.chat/api/v1/add-to-room/",
        "https://sales.zuri.chat/api/v1/leave-room/",
    ]

    status_codes = []
    responses = []

    for endpoint in GET_ENDPOINTS:
        # organisation_content = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TkRBeU5qazNOSHhIZDNkQlIwUlplRTVxVlRCT1YxSnNXVEpGTlUxSFZUVk5iVTVvV1ZSU2FVMVhSbXRPZHowOWZMdUpuaHVOMHZodV9Tbk13T0dXRUgwQVY5RTFNTFlCUFU2RWxwZW9Hd1BwIiwiZW1haWwiOiJrb3JkdGVjaG5vbEBnbWFpbC5jb20iLCJpZCI6IjYxNjU0NWRlY2E5MGU5MmNhYTRiMWFkNyIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5NDEyMjYwNTEsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.52INh852cLlAedLPWa7Dg6n9xv9pSkvi9UcEJhNFwkc"
        # authorization_content = request.headers['Authorization']
        # url = 'https://api.zuri.chat/auth/verify-token/'
        # headers = {"Authorization":authorization_content}
        # r = requests.request("GET", url=url, headers=headers)
        r = requests.get(endpoint)
        status_codes.append(r.status_code)
        print("hi")

        try:
            data = r.json()
            data["status_code"] = r.status_code
            data["method"] = "GET"
            data["type"] = "Status"
            data["endpoint"] = endpoint
            data["success"] = True
            print("hello")
        except:
            data = {"success": False}
            print("you")
        responses.append(data)
    
    for endpoint in POST_ENDPOINTS:
        # organisation_content = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TkRBeU5qazNOSHhIZDNkQlIwUlplRTVxVlRCT1YxSnNXVEpGTlUxSFZUVk5iVTVvV1ZSU2FVMVhSbXRPZHowOWZMdUpuaHVOMHZodV9Tbk13T0dXRUgwQVY5RTFNTFlCUFU2RWxwZW9Hd1BwIiwiZW1haWwiOiJrb3JkdGVjaG5vbEBnbWFpbC5jb20iLCJpZCI6IjYxNjU0NWRlY2E5MGU5MmNhYTRiMWFkNyIsIm9wdGlvbnMiOnsiUGF0aCI6Ii8iLCJEb21haW4iOiIiLCJNYXhBZ2UiOjc5NDEyMjYwNTEsIlNlY3VyZSI6ZmFsc2UsIkh0dHBPbmx5IjpmYWxzZSwiU2FtZVNpdGUiOjB9LCJzZXNzaW9uX25hbWUiOiJmNjgyMmFmOTRlMjliYTExMmJlMzEwZDNhZjQ1ZDVjNyJ9.52INh852cLlAedLPWa7Dg6n9xv9pSkvi9UcEJhNFwkc"
        # authorization_content = request.headers['Authorization']
        # url = 'https://api.zuri.chat/auth/verify-token/'
        # headers = {"Authorization":authorization_content}
        # r = requests.request("GET", url=url, headers=headers)
        r = requests.post(endpoint)
        status_codes.append(r.status_code)

        try:
            data = r.json()
            data["status_code"] = r.status_code
            data["method"] = "POST"
            data["type"] = "Status"
            data["endpoint"] = endpoint
            data["success"] = True
        except:
            data = {"success": False}
        responses.append(data)


    statuses = []
    report = "OK!"
    for i in responses:
        statuses.append(i["success"])
    if not all(statuses):
        report = "ERROR"
    context = {"responses":responses, "report":report}
    print(context)

    return render(request, "index.html", context)
