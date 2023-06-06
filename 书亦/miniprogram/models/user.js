import {observable,action} from 'mobx-miniprogram'

const userInStorage = wx.getStorageSync('user')

export const user = observable({
  phoneNumber:(!userInStorage || userInStorage.phone_number),

  update:action(function(){
    this.phoneNumber= !userInStorage || userInStorage.phone_number

  })
})