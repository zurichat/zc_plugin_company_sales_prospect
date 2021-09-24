from django.urls import path

from common.views import (
    AddUserToRoom,
    RoomsListView,
    RemoveUserFromRoom,
    SidebarView,
    InfoView,
    SidebarDealsRooms,
    SidebarProspectsRooms
)

app_name = "common"

urlpatterns = [
    path("sidebar/", SidebarView.as_view()),
    path('room-deals/', SidebarDealsRooms.as_view()),
    path('room-prospect/', SidebarProspectsRooms.as_view()),
    path("info/", InfoView.as_view()),

    path("add-to-room/", AddUserToRoom.as_view()),
    path("rooms/", RoomsListView.as_view()),
    path("leave-room/", RemoveUserFromRoom.as_view()),

]