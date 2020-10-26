#项目名称：家菜
##项目背景
###想象一下这些场景
1. 家中长辈问家庭成员今天想吃什么菜？
> 长辈们想菜难
2. 小辈们天天被问到这个问题，随口回答“随便”
> 小辈内心：我真的不知道我想吃什么菜，我想不到！！！
3. 长辈们按照自己的理解，买了菜，烧了菜
> 长辈们按照小辈和自己的喜好烧菜，往往导致小辈长时间只吃一种菜式，吃到*腻*
4. 长辈们翻阅菜谱书籍寻找新菜式，却往往作罢
> 这个菜式看起来好难，小辈万一不爱吃怎么办
5. 家中往往有一些不良的饮食习惯，无人纠正
> 长辈喜欢多糖，多盐，多油，或者经常不吃蔬菜等等问题
###初衷
1. 解决长辈买菜难问题
2. 解决小辈想菜难问题
3. 解决长辈烧菜，增加菜式难的问题
4. 解决家中含有隐形的不良饮食习惯问题
5. 促进家中和睦关系，增加一些趣味
###解决方案
1. 第一步：记录下自己家中会烧什么菜，并分类
2. 第二步：每天根据一定的原则随机产生当日菜谱
> 可以进行微调
3. 第三步：对吃完的菜划去或删除
> 没吃完的菜记录时间，并大致根据菜的类别和当季温度，时间推断腐坏可能性
4. 第四步：买菜的时候，随机出一个今天要烧的菜，或者指定一个菜
> 根据剩余的菜与菜的种类推导
5. 第五步：分享出今天家里的菜
-----------------------------------------------------------------------
##项目方案
###技术选型
1. 数据库上选择mongodb
2. 后台构建上选择python中的django框架
3. 服务器选择ubantu+nginx+uwsgi
4. 前台表现上选择微信小程序
5. 智能数据处理上选择transerflow框架
###功能模块划分
1. 组成家庭圈子
> 可以增加成员，删除成员，修改名字，修改类别，修改自己的身份
2. 增加菜
> 菜包括分类，名字；不一定包括口感，材料，评分
3. 随机
> 可以根据三菜一汤等组合随机出菜单，当已经有过夜菜或熟菜时可以选择随机出一道菜
4. 每道菜计时，推断是否腐坏
5. 菜单
> 可以自由添加指定菜品进菜单，可以分享，可以删除菜品
6. 小功能
> 随机外卖，小游戏等
###数据库设计
* 暂定7个collection：users,circles,dishes,menus,categories,userInCircle,dishInMenu
* users

name       | type      | explaination
-----------| --------- | ------------
_id        | String    | 自生成ID
nickname   | String    | 昵称
age        | int       | 年龄
time       | Time      | 创建时间
taste      | String    | 口味
favor      | {String}  | 喜欢吃的菜(ID)
circleID   | String    | 默认圈子ID

* circles

name       | type      | explaination
-----------| --------- | ------------
_id        | String    | 自生成ID
name       | String    | 圈子昵称
time       | Time      | 创建时间
menuID     | String    | 默认菜单ID


* userInCircle

name       | type      | explaination
-----------| --------- | ------------
_id        | String    | 自生成ID
circleID   | String    | 群ID
userID     | String    | 用户ID
generation | int       | 辈分

* dishes

name         | type      | explaination
------------ | --------- | ------------
_id          | String    | 自生成ID
name         | String    | 菜名
categoriesID | String    | 分类
favor        | String    | 口味
contain      | {String}  | 组成
time         | Time      | 创建时间

* menu

name         | type      | explaination
------------ | --------- | ------------
_id          | String    | 自生成ID
circleID     | String    | 圈子ID
creatorID    | String    | 创建者ID
name         | String    | 菜单名
creatTime    | Time      | 创建时间
menuTime     | Time      | 菜单时间
type         | String    | 类型

* dishInMenu

name         | type      | explaination
------------ | --------- | ------------
_id          | String    | 自生成ID
dishID       | String    | 圈子ID
menuID       | String    | 菜单ID
time         | Time      | 创建时间
creatorID    | String    | 创建者ID

* category

name         | type      | explaination
------------ | --------- | ------------
_id          | String    | 自生成ID
name         | String    | 名字

###部分逻辑实现
1. 登录逻辑
+ 用wx.login()换openid
+ 判断该openid是否在数据库中
+ 有则直接返回登录成功response；没有则返回第一次注册成功response；失败返回失败response
+ 登录成功response：更新页面数据
+ 第一次注册成功response：显示提示性信息
+ 失败response：显示登录失败提示信息