import {userBehavior} from '../../behaviors/user-behavior'
Component({
 
  /**
   * 组件的属性列表
   */
 behaviors:[userBehavior],
  options:{
    multipleSlots:true//在组件定义时启用多slot支持
  },
  properties: {
   list:{
     type:Array,
     value:[]
   },
   current:{
     type:Number,
     value:0
   }
  },

  /**
   * 组件的初始数据
   */
  data: {
    index:0
  },
lifetimes:{
  attached(){
    
  }
},
  /**
   * 组件的方法列表
   */
  methods: {
    onScroll(e){
      const rootTop = e.target.offsetTop //scroll-view到屏幕顶部的距离
      const _this = this
      this.createSelectorQuery().selectAll(".product-section").boundingClientRect(
        function(rects){
        const res = rects.find(item=>{
          return item.top <= rootTop && item.bottom >= rootTop
        })
        !res || _this.changeIndex(res.dataset.index)
        
      }
      ).exec()
    },
    changeIndex(index){
      this.setData({
        index
      })
      this.triggerEvent('on-change',{index})
    },

    //获取商品数据
    selectGoods(e){
      const {goods} = e.currentTarget.dataset
      this.triggerEvent("on-selected",{goods})
    }
  }
})
