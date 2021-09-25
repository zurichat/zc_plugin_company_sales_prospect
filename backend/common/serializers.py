from rest_framework import serializers

class RoomSerializer(serializers.Serializer):
    user = serializers.CharField()
    room_name = serializers.CharField()

class RoomCreateSerializer(serializers.Serializer):
    room_name = serializers.CharField()


# headers = {
    #     'Authorization': f'Bearer {token}',
    # }

    # response = requests.get(f'https://api.zuri.chat/users/{user_id}', headers=headers)

    # res = json.loads(response.text)
    # if res['status'] == 200:
        
    # else:
    #     data = {
    #         "error": res['status'],
    #         "message": res['message']
    #     }
    #     print(res)
    #     return Response(data, status=status.HTTP_400_BAD_REQUEST)