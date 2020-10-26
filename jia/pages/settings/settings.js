// pages/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    wx.request({
      url: app.globalData.Url +'/userInCircleGet/',
      data: {
        id: token
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data[0].circleID.$oid)
        that.setData({
          avaters: res.data,
          circleid: res.data[0].circleID.$oid
        })
      }
    })
    wx.request({
      url: app.globalData.Url +'/getMenusGet/',
      data: {
        id: token
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          menus: res.data
        })
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

  //点击返回按钮事件
  back: function () {
    wx.navigateBack()
  },
  
  //点击家庭按钮事件
  toCircle: function () {
    var that = this
    console.log(that.data.circleid)
    wx.navigateTo({
      url: '../circle/circle?circleid='+that.data.circleid,
    })
  },

  //点击菜谱按钮事件
  toMenus: function () {
    wx.navigateTo({
      url: '../menus/menus',
    })
  },

  //点击加菜按钮事件
  toDishes: function () {
    wx.navigateTo({
      url: '../dishes/dishes',
    })
  },
  del:function(event){
    var menuid=event.currentTarget.dataset.id
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    wx.request({
      url: app.globalData.Url +'/deleteMenusGet/',
      data: {
        id: menuid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        wx.request({
          url: app.globalData.Url +'/getMenusGet/',
          data: {
            id: token
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            that.setData({
              menus: res.data
            })
          }
        })
      }
    })
  },
  togame:function(){
    wx.navigateTo({
      url: '../game/game',
    })
  },
  can:function(){
    wx.request({
      url: 'http://caipu.market.alicloudapi.com/showapi_cpQuery',
      data: {
        cpName:'番茄炒蛋',
        type: "热门专题"
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'Authorization': 'APPCODE 002c048d89d74531a84110ee27880ce2'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  }
})