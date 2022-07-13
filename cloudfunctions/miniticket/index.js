// 云函数入口文件
const cloud = require('wx-server-sdk')
const getVcode = require('./vcode')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    switch (event.type) {
      case 'getVcode':
        return await getVcode.main(event, context)
    }
  }