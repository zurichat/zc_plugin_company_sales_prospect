from django.urls import path

from common.views import (
    RoomCreateView,
    AddUserToRoom,
    RoomsListView,
    RemoveUserFromRoom,
    SidebarView,
    InfoView,
    SearchSalesInfo,
    InfoView, 
    access_endoints
)
from common.rooms import CreateRoomApi,AddUsersToRoomApi,RemoveUserFromRoomApi,RoomDetailApi

app_name = "common"

urlpatterns = [
    path('sidebar/', SidebarView.as_view()),
    path("info/", InfoView.as_view()),
    path("org/<str:org_id>/users/<str:member_id>/room", CreateRoomApi.as_view()),
    path("org/<str:org_id>/room/<str:room_id>/members/<str:member_id>", AddUsersToRoomApi.as_view()),
    path("org/<str:org_id>/rroom/<str:room_id>/members/<str:member_id>", RemoveUserFromRoomApi.as_view()),
    path("org/<str:org_id>/room/<str:room_id>", RoomDetailApi.as_view()),
    path("add-to-room/", AddUserToRoom.as_view()),
    path("leave-room/", RemoveUserFromRoom.as_view()),
    path("org/<str:org_id>/user/<str:user_id>/search", SearchSalesInfo.as_view()),
    path("security/", access_endoints)

]
