from rest_framework import serializers

DEAL_STAGE_CHOICES = (
    ('prospect', 'Prospect'), 
    ('proposal', 'Proposal'),
    ('negotiation', 'Negotiation'), 
    ('closed', 'Closed'),
    )


class DealSerializer(serializers.Serializer):
    _id = serializers.CharField(max_length=100)
    prospect_id= serializers.CharField(max_length=100)
    name= serializers.CharField(max_length=100)
    deal_stage= serializers.ChoiceField(choices=DEAL_STAGE_CHOICES, default='prospect')
    amount= serializers.CharField(max_length=100)
    close_date= serializers.CharField(max_length=100, help_text="dd-mm-yyyy")
    description= serializers.CharField(max_length=300)

