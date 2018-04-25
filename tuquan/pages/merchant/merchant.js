const app = getApp()
const fetch = require("../../utils/util.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mid: wx.getStorageSync('mid') || 0,
    banners: [],
    menu: [],
    selected: 0,
    cart: {
      count: 0,
      classify: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false
  },
  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var goods = this.data.menu[this.data.selected].goods.filter(g => g.id == id)[0];
    var list = this.data.cart.list;
    this.data.cart.count += 1;
    this.data.cart.total += goods.price;
    if (list[id]) {
      list[id].num++
    }
    else {
      list[id] = { num: 1, goods: goods };
      this.data.cart.classify += 1;
    }
    this.data.cart.list = list;
    this.setData({
      cart: this.data.cart
    })
  },
  reduceCart: function (id) {
    var list = this.data.cart.list;
    this.data.cart.count -= 1;
    this.data.cart.total -= list[id].goods.price;
    if (list[id].num <= 1) {
      delete list[id];
      this.data.cart.classify -= 1;
    }
    else {
      list[id].num -= 1;
    }
    this.data.cart.list = list;
    this.setData({
      cart: this.data.cart
    })
    if (this.data.cart.count == 0) {
      this.setData({
        showCartDetail: false
      });
    }
  },
  turnMenu: function (e) {
    this.setData({
      selected: e.currentTarget.dataset.index
    })
  },
  showCartDetail: function (e) {
    if (this.data.cart.count == 0) return false
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.mid) {
      this.setData({
        mid: options.mid
      })
    }
    if (this.data.mid === 0) {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
    this.setData({ banners: app.globalData.banners })

    var that = this;

    fetch._get({
      method: "menu", 
      success: function (res) {
        that.setData({
          menu: res.data.data,
        })
      }
    });

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight
        });
      }
    });
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

  }
})