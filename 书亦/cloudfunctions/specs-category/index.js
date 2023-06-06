// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({env: cloud.DYNAMIC_CURRENT_ENV}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const {list} = await db.collection('specs_category').aggregate()
  .lookup({
    from:'specs',
    localField: '_id',
    foreignField: 'category',
    as: 'specs',
  }).end()

  return list.filter(item => {
    return item
    // return event.ids.includes(item._id) //判断id 是否存在，如果不存在则不显示
  })
}