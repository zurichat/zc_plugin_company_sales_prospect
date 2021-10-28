from rest_framework import serializers


class EmailSerializer(serializers.Serializer):
    """[summary]

    Args:
        serializers ([type]): [description]
    """    
    subject = serializers.CharField(max_length=200, allow_blank=False, required=True)
    template_name = serializers.CharField(max_length=50)
    email = serializers.CharField(max_length=50, required=False)
    message = serializers.CharField(max_length=None, allow_blank=False)


class EmailUpdateSerializer(serializers.Serializer):
    """[EmailUpdateSerializer]

    Args:
        serializers ([type]): [description]
    """    
    subject = serializers.CharField(max_length=200, allow_blank=False, required=False)
    template_name = serializers.EmailField(max_length=50, required=False)
    email = serializers.CharField(max_length=50, required=False)
    message = serializers.CharField(max_length=None, required=False)


class SendEmailSerializer(serializers.Serializer):
    """[summary]

    Args:
        serializers ([type]): [description]
    """    
    subject = serializers.CharField(max_length=200, required=True)
    email = serializers.CharField(max_length=50, required=True)
    mail_body = serializers.CharField(max_length=None, required=True)
