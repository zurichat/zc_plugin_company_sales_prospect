from rest_framework import serializers


class RoomSerializer(serializers.Serializer):
    """[summary]

    Args:
        serializers ([type]): [description]
    """

    members_id = serializers.ListField(required=True)


class RoomCreateSerializer(serializers.Serializer):
    """[summary]

    Args:
        serializers ([type]): [description]
    """

    room_name = serializers.CharField(required=True)


class InstallSerializer(serializers.Serializer):
    """[summary]

    Args:
        serializers ([type]): [description]
    """

    organisation_id = serializers.CharField()
    user_id = serializers.CharField()
