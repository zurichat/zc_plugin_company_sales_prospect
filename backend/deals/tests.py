import json
from django.urls import reverse
from requests.api import request
from faker import Faker
from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework import serializers
from .serializers import DealSerializer
PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
import requests


# When running the test it is adviceable to generate your own token and add to the bearer 
# On line 186 of the delete tests there are other ids of deals are provided to be able to test othrwise it will return a 400 error

header_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpFNU1ERXlOM3hIZDNkQlIwUlplRTVVV1hoTk1rVXhUbGRGZUZwWFRtaFpiVlV6V21wTmVGbFhWWGhPVVQwOWZMc0ZIdmdLWW5KOVd6cGUzdHo2c2FtdF8tMURBTDBvY0RHYks0M2lRcG5YIiwiZW1haWwiOiJhbGFzaGltdXlpd2FAZ21haWwuY29tIiwiaWQiOiI2MTU2MTNhNTVhMWVjYWJlN2YzMWFlMTUiLCJvcHRpb25zIjp7IlBhdGgiOiIvIiwiRG9tYWluIjoiIiwiTWF4QWdlIjo3OTQwMzg1OTU2LCJTZWN1cmUiOmZhbHNlLCJIdHRwT25seSI6ZmFsc2UsIlNhbWVTaXRlIjowfSwic2Vzc2lvbl9uYW1lIjoiZjY4MjJhZjk0ZTI5YmExMTJiZTMxMGQzYWY0NWQ1YzcifQ.meFeWnpqdm500qaMxE7U-dN0umri0EgYeIyGbpoIeYI"
headers = {'Authorization': header_token}
fake = Faker()
class DealsTests(APITestCase):
    def setUp(self):
        self.serializer_data = {
            "prospect_id":"61588328995de0bb93b94e74",
            "name": "name",
            "deal_stage": "deal_stage",
            "amount": "345678",
            "close_date": "2001-25-02",
            "description": "description",
        }
        self.serializer_data_incorrect = {
            "prospect_id":"prospect_id",
            "name": "name",
            "deal_stage": "deal_stage",
            "amount": "amount",#should be an integer
            "close_date": "2001-25-02",
            "description": "description",
        }
        self.serializer_data_null = {
            "prospect_id":"",
            "name": "",
            "deal_stage": "",
            "amount": "",
            "close_date": "",
            "description": "",
        }
        self.serializer_data_excess = {
            "prospect_id":fake.text(),
            "name": fake.text(),
            "deal_stage": fake.text(),
            "amount": "34556",
            "close_date": "2001-25-02",
            "description": fake.text(),
        }
        self.serializer_data_bad_format = {
            "prospect_id":"prospect_id",
            "name": "name",
            "deal_stage": "deal_stage",
            "amount": "$234",
            "close_date": "2001-feb-5",
            "description": "description",
        }
        self.serializer_data_rearrange = {
            "close_date": "2001-25-02",
            "description": "description"
            }



#FOR CREATE VIEW
 
#     def test_deals_create_view_success(self):
#         data = self.serializer_data
#         url = "http://sales.zuri.chat/api/v1/deals/create/"
#         res = requests.post(url,data,headers=headers)
#         response = res.json()
#         print(response)
#         self.assertEqual(res.status_code,status.HTTP_201_CREATED)

#     def test_deals_create_view_null(self):
#         data = self.serializer_data_null
#         url = "http://sales.zuri.chat/api/v1/deals/create/"
#         res = requests.post(url,data,headers = headers)
#         response = res.json()
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_create_view_incorrect(self):
#         data = self.serializer_data_incorrect
#         url = "http://sales.zuri.chat/api/v1/deals/create/"
#         res = requests.post(url,data,headers = headers)
#         response = res.json()
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_create_view_excess_data(self):
#         data = self.serializer_data_excess
#         url = "http://sales.zuri.chat/api/v1/deals/create/"
#         res = requests.post(url,data,headers = headers)
#         response = res.json()
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_create_view_bad_format(self):
#         data = self.serializer_data_bad_format
#         url = "http://sales.zuri.chat/api/v1/deals/create/"
#         res = requests.post(url,data,headers = headers)
#         response = res.json()
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)




