import requests
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase

# Genereate your token by logging to zurichat and inspect element
# Get token from local storage tab and insert in front of "Bearer"
# Ps, the space is important.
HEADER_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TXpBNE1ETTJPSHhIZDNkQlIwUlplRTVVV210T1JFMTNXa1JWTWxwSFVYcFplbEpyVDBkRk5VNXFTbTFaZHowOWZOd1ZOUzFORzlGRG9QQk90T3plWV96V3RkZHVsY0NNMUxlTmFnajU1Nm5jIiwiZW1haWwiOiJzcGFya2RraWxsZXJAZ21haWwuY29tIiwiaWQiOiI2MTU2ZDQzMGQ1NmRkM2M0ZDhhOTYyZmMiLCJvcHRpb25zIjp7IlBhdGgiOiIvIiwiRG9tYWluIjoiIiwiTWF4QWdlIjo3OTQwMjc1MTMzLCJTZWN1cmUiOmZhbHNlLCJIdHRwT25seSI6ZmFsc2UsIlNhbWVTaXRlIjowfSwic2Vzc2lvbl9uYW1lIjoiZjY4MjJhZjk0ZTI5YmExMTJiZTMxMGQzYWY0NWQ1YzcifQ.BxqWLa9rOq471S7J25QkJnA0oazWtc9pekMXGrKnz-M"
fake = Faker()


class ProspectTests(APITestCase):
    """A class that handles the tests for the app

    Args:
        APITestCase ([tests]): handles the tests for the app
    """

    def set_up(self):
        """
        This handles mock data for the tests
        """
        self.data_valid = {
            "name": "Sparkle",
            "email": "spark@gmail.com",
            "company": "Tesla",
            "phone_number": fake.random_number(),
            "twitter": fake.url(),
            "facebook": fake.url(),
            "linkedin": fake.url(),
            "instagram": fake.url(),
        }
        self.data_invalid = {
            "name": fake.random_number(),
            "email": fake.company(),
            "company": fake.email(),
            "phone_number": fake.email(),
            "twitter": fake.url(),
            "facebook": fake.url(),
            "linkedin": fake.url(),
            "instagram": fake.url(),
        }
        self.data_null = {
            "company": "",
            "email": "",
            "name": "",
            "phone_number": "",
            "twitter": "",
            "facebook": "",
            "linkedin": "",
            "instagram": "",
        }
        self.data_excess = {
            "name": fake.text(),
            "email": fake.text(),
            "company": fake.text(),
            "phone_number": fake.text(),
            "twitter": fake.url(),
            "facebook": fake.url(),
            "linkedin": fake.url(),
            "instagram": fake.url(),
        }
        self.welcome_msg = "welcome mail has been sent successfully"

    def test_list_endpoint(self):
        """
        List Endpoints
        """
        url = "https://sales.zuri.chat/api/v1/prospects/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.get(url, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_welcome_endpoint(self):
        """
        Test welcome endpoint
        """
        url = "https://sales.zuri.chat/api/v1/prospects/welcome/"
        headers = {"Authorization": HEADER_TOKEN}
        res = self.client.get(url, headers=headers)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.json()["message"], self.welcome_msg)

    ######   Test Delete Endpoint   ##########

    def test_delete_valid_data(self):
        """
        Test delete endpoint with valid data
        """
        _id = "615835e087540d8d01ffc738"
        url = f"https://sales.zuri.chat/api/v1/prospects/delete/?{_id}"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.delete(url, headers=headers)
        print(res.status_code)
        self.assertEqual(
            res.status_code, status.HTTP_200_OK, "Delete Endpoint not working..."
        )

    def test_delete_invalid_data(self):
        """
        Test delete endpoint with invalid data
        """
        _id = fake.random_number()
        url = f"https://sales.zuri.chat/api/v1/prospects/delete/?{_id}"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.delete(url, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    ######   Test Search Endpoint   ##########

    def test_search_valid_data(self):
        """
        Test search endpoint with valid data
        """
        _id = "615835e087540d8d01ffc738"
        url = f"https://sales.zuri.chat/api/v1/prospects/search/?{_id}"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.get(url, headers=headers)
        print(res.status_code)
        self.assertEqual(
            res.status_code, status.HTTP_200_OK, "Search Endpoint not working..."
        )

    def test_search_invalid_data(self):
        """
        Test search endpoint with invalid data
        """
        _id = fake.random_number()
        url = f"https://sales.zuri.chat/api/v1/prospects/search/?{_id}"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.get(url, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    # Test Create Endpoint

    def test_create_valid_data(self):
        """
        Test create endpoint with valid data
        """
        data = self.data_valid
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.post(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_data(self):
        """
        Test create endpoint with invalid_data
        """
        data = self.data_invalid
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.post(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_null_data(self):
        """
        Test create endpoint with null data
        """
        data = self.data_null
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.post(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_excess_data(self):
        """
        Test create_excess_data
        """
        data = self.data_excess
        url = "https://sales.zuri.chat/api/v1/prospects/create/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.post(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    # Test prospect update endpoints

    def test_update_valid_data(self):
        # If data is the same it raise a 400 bad request so randomize the phn number
        """
        Test update endpoints
        """
        self.data_valid["object_id"] = "615835e087540d8d01ffc738"
        data = self.data_valid
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.put(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_invalid_data(self):
        """
        Test update endpoints with invalid_data
        """
        self.data_invalid["object_id"] = "61576983d56dd3c4d8a9687a"
        data = self.data_invalid
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.put(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_null_data(self):
        """
        Test update_null_data
        """
        self.data_null["object_id"] = "61576983d56dd3c4d8a9687a"
        data = self.data_null
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.put(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_excess_data(self):
        """
        Test update endpoints with excess_data
        """
        self.data_excess["object_id"] = "61576983d56dd3c4d8a9687a"
        data = self.data_excess
        url = "https://sales.zuri.chat/api/v1/prospects/update/"
        headers = {"Authorization": HEADER_TOKEN}
        res = requests.put(url, data=data, headers=headers)
        print(res.status_code)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
