from rest_framework import serializers

class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    prospect_id= serializers.CharField(max_length=100)
    name= serializers.CharField(max_length=100)
    deal_stage= serializers.CharField(max_length=100)
    amount= serializers.CharField(max_length=100)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy")
    description= serializers.CharField(max_length=300)

