// components/dynamicForm/my-uploader/my-uploader.js
Component({
    lifetimes: {
        attached: function () {
            // 在组件实例进入页面节点树时执行
            this.setData({
                selectFile: this.selectFile.bind(this),
                uplaodFile: this.uplaodFile.bind(this)
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
        basePath: String
    },
    options: {
        styleIsolation: "shared"
    },
    /**
     * Component initial data
     */
    data: {
        files: [],
        uploadFile: []
    },

    /**
     * Component methods
     */
    methods: {
        chooseImage: function (e) {
            var that = this;
            console.log('choseimg', e)
        },
        previewImage: function (e) {
            wx.previewImage({
                current: e.currentTarget.id, // 当前显示图片的http链接
                urls: this.data.files // 需要预览的图片http链接列表
            })
        },
        selectFile(files) {
            console.log('files', files)
            if(files.tempFilePaths.length != 1){
                
            }
            // 返回false可以阻止某次文件上传
        },
        uplaodFile(files) {
            // console.log('upload files', files)
            //此处文件名获取不了原来的，https://developers.weixin.qq.com/community/develop/doc/0004c2645f0090bf924771cf356c00
            return new Promise((resolve, reject) => {

                for (var file = 0; file < files.tempFilePaths.length; file++) {
                    // console.log(files.tempFilePaths[file])
                    // console.log(file)
                    var path = files.tempFilePaths[file]
                    var filename = path
                    var index = filename.lastIndexOf(".");
                    var suffix = filename.substring(index + 1);
                    let targetPath = this.properties.formitem.settings.basePath + new Date().getTime() + "/" + suffix
                    // console.log("uploding")
                    wx.cloud.uploadFile({
                        cloudPath: targetPath,
                        filePath: path
                    }).then(res => {
                        // console.log("success")
                        // console.log(res.fileID)
                        // resolve(res.fileID)
                        // uplaodFile.push()
                        console.log(res.fileID)
                        resolve({
                            urls: [res.fileID]
                        })
                        // console.log("success")
                    }).catch(res => {
                        reject(res)
                    })
                }
            })
        },
        uploadError(e) {
            console.log('upload error', e.detail)

        },
        uploadSuccess(e) {
            // console.log('upload success', e.detail.urls)
            var uploadFiles = this.data.uploadFile
            uploadFiles.push(e.detail.urls[0])
            // console.log('uploadFiles array',uploadFiles)
            this.setData({
                uploadFile: uploadFiles
            })
            this.triggerEvent('bindPickerChange', {
                id: this.properties.formitem.id,
                value: this.data.uploadFile
            })
        },

    }
})