from rest_framework import serializers



position_choices = (
    ("executive", "Executive"),
    ("sale man", "Sales Man"),
    ("sales woman", "Sales Woman"),
    ("founder", "Founder"),
    ("manager", "Manager"),
    ("supervisor", "Supervisor"),
)
sector_choices = (
    ("technology", "Technology"),
    ("education", "Education"),
    ("engineering", "Engineering"),
    ("art","Art"),
    ("business", "Business"),
    ("real estate", "Real Estate")
)

class OnboardingSerializer(serializers.Serializer):
    company = serializers.CharField(max_length=50)
    sector = serializers.ChoiceField(choices= sector_choices, default= 'select sector')
    position = serializers.ChoiceField(choices= position_choices, default= 'select position')
