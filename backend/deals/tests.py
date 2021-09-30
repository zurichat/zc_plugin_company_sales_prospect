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

# Create your tests here.
fake = Faker()
class DealsTests(APITestCase):
    def setUp(self):
        self.serializer_data = {
            "prospect_id":"prospect_id",
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



#FOR CREATE VIEW
 
    def test_deals_create_view_success(self):
        data = self.serializer_data
        url = "http://127.0.0.1:8200/api/v1/deals/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        print(response)
        self.assertEqual(res.status_code,status.HTTP_201_CREATED)

    def test_deals_create_view_null(self):
        data = self.serializer_data_null
        url = "http://127.0.0.1:8200/api/v1/deals/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_create_view_incorrect(self):
        data = self.serializer_data_incorrect
        url = "http://127.0.0.1:8200/api/v1/deals/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_create_view_excess_data(self):
        data = self.serializer_data_excess
        url = "http://127.0.0.1:8200/api/v1/deals/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_create_view_bad_format(self):
        data = self.serializer_data_bad_format
        url = "http://127.0.0.1:8200/api/v1/deals/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)




#FOR LIST VIEW 
    def test_deals_list_view(self):
        url = "http://127.0.0.1:8200/api/v1/deals/"
        res = self.client.get(url)
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        assert(len(response)>1) #if false throw a 404_NOT_FOUND error

    def test_a_deal_list_view(self):
        url = "http://127.0.0.1:8200/api/v1/deals/?id=61537820627d729efec46b16"#a current deal id
        res = self.client.get(url)
        response = res.json()
        self.assertEqual(res.status_code,status.HTTP_200_OK)
        assert(len(response)>1) 

    
    def test_deals_filter_list_view(self):
        url = "http://127.0.0.1:8200/api/v1/deals/filter/?filter=benshi"
        res = self.client.get(url)
        response = res.json()
        assert(len(response)>1)

    def test_deals_filter_list_view_none(self):
        url = "http://127.0.0.1:8200/api/v1/deals/filter/?filter=siggghhhhh"#no deal filter item
        res = self.client.get(url)
        response = res.json()
        self.assertEqual((response["data"]),None)



#FOR UPDATE VIEW
    def test_deals_update_view(self):
        data = self.serializer_data
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=61537820627d729efec46b16"
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_200_OK)

    def test_deals_update_view_incorrect(self):
        data = self.serializer_data
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=wrongid"#using the wrong id
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_update_view_incorrect_values(self):
        data = self.serializer_data_incorrect
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=61537820627d729efec46b16"
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_update_view_excess_data(self):
        data = self.serializer_data_excess
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=61537820627d729efec46b16"
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_update_view_bad_format(self):
        data = self.serializer_data_bad_format
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=61537820627d729efec46b16"
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)

    def test_deals_update_view_null(self):
        data = self.serializer_data_null
        url = "http://127.0.0.1:8200/api/v1/deals/update/?id=61537820627d729efec46b16"
        res = self.client.put(url,data,format="json")
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)



#FOR DELETE VIEW

    # def test_deals_delete_view_success(self):
    #     url = "http://127.0.0.1:8200/api/v1/deals/delete/?id=615397e1627d729efec46c20"
    #     res = self.client.post(url)
    #     response = res.json()
    #     print(res,response)
    #     self.assertEqual(res.status_code,status.HTTP_200_OK)

    def test_deals_delete_view_deleted(self):
        url = "http://127.0.0.1:8200/api/v1/deals/delete/?id=615397e1627d729efec46c20"
        res = self.client.post((url))
        response = res.json()
        print(res,response)
        self.assertEqual(res.status_code,status.HTTP_400_BAD_REQUEST)
