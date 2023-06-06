const db = wx.cloud.database()
const list =()=>{
  return db.collection('shuyi_swiper').get()
}
export default{
  list
}