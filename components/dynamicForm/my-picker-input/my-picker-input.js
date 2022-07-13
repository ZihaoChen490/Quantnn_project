// components/dynamicForm/my-picker-input/my-picker-input.js
Component({
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.setData({
                pickerOptions: this.properties.formitem.settings.range,
                pickerIndex: this.properties.formitem.settings.pickerIndex
            })
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    /**
     * Component properties
     */
    properties: {
        formitem: Object,

    },
    options: {
        styleIsolation: "shared"
    },
    /**
     * Component initial data
     */
    data: {
        pickerOptions: Array,
        pickerIndex: Number,
    },

    /**
     * Component methods
     */
    methods: {
        callBackEvent: function (e) {
            console.log("callBackEvent")
            console.log(e)
        },
        bindInputChange: function (e) {
            this.triggerEvent('bindPickerChange', e, {
                bubbles: true
            })
        },
        bindPickerChange: function (e) {
            console.log('picker发生选择改变，携带值为', e.detail.value);
            /*
            冒泡向上传递
            https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html
            */
            this.triggerEvent('bindPickerChange', e, {
                bubbles: true
            })
            this.setData({
                pickerIndex: e.detail.value
            })
        },
    }
})