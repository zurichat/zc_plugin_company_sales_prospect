from django.urls import path
from syncapp.task_handlers import sync_notifier
from syncapp.views import patch_function, test_function

# app_name = "common"

urlpatterns = [
    # path("sync/", sync_function),
    path("testing/", test_function),
    path("patch/", patch_function),
    path("test/", sync_notifier, name="sync_notifier"),
]
