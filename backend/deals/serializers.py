from rest_framework import serializers


class DealSerializer(serializers.Serializer):
    """This handles the deals creation

    Args:
        prospect_id (string): id of the prospect
        name (string): name of the prospect
        deal_stage (string): deal_stage of the deal
        amount (int): amount of the deal
        close_date (string): close_date of the deal
        description (string): description of the deal
    """

    prospect_id = serializers.CharField(max_length=100)
    name = serializers.CharField(max_length=100)
    deal_stage = serializers.CharField(max_length=100)
    amount = serializers.IntegerField(max_value=None, min_value=None)
    close_date = serializers.CharField(max_length=100, help_text="yyyy-mm-dd")
    description = serializers.CharField(max_length=300)


class DealUpdateSerializer(serializers.Serializer):
    """This handles the deals update

    Args:
        prospect_id (string): id of the prospect
        name (string): name of the prospect
        deal_stage (string): deal_stage of the deal
        amount (int): amount of the deal
        close_date (string): close_date of the deal
        description (string): description of the deal
    """

    prospect_id = serializers.CharField(max_length=100, required=False)
    name = serializers.CharField(max_length=100, required=False)
    deal_stage = serializers.CharField(max_length=100, required=False)
    amount = serializers.IntegerField(max_value=None, min_value=None, required=False)
    close_date = serializers.CharField(
        max_length=100, help_text="dd-mm-yyyy", required=False
    )
    description = serializers.CharField(max_length=300, required=False)
