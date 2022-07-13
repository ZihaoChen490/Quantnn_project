// components/dynamicForm/my-mobile/my-mobile.js
Component({

    options: {
        styleIsolation: "shared"
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

    },

    /**
     * Component methods
     */
    methods: {
        bindInputChange: function (e) {
            this.triggerEvent('bindPickerChange', e, {
                bubbles: true
            })
        },
        getSmsCode: function (e) {

        }
    }
})