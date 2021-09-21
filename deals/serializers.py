from rest_framework import serializers

class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    prospect_id= serializers.CharField(max_length=100)
    name= serializers.CharField(max_length=100)
    deal_stage= serializers.CharField(max_length=100)
    amount= serializers.CharField(max_length=100)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy")
    description= serializers.CharField(max_length=300)

class DealUpdateSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100, required=False)
    prospect_id= serializers.CharField(max_length=100, required=False)
    name= serializers.CharField(max_length=100, required=False)
    deal_stage= serializers.CharField(max_length=100, required=False)
    amount= serializers.CharField(max_length=100, required=False)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy", required=False)
    description= serializers.CharField(max_length=300, required=False)

