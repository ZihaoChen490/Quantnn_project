// pages/videolessons/videolessons.js
// pages/yanbao/yanbao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  query:{},
  yanbaoList: [],
  page:1,
  pagesize:10,
  total:0
  },
//请求研报数据
getYanbaoList(){
  wx.request({
    url: 'http://www.quantnn.cn/',
    method:'GET',
    data:{
      _page:this.data.page,
      _limit:this.data.pagesize
    },
    success:(res)=>{
      this.setData({
        yanbaoList:[...this.data.yanbaoList,...res.data],
        total:res.header['X-Total-num']-0
      })
    },
    complete:(res)=>{
      wx.hideLoading({
      })
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "加载中。。。",
    })
this.setData({
  query:options
})
this.getYanbaoList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
wx.setNavigationBarTitle({
  title: this.data.item,
})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})