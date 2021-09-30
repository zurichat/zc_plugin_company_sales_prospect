from rest_framework import serializers
import re


class ProspectSerializer(serializers.Serializer):
    object_id = serializers.CharField(max_length=100, required=False)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField(max_length=100)
    phone_number = serializers.CharField(max_length=100)
    company = serializers.CharField(max_length=100)

    def validate_name(self, name):
        self.name = name
        if len(name) < 2:
            raise serializers.ValidationError("Name too short")
        return self.name

    def validate_email(self, email):
        self.email = email
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        if not (re.fullmatch(regex, email)):
            raise serializers.ValidationError("Email not valid")
        return self.email

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
