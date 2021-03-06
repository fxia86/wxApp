const app = getApp()

Page({
  data: {
    banners: []
  },
  //事件处理函数
  scanCode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        wx.redirectTo({
          url: '/pages/merchant/merchant?mid=' + res
        })
      },
      fail: function (res) {
        wx.showToast({
          title: '网络错误'
        })
      },
      complete: function (res) {
        wx.setStorageSync('mid', 1)
        wx.navigateTo({
          url: '/pages/merchant/merchant?mid=' + 1
        })
      }
    })
  },
  onLoad: function () {
    this.setData({ banners: app.globalData.banners })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})
