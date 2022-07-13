// pages/selecttime/selecttime.js
import formSelectTimeCofig from '../../demo/formSelectTimeCofig'

Page({

    /**
     * Page initial data
     */
    data: {
        formSelectTimeCofig: formSelectTimeCofig 
    },
    properties: {
        formSelectTimeCofig: {
            type: Object,
            value: formSelectTimeCofig
          },
          selectstock:{
              type: String,
              value: []
          }
    },

    onHanldeFormData(e){
        console.log(e.detail.value)     
        wx.request({
        url: 'http://www.quantnn.cn/testww.php',
        data:{
              name: 'quantnn',
              password:'quantnn',
              database:'quantnn',
              ww:e.detail.value.selectstock,
              stockid: e.detail.value.selectstock,
              modelclass: e.detail.value.modelclass,
              starttime: e.detail.value.starttime,
              endtime: e.detail.value.endtime
          },
          success: (res)=>{
              console.log(res);
          }
        });
        wx.showLoading({
          title: 'selecttime',
        });
        setTimeout(function()
        {
            wx.hideLoading()
            wx.showToast({
              title: 'success',
            })

        },1500);
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function (options) {

    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function () {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function () {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function () {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function () {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function () {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function () {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function () {

    },

    
})