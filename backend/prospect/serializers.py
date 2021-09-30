from rest_framework import serializers


class ProspectSerializer(serializers.Serializer):
    object_id = serializers.CharField(max_length=100, required=False)
    name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)
