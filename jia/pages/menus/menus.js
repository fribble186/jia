// pages/menus/menus.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  moren:false,

  },
  back: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
put:function(e){
  this.data.menuName = e.detail.value;
},

switchChange:function(e){
  console.log(e.detail.value)
  this.data.moren = e.detail.value
},
upload: function (e) { 
    var name = this.data.menuName
    var moren = this.data.moren
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    if (name == undefined){
      wx.showToast({
        title: '请输入菜单名字',
        icon:'none'
      })
    }
    else{
      console.log(moren.toString())
      wx.request({
        url: app.globalData.Url +'/addMenusPost/',
        data: {
          code: token,
          menuname: name,
          moren: moren.toString()
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          wx.showToast({
            title: '添加成功',
            icon:'none'
          })
          setTimeout(function(){
            wx.navigateBack()
          },200)
        }
      })
    }
  }
})