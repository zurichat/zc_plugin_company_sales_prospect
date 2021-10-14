from rest_framework import serializers

class RoomSerializer(serializers.Serializer):
    members_id = serializers.CharField()
    room_id = serializers.IntegerField()


class RoomCreateSerializer(serializers.Serializer):
    room_member_id = serializers.IntegerField()
    room_name = serializers.CharField()

class InstallSerializer(serializers.Serializer):
    org_id=serializers.CharField()
    user_id=serializers.CharField()

class UninstallSerializer(serializers.Serializer):
    org_id=serializers.CharField()
    user_id=serializers.CharField()


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