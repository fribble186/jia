from django.shortcuts import render
from django.http import HttpResponse
from . import docs
from urllib import parse,request
from bson import ObjectId
import requests
import json
import datetime
import random

# Create your views here.
def launch(request):
	out = [{'data':'','res':0}]
	code = request.GET['code']
	secret=''
	appid=''
	response = requests.get(url='https://api.weixin.qq.com/sns/jscode2session',params={'appid':appid,'secret':secret,'js_code':code,'grant_type':'authorization_code'})
	res = json.loads(response.text)["openid"]
	userCount = docs.Users.objects(openID=res).count()
	if (userCount==0):
		return HttpResponse('')
	else:
		user = docs.Users.objects(openID=res)
		out[0]['data']=out[0]['data'].replace('',str(user[0].id))
		out[0]['res']=0
		out = json.dumps(out)
		return HttpResponse(out)

def userLoginPost(request):
	out = [{'data':'','res':0}]
	if request.POST:
		code = request.POST['code']
		nickname = request.POST['nickname'] 
		gender = request.POST['gender']
		avater = request.POST['avater']
	secret=''
	appid=''
	response = requests.get(url='https://api.weixin.qq.com/sns/jscode2session',params={'appid':appid,'secret':secret,'js_code':code,'grant_type':'authorization_code'})
	res = json.loads(response.text)["openid"]
	userCount = docs.Users.objects(openID=res).count()
	if (userCount==0):
		menu = docs.Menu(
			name = '每日の菜单',
			creatTime = datetime.datetime.now(),
			type = '1'
			)
		menu.save()
		mid = menu.id
		circle = docs.Circles(
			name = '家庭',
			time = datetime.datetime.now(),
			menuID = mid
			)
		circle.save()
		cid = circle.id
		user = docs.Users(
			openID=res,
			nickname=nickname,
			gender=gender,
			time=datetime.datetime.now(),
			circleID=cid,
			avater=avater
			)
		user.save()
		uid = user.id
		userincircle = docs.UserInCircle(
			circleID = cid,
			userID = uid,
			)
		userincircle.save()
		docs.Menu.objects(id=mid).update(circleID=cid)
		docs.Menu.objects(id=mid).update(creatorID=uid)
		out[0]['data']=out[0]['data'].replace('',str(uid))
		out[0]['res']=0
		out = json.dumps(out)
		return HttpResponse(out)
	else :
		user = docs.Users.objects(openID=res)
		out[0]['data']=out[0]['data'].replace('',str(user[0].id))
		out[0]['res']=1
		out = json.dumps(out)
		return HttpResponse(out)

def userAttendCirclePost(request):
	if request.POST:
		userid = request.POST['userid']
		circleid = request.POST['circleid'] 
	user = docs.Users.objects(id=userid)
	circle = docs.Circles.objects(id=user[0].circleID)
	menu = docs.Menu.objects(id=circle[0].menuID)
	userincircle = docs.UserInCircle.objects(circleID=circle[0].id)
	userCount = docs.Users.objects(openID=res).count()
	if (userCount==1):
		circle[0].delete()
		menu[0].delete()
		userincircle[0].delete()
	user[0].update(circleID=ObjectId(str(circleid)))
	return HttpResponse('1')

def userLeaveCirclePost(request):
	return HttpResponse('0')

def userInCircleGet(request):
	id = request.GET['id']
	user = docs.Users.objects(id=id)
	user = docs.Users.objects(circleID=user[0].circleID)
	return HttpResponse(user.to_json())

def getUserByCircleidGet(request):
	id = request.GET['id']
	user = docs.Users.objects(circleID=id)
	return HttpResponse(user.to_json())

def getOneMenuGet(request):
	id = request.GET['id']
	print(id)
	user = docs.Users.objects(id=id)
	circle = docs.Circles.objects(id=user[0].circleID)
	menu = docs.Menu.objects(id = circle[0].menuID)
	return HttpResponse(menu.to_json())

def getMenusGet(request):
	id = request.GET['id']
	user = docs.Users.objects(id=id)
	menus = docs.Menu.objects(circleID=user[0].circleID)
	return HttpResponse(menus.to_json())

