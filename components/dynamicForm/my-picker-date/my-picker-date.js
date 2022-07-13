// components/dynamicForm/my-picker-date/my-picker-date.js
Component({
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.setData({
                date: this.properties.formitem.settings.start
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    options: {
        styleIsolation: "shared",
    },
    /**
     * Component properties
     */
    properties: {
        formitem: Object,
    },

    /**
     * Component initial data
     */
    data: {
        date: "2021-09-01",
        time: "12:01",
    },

    /**
     * Component methods
     */
    methods: {
        callBackEvent: function (e) {
            console.log("callBackEvent")
            console.log(e)
        },
        _timeChange: function (e) {
            /*
            冒泡向上传递
            https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html
            */
            this.triggerEvent('bindPickerChange', e, {
                bubbles: true
            })
            this.setData({
                date: e.detail.value,
                [`formData.date`]: e.detail.value
            })
        },
    }
})