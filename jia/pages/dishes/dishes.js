// pages/dishes/dishes.js
const app = getApp()
var page = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category:'肉类',
    hide:false,
    hide:true
  },
  back: function () {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    wx.request({
      url: app.globalData.Url +'/getCategoryGet/',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          categorys: res.data,
        })
      }
    })
    that.getContent(that)
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
  bindChange: function (e) {
    var val = e.detail.value
    console.log(this.data.categorys[val[0]].name)
    this.setData({
      category: this.data.categorys[val[0]].name
    })
  },
  listenName:function(e){
    this.data.dishName = e.detail.value;
  },
  submit:function(){
    var that = this
    var token = wx.getStorageSync('token')[0]['data']
    if (that.data.dishName == undefined) {
      wx.showToast({
        title: '请输入菜的名字',
        icon: 'none'
      })
    }
    else{
    wx.request({
      url: app.globalData.Url +'/addDishesPost/',
      data: {
        dishname: that.data.dishName,
        category: that.data.category,
        code:token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log("success")
        wx.showToast({
          title: '添加成功了！',
          icon: 'none'
        })
      }
    })}
  },
  close:function(){
    this.setData({hide:true})
    this.getContent(this)
  },
  del: function (event) {
    var dishid = event.currentTarget.dataset.id
    var that = this
    wx.request({
      url: app.globalData.Url +'/deleteDishesGet/',
      data: {
        id: dishid
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.onLoad()
      }
    })
  },
  add:function(){
    this.setData({
      hide:false
    })
  },
  getContent(that){
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    wx.request({
      url: app.globalData.Url +'/getDishesGetid/' + page + '/',
      method: 'GET',
      data: {
        id: token
      },
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          dishes: res.data,
        })
      }
    })
  }
})