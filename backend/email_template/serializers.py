from rest_framework import serializers


class EmailSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=200, allow_blank=False, required=True)
    template_name = serializers.CharField(max_length=50)
    email = serializers.CharField(max_length=50, required=False)
    message = serializers.CharField(max_length=None, allow_blank=False)


class EmailUpdateSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=200, allow_blank=False, required=False)
    template_name = serializers.EmailField(max_length=50)
    email = serializers.CharField(max_length=50, required=False)
    message = serializers.CharField(max_length=None, required=False)

class SendEmailSerializer():
    subject = serializers.CharField(max_length=200)
    email = serializers.CharField(max_length=50)
    mail_body = serializers.CharField(max_length=None)