from rest_framework import serializers

# to_email_choice = (
#     ("default@gmail.com", "default@gmail.com")
# )

class EmailSerializer(serializers.Serializer):
    subject = serializers.CharField(max_length=200, allow_blank=False, required=True)
    # from_email = serializers.EmailField(max_length=50)
    to_email = serializers.CharField(max_length=50)
    message = serializers.CharField(max_length=None, allow_blank=False)

