from rest_framework import serializers
deal_stages_choices = (
    ("prospect", "Prospect"),
    ("proposal", "Proposal"),
    ("negotiation", "Negotiation"),
    ("closed", "Closed"),
)

class ProspectSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)
    title = serializers.CharField(max_length=100)
    email = serializers.CharField(max_length=100)
    deal_stages = serializers.ChoiceField(choices=deal_stages_choices, default="prospect")