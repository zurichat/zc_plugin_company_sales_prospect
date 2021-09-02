from rest_framework import serializers

class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    Prospect_id= serializers.CharField(max_length=100)
    Status= serializers.CharField(max_length=100)