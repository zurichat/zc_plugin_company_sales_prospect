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

app_name = "common"

urlpatterns = [
    path('sidebar/', SidebarView.as_view()),
    path("info/", InfoView.as_view()),

    path("create-room/", RoomCreateView.as_view()),
    path("add-to-room/", AddUserToRoom.as_view()),
    path("rooms/", RoomsListView.as_view()),
    path("leave-room/", RemoveUserFromRoom.as_view()),
    path("org/<str:org_id>/user/<str:user_id>/search", SearchSalesInfo.as_view()),
    path("security/", access_endoints)

]
