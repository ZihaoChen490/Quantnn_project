Component({
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
        },
        detached: function () {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    properties: {
        formConfig: Object
    },

    options: {
        styleIsolation: "shared"
    },

    data: {
        showTopTips: false,
        radioItems: [],
        checkboxItems: [],
        items: [],
        formData: {},
        isAgree: false,
        error: ''
    },

    methods: {
        _dataFromComponentById(event) {
            console.log("id receive event", event)
            var field = event.detail.id
            this.setData({
                [`formData.${field}`]: event.detail.value
            })

            return field, event.detail.value
        },
        _dataFromComponent(event) {
            let that = this
            console.log("receive event", event)
            const {
                field
            } = event.detail.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: event.detail.detail.value
            })
            //从组件传过来的值，此处是手动调用校验回调示例
            // this.validateField(field, function(e){
            //     console.log('validate',e)
            //     if(e){
            //         console.log('all validate status',that.data.validate)
            //         this.setData({
            //             [`validate.${field}`]: true
            //         })
            //     }
            // })
            return field, event.detail.detail.value
        },
        _getAndSetFormData(event) {
            // console.log("事件",event)
            // 通过事件获取数据名称和值
            const {
                field
            } = event.currentTarget.dataset
            this.setData({
                [`formData.${field}`]: event.detail.value
            })
            return field, event.detail.value
        },
        bindAgreeChange: function (e) {
            this.setData({
                isAgree: !!e.detail.value.length
            });
        },
        validateSuccess(e) {
            console.log("val success formData", this.data.formData)
        },
        submitForm() {
            //此处是自定义提交验证，在提交前验证数据是否正确
            this.validate("#form").then(res => {
                // console.log(res)
                if (res.isValid) {
                    if (this.data.isAgree) {
                        //提交表单
                        console.log('submit')
                        this.triggerEvent("hanldeFormData",this.data.formData)
                    } else {
                        this.setData({
                            error: "请同意规则"
                        })
                    }

                } else {
                    // console.log("array",array)
                    if (res.errors == null) {
                        this.setData({
                            error: "管理员设置有问题，没设置验证"
                        })
                    } else {
                        const firstError = Object.keys(res.errors)
                        if (firstError.length) {
                            this.setData({
                                error: res.errors[firstError[0]].message
                            })
                        }
                    }
                }
            })
        },
        validateField(field, callBackFunction) {
            return this.selectComponent("#form").validateField(field, callBackEvent)
        },
        validate(selector) {
            //多张表单记得换选择器
            return this.selectComponent(selector).validate()
        }

    }

});