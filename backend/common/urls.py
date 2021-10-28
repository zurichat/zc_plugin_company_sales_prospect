from django.urls import path

from common.views import (
    SidebarView,
    InfoView,
    SearchSalesInfo,
    InstallPlugin,
)
from common.rooms import (
    CreateRoomApi,
    AddUsersToRoomApi,
    RemoveUserFromRoomApi,
    RoomDetailApi,
)

APP_NAME = "common"

urlpatterns = [
    path("sidebar/", SidebarView.as_view()),
    path("info/", InfoView.as_view()),
    path("org/<str:org_id>/users/<str:member_id>/room/", CreateRoomApi.as_view()),
    path(
        "org/<str:org_id>/room/<str:room_id>/members/<str:member_id>/",
        AddUsersToRoomApi.as_view(),
    ),
    path(
        "org/<str:org_id>/rroom/<str:room_id>/members/<str:member_id>/",
        RemoveUserFromRoomApi.as_view(),
    ),
    path("org/<str:org_id>/room/<str:room_id>/", RoomDetailApi.as_view()),
    path("org/<str:org_id>/user/<str:user_id>/search/", SearchSalesInfo.as_view()),
    path("install/", InstallPlugin.as_view()),
]
