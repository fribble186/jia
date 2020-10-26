// pages/circle/circle.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    cancel:false,
    hide:false,
    share:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  back: function () {
    if(this.data.share){}
    else{wx.navigateBack()}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')
    var that = this
    this.setData({circleid:options.circleid})
    console.log(options.circleid)
    if (token) {
      this.setData({ cancel: true });
      console.log(token)
      wx.request({
        url: app.globalData.Url +'/getUserByCircleidGet/',
        data: {
          id: options.circleid
        },
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            members: res.data
          })
          for (var i = 0; i < res.data.length; i++) {
            if (token[0]['data'] == res.data[0]._id.$oid) {
              that.setData({
                hide: true
              })
            }
          }
        }
      })
    }
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
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) { console.log(e.detail.userInfo)}
    else {this.setData({cancel:false})}
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '转发给家人吧',
      path: '/pages/circle/circle?circleid='+this.data.circleid
    }
  },
attend:function(){
  var token = wx.getStorageSync('token')[0]['data']
  var that = this
  wx.showModal({
    title: '提示',
    content: '点击确定将加入该家庭',
    success: function (res) {
      if (res.confirm) {
        wx.request({
          url: app.globalData.Url +'/userAttendCirclePost/',
          data: {
            userid: token,
            circleid:that.data.circleid
          },
          method: 'POST',
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            wx.reLaunch({
              url: '../homepage/homepage',
            })
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
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
                avater: avater
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                wx.setStorage({
                  key: 'token',
                  data: res.data,
                })
                that.setData({ cancel: true })
                wx.request({
                  url: app.globalData.Url + '/getUserByCircleidGet/',
                  data: {
                    id: that.data.circleid
                  },
                  method: 'GET',
                  header: {
                    'Content-Type': 'application/json'
                  },
                  success: function (res) {
                    console.log(res.data)
                    that.setData({
                      members: res.data
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
    else { this.setData({ cancel: false }) }
  },
})