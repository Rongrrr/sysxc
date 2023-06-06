const db = wx.cloud.database()
const list =()=>{
  return db.collection('goods_category').get()
}
export default{
  list
}