from rest_framework import serializers

sector_choices = (
    ("technology", "Technology"),
    ("education", "Education"),
    ("engineering", "Engineering"),
    ("art", "Art"),
    ("business", "Business"),
    ("real estate", "Real Estate"),
)

position_choices = (
    ("executive", "Executive"),
    ("sales man", "Sales Man"),
    ("sales woman", "Sales Woman"),
    ("founder", "Founder"),
    ("manager", "Manager"),
    ("supervisor", "Supervisor"),
    ("others", "Others"),
)


class OnboardingSerializer(serializers.Serializer):
    company = serializers.CharField(max_length=50)
    sector = serializers.ChoiceField(choices=sector_choices, default="technology")
    position = serializers.ChoiceField(choices=position_choices, default="executive")