def updateMenusPost(request):
	return HttpResponse('0')

def addMenusPost(request):
	if request.POST:
		code = request.POST['code']
		menuname = request.POST['menuname'] 
		moren = request.POST['moren']
	user = docs.Users.objects(id=code)
	menu = docs.Menu(
		name = menuname,
		circleID = user[0].circleID,
		creatorID = user[0].id,
		creatTime = datetime.datetime.now(),
		type = '1'
		)
	menu.save()
	print(moren)
	if str(moren)=='true':
		circle = docs.Circles.objects(id=user[0].circleID)
		circle[0].update(menuID=menu.id)
	return HttpResponse('0')

def deleteMenusGet(request):
	id = request.GET['id']
	menu = docs.Menu.objects(id=id)
	menu.delete()
	return HttpResponse('1')

def getCategoryGet(request):
	category = docs.Category.objects()
	return HttpResponse(category.to_json())

def getDishesGetid(request,id):
	token = request.GET['id']
	user = docs.Users.objects(id=token)
	print(user.to_json())
	dishes = docs.Dishes.objects(circleID=user[0].circleID)
	return HttpResponse(dishes.to_json())

def getDishesGet(request):
	id = request.GET['id']
	dishinmenu = docs.DishInMenu.objects(menuID = id)
	return HttpResponse(dishinmenu.to_json())

def updateDishesPost(request):
	return HttpResponse('0')

def addDishesPost(request):
	if request.POST:
		code = request.POST['code']
		dishname = request.POST['dishname']
		category = request.POST['category']
	categoryid = docs.Category.objects(name=category)
	user = docs.Users.objects(id=code)
	dish = docs.Dishes(
		name = dishname,
		time = datetime.datetime.now(),
		categoriesID = categoryid[0].id,
		circleID = user[0].circleID,
		favor='',
		category = category
	)
	dish.save()
	return HttpResponse('1')

def deleteDishesGet(request):
	id = request.GET['id']
	dish = docs.Dishes.objects(id=id)
	dish[0].delete()
	return HttpResponse('1')

def deleteDishInMenuGet(request):
	id = request.GET['id']
	dishinmenu = docs.DishInMenu.objects(id=id)
	dishinmenu.delete()
	return HttpResponse('1')

def rollone(request):
	token = request.GET['token']
	id = request.GET['id']
	user = docs.Users.objects(id=token)
	dishes = docs.Dishes.objects(circleID=user[0].circleID)
	roll = random.randint(0,len(dishes)-1)
	return HttpResponse(dishes[roll].to_json())

def rollall(request):
	token = request.GET['token']
	id = request.GET['id']
	user = docs.Users.objects(id=token)
	dishes = docs.Dishes.objects(circleID=user[0].circleID)
	out = []
	num = []
	while len(num)<5:
		roll = random.randint(0,len(dishes)-1)
		if roll not in num:
			out.append(json.loads(dishes[roll].to_json()))
			num.append(roll)
	return HttpResponse(json.dumps(out))

def addDishesToMenuPost(request):
	menuid = request.POST['menuid']
	dishid = request.POST['dishid']
	if len(dishid)==24:
		dish = docs.Dishes.objects(id=dishid)
		dishinmenu = docs.DishInMenu(
			name=dish[0].name,
			category=dish[0].category,
			dishID=dish[0].id,
			menuID=ObjectId(menuid),
			time=datetime.datetime.now(),
			)
		dishinmenu.save()
	else:
		dishes = dishid.split(',')
		delmenu = docs.DishInMenu.objects(menuID=menuid)
		delmenu.delete()
		for id in dishes:
			dish = docs.Dishes.objects(id=id)
			dishinmenu = docs.DishInMenu(
			name=dish[0].name,
			category=dish[0].category,
			dishID=dish[0].id,
			menuID=ObjectId(menuid),
			time=datetime.datetime.now(),
			)
			dishinmenu.save()
	return HttpResponse(len(dishid))

def game(request):
	gameinput = request.POST['input']
	userid = request.POST['userid']
	game = docs.Game(
		gameinput = gameinput,
		userID = ObjectId(userid),
		time = datetime.datetime.now()
		)
	game.save()
	return HttpResponse('1')