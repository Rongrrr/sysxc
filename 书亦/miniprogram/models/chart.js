import {observable,action} from 'mobx-miniprogram'

export const chart = observable({
  list:[],
  get totalPrice(){
    let totalPrice = 0
    this.list.forEach(item=>{
      totalPrice += item.price
    })
    return totalPrice
  },

  addChart:action(function(goods){
    this.list = [...this.list,goods]
  }),
  removeChart:action(function(goods){
    this.list = this.list.filter(item => JSON.stringify(item) !== JSON.stringify(goods) )
  })

})