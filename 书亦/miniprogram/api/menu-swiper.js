const db = wx.cloud.database()
const list =()=>{
  return db.collection('menu-swiper').get()
}
export default{
  list
}