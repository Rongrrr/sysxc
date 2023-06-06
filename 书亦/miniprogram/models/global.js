import {observable,action} from 'mobx-miniprogram'

export const global = observable({
  currentStore:'',

  setCurrentStore:action(function(store){
    this.currentStore = store
  })

})