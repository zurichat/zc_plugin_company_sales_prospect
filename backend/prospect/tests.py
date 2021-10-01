from django.conf import settings
from rest_framework import status
from rest_framework.test import APITestCase
from faker import Faker

PLUGIN_ID = settings.PLUGIN_ID
ORGANISATION_ID = settings.ORGANISATION_ID
fake = Faker()


class ProspectTests(APITestCase):
    def setUp(self):
        self.data = {
            "company": faker.company(),
            "email": faker.email(),
            "name": faker.name(),
            "phone_number": faker.phone_number()
        }
         self.data_incorrect = {
            "company": faker.email(),
            "email": faker.company(),
            "name": faker.phone_number(),
            "phone_number": faker.email()
        }
         self.data_null = {
            "company": "",
            "email": "",
            "name": "",
            "phone_number": ""
        }
         self.data_excess = {
            "company": fake.text(),
            "email": fake.text(),
            "name": fake.text(),
            "phone_number": fake.text()
        }

    def test_prospect_create(self):
        data = self.data
        url = "http://127.0.0.1:8200/api/v1/propsects/create/"
        res = self.client.post(url,data,format="json")
        response = res.json()
        print(response)
        self.assertEqual(res.status_code,status.HTTP_201_CREATED)
