from django.apps import AppConfig


class ProspectConfig(AppConfig):
    """
    Handles Django default_auto_field

    Args:
        AppConfig ([config]): [configures your auto fields]
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "prospect"
