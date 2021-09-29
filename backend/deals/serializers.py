from rest_framework import serializers


class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100, allow_null=True, allow_blank=True)
    prospect_id= serializers.CharField(max_length=100, allow_null=True, allow_blank=True)
    name= serializers.CharField(max_length=100, allow_null=True, allow_blank=True)
    deal_stage= serializers.CharField(max_length=100, allow_null=True, allow_blank=True)
    amount= serializers.CharField(max_length=100, allow_null=True, allow_blank=True)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy", allow_null=True, allow_blank=True)
    description= serializers.CharField(max_length=300, allow_null=True, allow_blank=True)

class DealUpdateSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100, required=False)
    prospect_id= serializers.CharField(max_length=100, required=False)
    name= serializers.CharField(max_length=100, required=False)
    deal_stage= serializers.CharField(max_length=100, required=False)
    amount= serializers.CharField(max_length=100, required=False)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy", required=False)
    description= serializers.CharField(max_length=300, required=False)