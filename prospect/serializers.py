from rest_framework import serializers

class ProspectSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    deal_stages = serializers.CharField(max_length=100)
