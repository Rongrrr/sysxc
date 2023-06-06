import {BehaviorWithStore} from 'mobx-miniprogram-bindings'
import {user,global, chart} from '../models/index'

export const userBehavior = BehaviorWithStore({
  storeBindings:[{
    namespace:'user',
    store:user,
    fields:["phoneNumber"],
    actions:["update"]
  },
  {
    namespace:'global',
    store:global,
    fields:["currentStore"],
    actions:["setCurrentStore"]
  },
  {
    namespace:"charts",
    store:chart,
    fields:["list","totalPrice"],
    actions:["addCart","removeChart"]
  }
]
})