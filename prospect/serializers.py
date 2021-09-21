from rest_framework import serializers

class ProspectSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    deal_stage = serializers.CharField(max_length=100, allow_null=True)
    phone_number = serializers.CharField(max_length=100)
