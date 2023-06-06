import SpecsCategoryApi from '../../api/specs-category'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods:{
      type:Object,
      value:null,
      //动态更改数据，newValue传递数据构造specsCategory的数据
      observer:function(newValue){
        this.fetchSpecsCategory(newValue['specs_category'])
      }
    },
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    specsCategory:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //加载新的数据
    async fetchSpecsCategory(categoryIds){
      const specsCategory = await SpecsCategoryApi.list(categoryIds)
      this.setData({
        specsCategory
      })
      
    }
  }
})
