from django.db import models
from django.contrib.auth.models import User

class ProspectDetails(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, null=True)
    phone = models.CharField(max_length=15, null=True)
    email = models.EmailField(max_length=200, null=True)
    profile_pic = models.ImageField(null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.profile_pic + str(self.name)

