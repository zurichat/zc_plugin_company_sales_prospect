from django.urls import path

from .views import sync_function, test_function, patch_function


# app_name = "common"

urlpatterns = [

    path("sync/", sync_function),

    path("test/", test_function),

    path("patch/", patch_function)

]
