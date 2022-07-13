const cloud = require('wx-server-sdk')
var captchapng = require('captchapng')
// var md5 = require('md5')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
// const db = cloud.database()

// 查询数据库集合云函数入口函数
exports.main = (event, context) => {

  var vcodeInt = parseInt(Math.random() * 9000 + 1000)
  var vcodeRaw = new captchapng(80, 30, vcodeInt)
  // width,height,numeric captcha
  vcodeRaw.color(0, 0, 0, 0) // First color: background (red, green, blue, alpha)
  vcodeRaw.color(80, 80, 80, 255) // Second color: paint (red, green, blue, alpha)
  var vcodeRaw64 = vcodeRaw.getBase64()
  var vcodeBase64 = new Buffer(vcodeRaw64, 'base64')

  //选择性进行MD5加盐
  //设置加密字符串
  // var salt = ''
  //在原来的字符串的基础上加上一些特殊文本
  // var vcodeEncrypt =  md5(salt + vcodeInt)

  let {
    OPENID,
    APPID
  } = cloud.getWXContext()
  return {
    openid: OPENID,
    vcodeImg: vcodeBase64.toString('base64', 0),
    vcode: vcodeInt
  }
}