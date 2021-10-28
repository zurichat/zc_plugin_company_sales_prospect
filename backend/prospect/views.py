import json

import requests
# changed the import to a single import
from django.conf import settings
from django.core.mail import send_mail
# from django.core.paginator import Paginator
from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from common.utils import (CustomRequest, centrifugo_post,
                          handle_failed_request, is_authorized,
                          is_valid_organisation)
from prospect.serializers import ProspectSerializer

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
# Create your views here.


class WelcomeView(APIView):
    """
     this functions sends a welcome email to new leads
        still in development stage
        would configure it properly during production
    """
    def get(self, request):
        """
        this functions sends a welcome email to new leads
        still in development stage
        would configure it properly during production
        """
        send_mail(
            subject=f"Welcome {request.user}",
            message=f"Hello {request.user} your account was successfully created",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=["test1@dummy.com"],
        )
        return JsonResponse({"message": "welcome mail has been sent successfully"})


def search_prospects(request, search):
    """
    this fuction will allow the user to search for a prospects
    """
    # # check authentication
    if not is_authorized(request):
        return Response(
            data={"message": "Missing Cookie/token header or session expired"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if not is_valid_organisation(ORGANISATION_ID, request):
        return Response(
            data={"message": "Invalid/Missing organization id"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    # import requests
    url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}/"
    response = requests.request("GET", url)
    res = response.json()
    # response code should be 200
    if response.status_code == 200:
        liste = []
        for i in res["data"]:
            if (
                (search in i["first_name"])
                or (search in i["last_name"])
                or (search in i["email"])
                or (search in i["company"])
            ):
                liste.append(i)
        return JsonResponse(liste, safe=False)
    return JsonResponse({'message':'not found'})


class GetPropects(APIView):
    '''
    This class allows the Deals page to get the list of avaliable prospects
    '''
    def get(self, request):
        '''
        this function preforms the get request to the database
        '''
        #  check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)
        url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        response = requests.request("GET", url)
        if response.status_code == 200:
            response = response.json()
            contacts = "contacts"
            return Response({contacts: response["data"]})
        return Response({"data": "no prospects found"})


class ProspectsListView(APIView):
    '''
    This class returns a list of avaliable prospects in the DB
    '''
    serializer_class = ProspectSerializer
    queryset = None
    paginate_by = 20

    def get(self, request, org_id):
        '''
        this function preforms the get request to the database
        '''
        # # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        # url = f"https://api.zuri.chat/data/read/{PLUGIN_ID}/prospects/{ORGANISATION_ID}"
        # response = requests.request("GET", url)
        print(request)
        print(org_id)
        data = {}
        print(data)
        response = CustomRequest.get(org_id, "prospects", data) or []
        print("before CustomRequest.get(org_id, prospects, data)")
        print(response)  # THIRD block of code
        print("after CustomRequest.get(org_id, prospects, data)")
        if response["status_code"] == 200:
            # print(response['status_code'])
            return Response(data=response["data"], status=status.HTTP_200_OK)

            # FinalResponse = Response(
            #     data=response['data'], # the data is from print(response), line 91.
            #     status=status.HTTP_200_OK,
            #     # template_name=None,
            #     # headers=None,
            #     # content_type=None
            # )

            # print(FinalResponse) # this is what appears on the APIView?

            # return FinalResponse

            # centrifugo_post("Prospects", {"event": "join", "token": "elijah"})
            # serializer = ProspectSerializer(data=r['data'], many=True)
            # serializer.is_valid(raise_exception=True)
            # if not r["data"]:
            #     return Response(
            #         data={
            #             "message": "This Organization's Prospect list is currently empty."
            #         },
            #         status=status.HTTP_204_NO_CONTENT,
            #     )

            # paginator = Paginator(r["data"], self.paginate_by)
            # page_num = request.query_params.get("page", 1)
            # page_obj = paginator.get_page(page_num)
            # paginated_data = {
            #     "contacts": list(page_obj),
            #     "pageNum": page_obj.number,
            #     "next": page_obj.has_next(),
            #     "prev": page_obj.has_previous(),
            # }
            # return Response(data=paginated_data, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectsCreateView(APIView):
    """
   This Class perfoms the create prospects function
    """

    serializer_class = ProspectSerializer
    queryset = None

    def post(self, request, org_id, user_id):
        '''
        this function preforms the post request to the database
        '''
        # # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        print(request)
        print(org_id)

        serializer = ProspectSerializer(data=request.data)
        print(serializer)

        serializer.is_valid(raise_exception=True)
        print(serializer.is_valid(raise_exception=True))

        payload = {
            "name": serializer.data.get("name"),
            "email": serializer.data.get("email"),
            "organisation_id": org_id,
            "user_id": user_id,
            "phone_number": serializer.data.get("phone_number"),
            "company": serializer.data.get("company"),
            "twitter": serializer.data.get("twitter"),
            "facebook": serializer.data.get("facebook"),
            "linkedin": serializer.data.get("linkedin"),
            "instagram": serializer.data.get("instagram"),
        }
        print(payload)

        response = CustomRequest.post(org_id, "prospects", payload)
        print(response)

        # r = response.json()
        # print(r)

        # if response.status_code == 201: # .status_code is not a method. It's a key. that returns a value.
        if response["status_code"] == 201:

            # new_prospect = request.data
            # print(new_prospect)

            return Response(data=response["data"], status=status.HTTP_201_CREATED)
            # request.data._mutable = True
            # new_prospect["_id"] = r["data"]["object_id"]
            # request.data._mutable = False

            # new_prospect["_id"] = r["data"]["object_id"]
            # centrifugo_post(
            #     "Prospects",
            #     {"event": "new_prospect", "token": "elijah", "object": new_prospect},
            # )

            # return Response(data=r, status=status.HTTP_201_CREATED)
        return handle_failed_request(response=response)


class ProspectsUpdateView(APIView):
    '''
    This class handles the update prospects process
    '''
    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request, org_id):
        '''
        this function preforms the put request to the database
        '''
        # check authorization
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)
        url = "https://api.zuri.chat/data/write"

        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        object_id = serializer.data.pop("object_id")

        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": org_id,
            "collection_name": "prospects",
            "bulk_write": False,
            "object_id": object_id,
            "payload": serializer.data,
        }

        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            res = response.json()
            if res["data"]["matched_documents"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect with the 'object_id' you supplied."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if res["data"]["modified_documents"] == 0:
                return Response(
                    data={
                        "message": "Prospect update failed. Empty data or invalid values was passed."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "edit_prospect",
                    "token": "elijah",
                    "object": serializer.data,
                },
            )
            return Response(data=res, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectsBatchDeleteView(APIView):
    '''This Class handles the batch delete view for prospects '''
    def post(self, request):
        '''
        this function preforms the put request to the database
        '''
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        filter_data = request.data.get("filter")

        url = "https://api.zuri.chat/data/delete"
        data = {
            "bulk_delete": True,
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "filter": {"email": {"$in": filter_data}},
        }

        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            res = response.json()
            if res["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect matching the 'filter' you supplied."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "delete_prospect",
                    "token": "elijah",
                    "object": {
                        "data": filter_data,
                    },
                },
            )
            return Response(
                data={"message": " Prospect list  deleted successful."},
                status=status.HTTP_200_OK,
            )
        return handle_failed_request(response=response)


class ProspectsDeleteView(APIView):
    '''
    this class handles the delete process for each prospect
    '''
    permission_classes = [AllowAny]
    authentication_classes = []

    def delete(self, request, search, **kwargs):
        '''
        this function preforms the delete request to the database
        '''
        # check authentication
        if not is_authorized(request):
            return handle_failed_request(response=None)

        if not is_valid_organisation(ORGANISATION_ID, request):
            return handle_failed_request(response=None)

        url = "https://api.zuri.chat/data/delete"
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "object_id": search,
        }
        response = requests.request("POST", url, data=json.dumps(data))
        if response.status_code == 200:
            res = response.json()
            if res["data"]["deleted_count"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect with the 'object_id' you supplied."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "delete_prospect",
                    "token": "elijah",
                    "id": kwargs.get("object_id"),
                },
            )
            return Response(data={"message": "successful"}, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)


