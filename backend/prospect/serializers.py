from rest_framework import serializers


class ProspectSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=100)
    phone_number = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)
    twitter = serializers.CharField(max_length=30, required=False, allow_blank=True)
    facebook = serializers.CharField(max_length=30, required=False, allow_blank=True)
    linkedin = serializers.CharField(max_length=30, required=False, allow_blank=True)
    instagram = serializers.CharField(max_length=30, required=False, allow_blank=True)


    def validate_name(self, name):
        self.name = name
        if len(name) < 2:
            raise serializers.ValidationError("Name too short")
        return self.name

    def validate_phone_number(self, phone_number):
        self.phone_number = phone_number
        if not phone_number.isdecimal():
            raise serializers.ValidationError("Phone number invalid")
        return self.phone_number

    def validate_company(self, company):
        self.company = company
        if len(company) < 2:
            raise serializers.ValidationError(
                "Please enter a valid company name")
        return self.company


# class ProspectUpdateSerializer(ProspectSerializer):
#     object_id = serializers.CharField(max_length=100, required=True)
#     name = serializers.CharField(max_length=100, required=False)
#     email = serializers.CharField(max_length=100, required=False)
#     phone_number = serializers.CharField(max_length=100, required=False)
#     company = serializers.CharField(max_length=100, required=False)
#     twitter = serializers.CharField(max_length=30, required=False, allow_blank=True)
#     facebook = serializers.CharField(max_length=30, required=False, allow_blank=True)
#     linkedin = serializers.CharField(max_length=30, required=False, allow_blank=True)
#     instagram = serializers.CharField(max_length=30, required=False, allow_blank=True)
