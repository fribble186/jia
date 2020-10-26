"""jia URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path
from app import views
urlpatterns = [
# For user
    re_path(r'^launch/', views.launch),
    re_path(r'^userLoginPost/', views.userLoginPost),
    re_path(r'^userAttendCirclePost/', views.userAttendCirclePost),
    re_path(r'^userLeaveCirclePost/', views.userLeaveCirclePost),
    re_path(r'^userInCircleGet',views.userInCircleGet),
    re_path(r'^getUserByCircleidGet',views.getUserByCircleidGet),
# For menus
	re_path(r'getOneMenuGet/', views.getOneMenuGet),
    re_path(r'^getMenusGet/', views.getMenusGet),
    re_path(r'^updateMenusPost/', views.updateMenusPost),
    re_path(r'^addMenusPost/', views.addMenusPost),
    re_path(r'^deleteMenusGet/', views.deleteMenusGet),
# For dishes
    re_path(r'^getCategoryGet/', views.getCategoryGet),
    path('getDishesGetid/<id>/', views.getDishesGetid),
    re_path(r'^getDishesGet/', views.getDishesGet),
    re_path(r'^updateDishesPost/', views.updateDishesPost),
    re_path(r'^addDishesPost/', views.addDishesPost),
    re_path(r'^deleteDishesGet/', views.deleteDishesGet),
    re_path(r'^deleteDishInMenuGet/', views.deleteDishInMenuGet),
    re_path(r'^addDishesToMenuPost/', views.addDishesToMenuPost),
# For roll
    re_path(r'^rollone/', views.rollone),
    re_path(r'^rollall/', views.rollall),
# For game
    re_path(r'^game/', views.game),
]
