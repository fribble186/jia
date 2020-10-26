from mongoengine import *
connect('jia')

class Users(Document):
	openID = StringField()
	nickname = StringField()
	gender = IntField()
	time = DateTimeField()
	taste = StringField()
	favor = ListField(StringField())
	circleID = ObjectIdField()
	avater = StringField()

class Circles(Document):
	name = StringField()
	time = DateTimeField()
	menuID = ObjectIdField()

class UserInCircle(Document):
	circleID = ObjectIdField()
	userID = ObjectIdField()
	generation = IntField()

class Dishes(Document):
	name = StringField()
	categoriesID = ObjectIdField()
	circleID = ObjectIdField()
	favor = StringField()
	contain = ListField(StringField())
	time = DateTimeField()
	category = StringField()

class Menu(Document):
	circleID = ObjectIdField()
	creatorID = ObjectIdField()
	name = StringField()
	creatTime = DateTimeField()
	menuTime = DateTimeField()
	type = StringField()

class DishInMenu(Document):
	name = StringField()
	time = DateTimeField()
	category = StringField()
	dishID = ObjectIdField()
	menuID = ObjectIdField()
	time = DateTimeField()
	creatorID = ObjectIdField()

class Category(Document):
	name = StringField()

class Game(Document):
	gameinput = StringField()
	userID = ObjectIdField()
	time = DateTimeField()