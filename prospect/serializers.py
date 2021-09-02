from rest_framework import serializers

class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    prospect_id= serializers.CharField(max_length=100, required=true)
    status= serializers.CharField(max_length=100)
    title= serializers.CharField(max_length=100)
    amount= serializers.CharField(max_length=100)