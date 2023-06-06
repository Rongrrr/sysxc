const db = wx.cloud.database()
const cloud = wx.cloud

const list =()=>{
  return db.collection('goods').get()
}
const listWithCategory = () => {
  return cloud.callFunction({
    name:"goods-list-with-category"
  })
}
export default{
  list,
  listWithCategory
}