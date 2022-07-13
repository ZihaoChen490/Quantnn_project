// components/dynamicForm/my-vcode/my-vcode.js
Component({
    lifetimes: {
        attached: function() {
          // 在组件实例进入页面节点树时执行
          wx.cloud.callFunction({
            name: 'miniticket',
            config: {
              env: this.data.envId
            },
            data: {
              type: 'getVcode'
            }
          }).then((resp) => {
            console.log(resp)
            this.setData({
                imageData : resp.result.vcodeImg,
                [`formData.${this.properties.formitem.settings.vcodeVerifyCode}`] : resp.result.vcode
            })
         }).catch((e) => {
            this.setData({
              showUploadTip: true
            })
        })
        },
        detached: function() {
          // 在组件实例被从页面节点树移除时执行
        },
    },
    options:{
        styleIsolation: "shared"
    },
    /**
     * Component properties
     */
    properties: {
        formitem: Object,
        fromData: Object
    },

    /**
     * Component initial data
     */
    data: {
        imageData: '',
        vcodeVerifyCode: ''
    },

    /**
     * Component methods
     */
    methods: {
        callBackEvent: function(e){
            console.log("callBackEvent")
            console.log(e)
        },
        bindInputChange: function(e){
          this.setData({
            [`formData.${this.properties.formitem.settings.dataField}`]:e.detail.value
          })
          this.triggerEvent('bindPickerChange',{
            id: this.properties.formitem.id,
            value: this.data.formData
          },{bubbles: true})
        },
        getVcode: function(e){
            // console.log(e)
            wx.cloud.callFunction({
                name: 'miniticket',
                config: {
                  env: this.data.envId
                },
                data: {
                  type: 'getVcode'
                }
              }).then((resp) => {
                console.log(resp)
                this.setData({
                    imageData : resp.result.vcodeImg,
                    [`${this.properties.formitem.settings.vcodeVerifyCode}`] : resp.result.vcode
                })
             }).catch((e) => {
                this.setData({
                  showUploadTip: true
                })
            })
        }
    }
})
