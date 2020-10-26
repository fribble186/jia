// pages/game/game.js
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
  back: function () {
    wx.navigateBack()
  },
  
  unlock:function(e){
    this.setData({
      lock:false,
      input:e.detail.value
    })
  },
  submit:function(){
    if (!this.data.input){wx.showToast({
      title: '请输入内容',
      icon:'none'
    })}
    else{
    var token = wx.getStorageSync('token')[0]['data']
    var that = this
    if (!that.data.lock){
    wx.request({
      url: app.globalData.Url +'/game/',
      data: {
        input: that.data.input,
        userid: token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({ lock: true })
      }
    })}
    var n = that.data.input.split("，");
    that.setData({out:n[that.randomNum(0,n.length-1)]})}
  },
  randomNum(min, max){ 
    switch(arguments.length) { 
        case 1: 
    return Math.floor(Math.random() * minNum + 1); 
    break; 
    case 2: 
    return Math.floor(Math.random() * (max - min + 1) + min); 
    break; 
    default: 
                return 0; 
    break; 
  } 
}
})