# # FOR LIST VIEW 
    # def test_deals_list_view(self):
    #     url = "http://sales.zuri.chat/api/v1/deals/"
    #     res = requests.get(url,headers=headers)
    #     response = res.json()
    #     self.assertEqual(res.status_code,status.HTTP_200_OK)
    #     assert(len(response)>0) #if false throw a 404_NOT_FOUND error

#     def test_a_deal_list_view(self):
#         url = "http://sales.zuri.chat/api/v1/deals/?id=6158803cd756b1d989930018"#a current deal id
#         res = requests.get(url,headers = headers)
#         response = res.json()
#         self.assertEqual(res.status_code,status.HTTP_200_OK)
#         assert(len(response)>1) 

    
#     def test_deals_filter_list_view(self):
#         url = "http://sales.zuri.chat/api/v1/deals/filter/?filter=closed"
#         res = requests.get(url,headers = headers)
#         response = res.json()
#         assert(len(response)>0)

#     def test_deals_filter_list_view_none(self):
#         url = "http://sales.zuri.chat/api/v1/deals/filter/?filter=siggghhhhh"#no deal filter item
#         res = requests.get(url,headers = headers)
#         response = res.json()
#         self.assertEqual((response["data"]),None)



# FOR UPDATE VIEW

    # def test_deals_update_view(self):
    #     data = self.serializer_data
    #     url = "http://sales.zuri.chat/api/v1/deals/update/?id=61588af4995de0bb93b94f4e"
    #     res = requests.put(url,data,headers = headers)
    #     response = res.json()
    #     print(res,response)
    #     self.assertEqual(res.status_code,status.HTTP_200_OK)


#     def test_deals_update_view_incorrect(self):
#         data = self.serializer_data
#         url = "http://sales.zuri.chat/api/v1/deals/update/?id=wrongid"#using the wrong id
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_update_view_incorrect_values(self):
#         data = self.serializer_data_incorrect
#         url = "http://sales.zuri.chat/api/v1/deals/update/?id=61537820627d729efec46b16"
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_update_view_excess_data(self):
#         data = self.serializer_data_excess
#         url = "http://sales.zuri.chat/api/v1/deals/update/?id=61537820627d729efec46b16"
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_update_view_bad_format(self):
#         data = self.serializer_data_bad_format
#         url = "http://sales.zuri.chat/api/v1/deals/update/?id=61537820627d729efec46b16"
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

#     def test_deals_update_view_null(self):
#         data = self.serializer_data_null
#         url = "http://sales.zuri.chat/api/v1/deals/update/?id=61537820627d729efec46b16"
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
        
#     def test_deals_rearrange_update_view(self):
#         data = self.serializer_data_rearrange
#         url = "http://sales.zuri.chat/api/v1/deals/re-arrange/?id=61588af4995de0bb93b94f4e"
#         res = requests.put(url,data,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_200_OK)




# #FOR DELETE VIEW

#     def test_deals_delete_view_success(self):
#         url = "http://sales.zuri.chat/api/v1/deals/delete/?id=615830eb87540d8d01ffc6c5"  #EXTRA DEALS TO DELETE #615830eb87540d8d01ffc6c5  #61588919995de0bb93b94ed6,61588948995de0bb93b94eda,61588966995de0bb93b94edf,61588987995de0bb93b94ee1
#         res = requests.post(url,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_200_OK)

#     def test_deals_delete_view_deleted(self):
#         url = "http://sales.zuri.chat/api/v1/deals/delete/?id=6158594c87675da1c2017ad7" 
#         res = requests.post(url,headers = headers)
#         response = res.json()
#         print(res,response)
#         self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

