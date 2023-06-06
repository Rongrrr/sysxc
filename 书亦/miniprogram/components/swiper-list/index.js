// components/swiper-list/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list:{
      type:Array,
      value:[]
    },
    style:{
      type:String,
      value:''
    },
    dotsStyle:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwiperChange(e){
      const {current} = e.detail
      this.setData({
        current
      })
    },
    onSwiperTap(e){   
      const {item} = e.currentTarget.dataset
      item.type === 'url' ? wx.navigateTo({
        url: `/pages/web-view/index?url=${item.target}`,
      }):wx.navigateTo({
        url: `/pages/product/detail?id=${item.target}`,
      })
    },
  }
})