class ProspectDetailsView(APIView):
    '''
    this class handles the detail view for each prospect
    '''
    serializer_class = ProspectSerializer
    queryset = None

    def put(self, request):
        '''
        this function preforms the put request to the database
        '''
        # check authorization
        # if not is_authorized(request):
        # return handle_failed_request(response=None)

        # if not is_valid_organisation(ORGANISATION_ID, request):
        # return handle_failed_request(response=None)

        url = "https://api.zuri.chat/data/write"
        serializer = ProspectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        object_id = request.data.get("object_id")
        data = {
            "plugin_id": PLUGIN_ID,
            "organization_id": ORGANISATION_ID,
            "collection_name": "prospects",
            "bulk_write": False,
            "object_id": object_id,
            "payload": serializer.data,
        }
        response = requests.put(url, data=json.dumps(data))

        if response.status_code in [200, 201]:
            res = response.json()
            if res["data"]["matched_documents"] == 0:
                return Response(
                    data={
                        "message": "There is no prospect with the 'object_id' you supplied."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if res["data"]["modified_documents"] == 0:
                return Response(
                    data={
                        "message": "Prospect update failed. Empty data or invalid values was passed."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            centrifugo_post(
                "Prospects",
                {
                    "event": "edit_prospect",
                    "token": "elijah",
                    "object": serializer.data,
                },
            )
            return Response(data=res, status=status.HTTP_200_OK)
        return handle_failed_request(response=response)
