from rest_framework import serializers
deal_stages_choices = (
    ("prospect", "Prospect"),
    ("proposal", "Proposal"),
    ("negotiation", "Negotiation"),
    ("closed", "Closed"),
)

class ProspectSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    phone_number = serializers.CharField(max_length=15)
    deal_stage = serializers.ChoiceField(choices=deal_stages_choices, default="prospect")



