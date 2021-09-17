from django.db import models

# Create your models here.

deal_stages_choices = (
    ("prospect", "Prospect"),
    ("proposal", "Proposal"),
    ("negotiation", "Negotiation"),
    ("closed", "Closed"),
)

class Prospect(models.Model):
    """Model definition for Prospect."""

    # TODO: Define fields here
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField()
    title = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=255, default='NA')
    handler= models.CharField(max_length=200,default="Rosita")
    updated = models.DateTimeField(auto_now=True)
    deal_stages = models.CharField(max_length=50,choices=deal_stages_choices,default='prospect')


    # uncomment one the deal model is done
    # deal_status = models.ForeignKey(Deal)

    class Meta:
        """Meta definition for Prospect."""

        verbose_name = 'Prospect'
        verbose_name_plural = 'Prospects'

    def __str__(self):
        """Unicode representation of Prospect."""
        pass

