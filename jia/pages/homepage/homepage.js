// pages/homepage/homepage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dishes: [],
    choice:true,
    choice2:true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    dish:true,
    menuid:'',
    menuName:'每日の菜单',
    one:true,
    all:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var that = this
    if (token) { 
      this.setData({ cancel: true });
      console.log(token)
      that.getContent(that)}
    else { this.setData({ cancel: false }); console.log('!token') }
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getContent(that) {
    var token = wx.getStorageSync('token')[0]['data']
    wx.request({
      url: app.globalData.Url+'/getOneMenuGet/',
      data: {
        id: token
      },
      method: 'GET', 
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        if (res.data[0]._id == undefined) { that.setData({ cancel: false }); console.log('!token')}
        that.setData({ 
          menuName: res.data[0].name,
          menuid:res.data[0]._id.$oid
          })
        wx.request({
          url: app.globalData.Url + '/getDishesGet/',
          data: {
            id: that.data.menuid
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.length != 0) {
              that.setData({
                dishes: res.data,
                dish: true
              })
            }
            else{
              that.setData({
                dish: false
              })
            }
          }
        })
      }
    })
  },

  //隐藏两个随机按钮的函数
    endRoll: function () {
    this.getContent(this)
    this.setData({
      choice: true,
      choice2: true,
      ch: '',
      one:true,
      all:true
    })
  },

  //显现两个随机按钮的函数
  startRoll: function () {
    var that = this
    this.setData({
      choice: false,
      choice2: false
    })
    setTimeout(function () {
      that.setData({
        ch: 'transform: translate(0)'
      })
    }, 100)
  },

  //登录按钮的点击事件
  bindGetUserInfo: function (e) {
    var that = this
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo);
      var nickname = e.detail.userInfo.nickName
      var gender = e.detail.userInfo.gender
      var avater = e.detail.userInfo.avatarUrl
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: app.globalData.Url +'/userLoginPost/',
              data: {
                code: res.code,
                nickname: nickname,
                gender: gender,
                avater:avater
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                //if (res.data == '1') { that.setData({ cancel: true,version:true})}
                //else{
                
                wx.setStorage({
                  key: 'token',
                  data: res.data,
                  success: function () { that.getContent(that)}
                })
                that.setData({ cancel: true,version:false })
                //}
              }
            })
          }
        }
      })
    }
    else { this.setData({ cancel: false }) }
  },

//到个人主页的蓝色按钮点击事件
  tosetting: function () {
    wx.navigateTo({
      url: '../settings/settings',
    })
  },
  del: function (event) {
    var dishid = event.currentTarget.dataset.id
    var that = this
    wx.request({
      url: app.globalData.Url +'/deleteDishInMenuGet/',
      data: {
        id: dishid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.getContent(that)
      }
    })
    },
    rollone:function(){
      var that = this
      var token = wx.getStorageSync('token')[0]['data']
      wx.request({
        url: app.globalData.Url + '/rollone/',
        data: {
          id: that.data.menuid,
          token:token
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          setTimeout(function () {
            that.setData({
              ro: 'transform: scaleY(1)'
            })
          }, 100)
          console.log(res.data)
          that.setData({
            one:false,
            roll:res.data,
            choice2:true
          })
        }
      })
    },
    rollall: function () {
      var that = this
      var token = wx.getStorageSync('token')[0]['data']
      wx.request({
        url: app.globalData.Url + '/rollall/',
        data: {
          id: that.data.menuid,
          token: token
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          setTimeout(function () {
            that.setData({
              ra: 'transform: scaleY(1)'
            })
          }, 100)
          console.log(res.data)
          that.setData({
            all: false,
            rolles: res.data,
            choice2: true
          })
        }
      })
    },
    addToMenu:function(){
      var that = this
      var dishes = []
      dishes.push(that.data.roll._id.$oid)
      wx.request({
        url: app.globalData.Url + '/addDishesToMenuPost/',
        data: {
          menuid:that.data.menuid,
          dishid:dishes
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res.data)
        }
      })
    },
    addsToMenu: function () {
      var that = this
      var dishes = []
      var i = 0
      for(i;i<that.data.rolles.length;i++){
        dishes.push(that.data.rolles[i]._id.$oid)
      }
      wx.request({
        url: app.globalData.Url + '/addDishesToMenuPost/',
        data: {
          menuid: that.data.menuid,
          dishid: dishes
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res.data)
        }
      })
    }
})
