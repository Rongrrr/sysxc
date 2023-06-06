const cloud = wx.cloud

const list = (categoryIds) => {
  return cloud.callFunction({
    name:"specs-category",
    data:{
      ids:categoryIds
    }
  })
}

export default{
  list
}