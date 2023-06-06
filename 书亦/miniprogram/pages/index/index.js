
import swiper from '../../api/swiper'
import {userBehavior} from '../../behaviors/user-behavior'
const app = getApp()

Page({
  behaviors:[userBehavior],
  data: {
    swiperList:[],
    memberInfo:false,
  },
 

  //登录按钮
  doLogin(e){
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
 
  onLoad(){
    //绑定轮播图
    swiper.list().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
    this.loadMenberInfo()
  },
  loadMenberInfo(){
   if(wx.getStorageSync('phoneNumber')){
     this.setData({
       memberInfo:true
     })
   }
  },
  //到店取餐
  onMenuTap(){
    wx.switchTab({
      url: '/pages/store/index',
    })
  },
  newProduct(){
    wx.switchTab({
      url: '/pages/menu/index',
    })
  }
});
