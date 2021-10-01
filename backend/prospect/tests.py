from rest_framework import status
from rest_framework.test import APITestCase
from faker import Faker
import requests

# Genereate your token by logging to zurichat and inspect element
# Get token from local storage tab and insert in front of "Bearer" 
# Ps, the space is important.
header_token = "Bearer " 
fake = Faker()

print(fake.email())
class ProspectTests(APITestCase):
    def setUp(self):
        self.data_valid = {
            "name": "Sparkle",
            "email": "spark@gmail.com",
            "company": "Tesla",
            "phone_number": fake.random_number()
        }
        self.data_invalid = {
            "name": fake.random_number(),
            "email": fake.company(),
            "company": fake.email(),
            "phone_number": fake.email()
        }
        self.data_null = {
            "company": "",
            "email": "",
            "name": "",
            "phone_number": ""
        }
        self.data_excess = {
            "name": fake.text(),
            "email": fake.text(),
            "company": fake.text(),
            "phone_number": fake.text()
        }
        self.welcome_msg = "welcome mail has been sent successfully"

    # List Endpoints

    def test_list_endpoint(self):
        url = "https://sales.zuri.chat/api/v1/prospects/"
        headers = {'Authorization': header_token}
        res = requests.get(url, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
   
     # Test welcome endpoint
    def test_welcome_endpoint(self):
        url = "https://sales.zuri.chat/api/v1/prospects/welcome/"
        headers = {'Authorization': header_token}
        res = self.client.get(url, headers = headers)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json()['message'], self.welcome_msg)
    
    # Test Create Endpoint

    def test_create_valid_data(self):
        data = self.data_valid
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {'Authorization': header_token}
        res = requests.post(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_data(self):
        data = self.data_invalid
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {'Authorization': header_token}
        res = requests.post(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_null_data(self):
        data = self.data_null
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {'Authorization': header_token}
        res = requests.post(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_excess_data(self):
        data = self.data_excess
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {'Authorization': header_token}
        res = requests.post(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

   # Test prospect update endpoints

    def test_update_valid_data(self):
        # If data is the same it raise a 400 bad request so randomize the phn number

        self.data_valid['object_id'] = "61576983d56dd3c4d8a9687a"
        data = self.data_valid
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {'Authorization': header_token}
        res = requests.put(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_invalid_data(self):
        self.data_invalid['object_id'] = "61576983d56dd3c4d8a9687a"
        data = self.data_invalid
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {'Authorization': header_token}
        res = requests.put(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_null_data(self):
        self.data_null['object_id'] = "61576983d56dd3c4d8a9687a"
        data = self.data_null
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {'Authorization': header_token}
        res = requests.put(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_update_excess_data(self):
        self.data_excess['object_id'] = "61576983d56dd3c4d8a9687a"
        data = self.data_excess
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {'Authorization': header_token}
        res = requests.put(url, data = data, headers = headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
