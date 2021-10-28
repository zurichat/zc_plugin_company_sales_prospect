from django.urls import path

from syncapp.views import test_function, patch_function

from syncapp.task_handlers import sync_notifier


# app_name = "common"

urlpatterns = [
    # path("sync/", sync_function),
    path("testing/", test_function),
    path("patch/", patch_function),
    path("test/", sync_notifier, name="sync_notifier"),
]
