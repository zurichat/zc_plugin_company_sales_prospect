from django.urls import path,re_path

from common.views import (
    RoomCreateView,
    AddUserToRoom,
    RoomsListView,
    RemoveUserFromRoom,
    SidebarView,
    InfoView,
)

app_name = "common"

urlpatterns = [
    re_path(r'sidebar/?$', SidebarView.as_view()),
    path("info/", InfoView.as_view()),

    path("create-room/", RoomCreateView.as_view()),
    path("add-to-room/", AddUserToRoom.as_view()),
    path("rooms/", RoomsListView.as_view()),
    path("leave-room/", RemoveUserFromRoom.as_view()),

]