import storeApi from '../../api/store'
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
import {userBehavior} from '../../behaviors/user-behavior'
const computedBehavior = require('miniprogram-computed').behavior
Page({
  behaviors:[userBehavior,computedBehavior],
  /**
   * 页面的初始数据
   */
  data: {
    latitude:0,//纬度
    longitude:0,//经度
    storeList:[],
    dict:{
      "OPENING":'营业中',
      "CLOSED":"已打烊"
    },
    storeDetailShow:false,
    collapse:false,
  },
  mapContext : null,
  mapSDK:null,
  computed:{
    markers(data){
      const storeList = data.storeList
      return storeList.map((item,index)=>{
        return{
          id:index + 1,
          key:item._id,
          title:item.name,
          latitude:item.location.latitude,
          longitude:item.location.longitude,
          iconPath:'../../assets/icons/location.png',
          width:'55rpx',
          height:'69rpx'
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
      this.initMapSDK()
      await this.loadCurrentLocation()
      // this.fechStoreList()
      this.initMapContext()
      
  },
  initMapSDK(){
     this.mapSDK = new QQMapWX({
      key: 'LTCBZ-4XZKZ-RC5XW-7YIDP-TI4HT-KTBK5'
  });
  },
  //获取门店数据
  fechStoreList(){
    storeApi.list(this.data.longitude,this.data.latitude).then(res=>{
      this.mackeStoreList(res.data)
    })
  },
  //计算距离
  mackeStoreList(storeList){
    var _this = this;
    const LocationList = storeList.map(item=>{
      const location = item.location
      return{
        latitude:location.latitude,
        longitude:location.longitude,
      }
    })
    
    //调用距离计算接口
    this.mapSDK.calculateDistance({
      to:LocationList,
      success:function(res){
        console.log(res);
        storeList.forEach((item,key)=>{
          storeList[key]['distance'] = (res.result.elements[key].distance/1000).toFixed(2)
        })
        //坑，如果在回调函数中再调用回调函数，需要重新定义一个变量 _this
        _this.setData({
          storeList
        })
        console.log(storeList);
      },
      fail: function(error) {
        console.error(error);
      },
    })
  },
  //获取经纬度
  async loadCurrentLocation(){
    wx.getLocation({
      type: 'wgs84',
      success: (res)=> {
        const latitude = res.latitude
        const longitude = res.longitude
        this.setData({
          latitude,
          longitude
        })
        this.fechStoreList()
      }
     })
  },
  initMapContext(){
     //定位按钮
     wx.createSelectorQuery().select('#store-map').context((res)=>{
      this.mapContext = res.context
    }).exec()
  },
  //定位按钮
  goToCurrentLocation(){
    this.mapContext.moveToLocation()
    this.loadCurrentLocation()
  },
  //门店定位按钮
  navgationLocation(e){
    const {latitude,longitude} = e.currentTarget.dataset.location
    wx.openLocation({
      latitude,
      longitude
    })
  },
  // 门店电话按钮
  call(e){
    const {phone} = e.currentTarget.dataset
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  //门店弹出框
  pupopStoreDetail(e){
    const {store} = e.currentTarget.dataset
    this.setData({
      storeDetailShow:true,
    })
    this.setCurrentStore(store);
  },
  //地图折叠
  collapse(){
    this.setData({
      collapse:!this.data.collapse
    })
  },
  //进入门店按钮，进入门店菜单
  goToMenu(){
    wx.navigateTo({
      url: '/pages/menu/index',
    })
  },





 
})