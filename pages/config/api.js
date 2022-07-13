
const baseAPI = "http://www.quantnn.cn/"
const socketAPI = "wss://www.quantnn.cn/"
const ossDomain = "http://www.quantnn.cn/"

export default {
  baseAPI, // 根接口
  socketAPI: socketAPI, // Socket接口
  ossDomain: ossDomain, // OSS域名
  instructionsAPI: baseAPI + "instruction/", // 收藏接口
  topicAPI: baseAPI + "topic/", // 话题接口
  labelAPI: baseAPI + "label/", // 标签接口
  holeAPI: baseAPI + "hole/", // 树洞接口
  chatResAPI: baseAPI + "chat/", // 聊天记录接口
  userAPI: baseAPI + "user/", // 用户接口
  followingAPI: baseAPI + "following/", // 关注接口
  commentAPI: baseAPI + "comment/", // 评论接口
  starAPI: baseAPI + "star/", // 收藏接口
  templateAPI: baseAPI + "template/", // 模板接口
  messageAPI: baseAPI + "message/", // 消息接口
  ossAPI: baseAPI + "oss/", // 存储接口
  chatAPI: socketAPI + "chat" // 聊天接口
}