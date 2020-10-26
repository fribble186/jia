App({
  globalData: {
    flag: null,
    Url: 'https://fribble186.cn',//'http://127.0.0.1:8000''https://fribble186.cn'
  },
  onLaunch:function(){
    var that = this
    wx.login({
      success: function (res) {
        console.log(res.code)
        wx.request({
          url: that.globalData.Url + '/launch/',
          data: {
            code:res.code
          },
          method: 'GET',
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            if (res.data==''){wx.clearStorage()}
            else {
              console.log(res.data)
              wx.setStorage({
                key: 'token',
                data: res.data,
              })
            }
          }
        })
      }
    })
  },
  launch:function(){
    wx.request({
      url: '',
    })
    return true
  }
})