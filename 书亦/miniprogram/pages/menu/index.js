import {userBehavior} from '../../behaviors/user-behavior'
import swiper from '../../api/menu-swiper'
import goodsApi from '../../api/goods'
import goodsCategoryApi from '../../api/goods_category'

Page({
  behaviors:[userBehavior],
  data: {
    headerStyle:'',
    swiperList:[],
    goodsList:[],
    currentCategoryIndex:0,
    sideBarCurrent:0,
    goodsDialogShow:false,
    selectedGoods:null
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.makeHeaderStyle()
    this.fetchSwiperList()
    this.fetchData()
  },
  //页面顶部高度
  makeHeaderStyle(){
    const {top,bottom,height} = wx.getMenuButtonBoundingClientRect()
    const menuButtonCenterPoint = top + height/2
    const headerStyle = 'margin-top:calc('+ menuButtonCenterPoint + 'px - 35rpx);'
    this.setData({
      headerStyle
    })
  },
  //选择门店地址
  selectStoreBack(){
    this.setCurrentStore(null)
    wx.navigateBack({
      delta:0
    })
  },
  //轮播图
  fetchSwiperList(){
    swiper.list().then(res => {
      this.setData({
        swiperList: res.data
      })
    })
  },

  fetchData(){
    goodsApi.listWithCategory().then(res=>{
      this.setData({
        goodsList:res.result
      })
    })
    
  },
  onSidebarChange(e){
    this.setData({
      currentCategoryIndex:e.detail.index
    })
  },
  onGoodsListChange(e){
    this.setData({
      sideBarCurrent:e.detail.index
    })
  },
  onGoodSelected(e){
    
    this.setData({
      goodsDialogShow:true,
      selectedGoods:e.detail
    })
  }

  
})