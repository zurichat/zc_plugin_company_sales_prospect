from rest_framework import serializers

class ScrapingSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=200)
