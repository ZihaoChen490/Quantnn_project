// test.js

const home_config = require('../../config').home_config;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getHomeConfigMethod();
  },
  getHomeConfigMethod:function(){
    var that = this;
   wx.request({
     url: home_config+"?token=toekn", //小程序目前发起request请求，必须是https协议
     success:function(res){
      console.log(res);
     },
     fail:function(res){
        console.log(res)
     }
   })

  }
})