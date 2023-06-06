const computedBehavior = require('miniprogram-computed').behavior
import {userBehavior} from '../../behaviors/user-behavior'
Page({
  behavior:[userBehavior,computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    mobile:''
  },
  doLogin(){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  computed:{
    // 电话号码加密
    desensitiveMobile(data){
      let mobile = data.mobile
      if(mobile){
        mobile.replace(/^(\d{3})\d{6}(\d{2}$)/,'$1******$2')
      }
      return mobile
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const mobile = wx.getStorageSync('phoneNumber')
    this.setData({
      mobile
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})