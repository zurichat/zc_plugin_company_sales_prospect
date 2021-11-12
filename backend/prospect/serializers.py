from rest_framework import serializers


class ProspectSerializer(serializers.Serializer):
    """This is a serializer for the prospects generation

    Args:
        serializers ([string]): [validated strings]

    Raises:
        serializers.ValidationError: [Name too short]
        serializers.ValidationError: [Phone number invalid]
        serializers.ValidationError: [Please enter a valid company name]

    Returns:
        [json]: [a json view of the inputs]
    """

    name = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=100)
    phone_number = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)
    twitter = serializers.CharField(max_length=30, required=False, allow_blank=True)
    facebook = serializers.CharField(max_length=30, required=False, allow_blank=True)
    linkedin = serializers.CharField(max_length=30, required=False, allow_blank=True)
    instagram = serializers.CharField(max_length=30, required=False, allow_blank=True)

    def validate_name(self, name):
        """function that validates the name field

        Args:
            name ([string]): [has a max length of 100]

        Returns:
            [string]: [name input]
        """
        self.name = name
        if len(name) < 2:
            raise serializers.ValidationError("Name too short")
        return self.name

    def validate_phone_number(self, phone_number):
        """function that validates the phone_number field

        Args:
            phone_number ([string]): [has a max length of 100]

        Returns:
            [string]: [phone_number input]
        """
        self.phone_number = phone_number
        if not phone_number.isdecimal():
            raise serializers.ValidationError("Phone number invalid")
        return self.phone_number

    def validate_company(self, company):
        """function that validates the company field

        Args:
            name ([string]): [has a max length of 100]

        Returns:
            [string]: [company input]
        """
        self.company = company
        if len(company) < 2:
            raise serializers.ValidationError("Please enter a valid company name")
        return self.company
