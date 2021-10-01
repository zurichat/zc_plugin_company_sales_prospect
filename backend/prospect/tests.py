
from rest_framework import status
from rest_framework.test import APITestCase

class Prospect():

    def test_list_prospect(self):
        url = 'https://sales.zuri.chat/api/v1/prospects/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_get_prospect(self):
        url = "https://sales.zuri.chat/api/v1/prospects/"
        data = {'_id': '614a4aa20cd11aeb2c93ca2c'}
        response = self.client.get(url, data = data)
        print(response.content)
