from django.shortcuts import render
from rest_framework import filters
from rest_framework import generics

from django.http import JsonResponse

def SearchProspects(request, search):
    import requests
    url = "https://zccore.herokuapp.com/data/read/000000000000000000000000/prospects/612a3a914acf115e685df8e3/"
    response = requests.request("GET", url)
    r = response.json()
    print(response.status_code)
    if response.status_code == 200:    
        liste=[]
        for i  in r['data']:
            if (search in i['first_name']) or (search in i['last_name']) or (search in i['email']) or  (search in i['company']):
                liste.append(i)
        return JsonResponse(liste,safe=False)
