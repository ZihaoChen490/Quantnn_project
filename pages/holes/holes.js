//index.js
//获取应用实例
const app = getApp()
const myRequest = require('../../api/index.js');
const api = app.api
const wxutil = app.wxutil
const pageSize = 16 // 每页显示条数
Page({
	// 页面的初始数据
	data: {
    colorList:[], //随机颜色列表
    cateActive: '0',
    isLoading:false,//上拉节流阀
    barBg: '#f8f8f8',//#ff6600
    fixed: true,
    color: '#000000',//#ffffff
    touchStartY: 0,//触摸开始的Y坐标
    toggleBarShow: true,
    backStyle: 'normal',
    backEvent: true,
    backHomeEvent: true,
		navList: [{
			icon: '/images/icon_social/research_report.jpg',
			events: 'goToYanBao',
      text: '研报',
      path: 'yanbao'
		},
		{
			icon: '/images/icon_social/Introduction.jpg',
			events: 'goToInstructions',
      text: '说明书',
      path: 'instructions'
    		},
		{
			icon: '/images/icon_social/video_lesson.jpg',
			events: 'goToVideoLessons',
      text: '视频课程',
      path: 'vidiolessons'
		},
		{
			icon: '/images/icon_social/AI_lab.jpg',
			events: 'goToAILab',
      text: 'AI实验室',
      path: 'AILab'
		},
		{
			icon: '/images/icon_social/select_stock.jpg',
			events: 'goToSelectStock',
      text: '一键选股',
      path: 'selectstock'
    },
    {
			icon: '/images/icon_social/select_time.jpg',
			events: 'goToSelectTime',
      text: '一键择时',
      path: 'selecttime'
		},
    ],
		swiperCurrent: 0,
  },



 // 获取话题
   getTopics(page = 1, labelId = -1, size = pageSize) {
    const url = api.topicAPI
    let data = {
      app_id: app.globalData.appId,
      size: size,
      page: page
    }
    if (labelId != -1) {
      data["label_id"] = labelId
    }
    if ((this.data.isEnd && page != 1) || this.data.inRequest) {
      return
    }
    this.setData({
      inRequest: true
    })
    wxutil.request.get(url, data).then((res) => {
      if (res.code == 200) {
        const topics = res.data
        this.setData({
          page: (topics.length == 0 && page != 1) ? page - 1 : page,
          loading: false,
          inRequest: false,
          isEnd: ((topics.length < pageSize) || (topics.length == 0 && page != 1)) ? true : false,
          topics: page == 1 ? topics : this.data.topics.concat(topics)
        })
      }
    })
  },
   //获取标签
  getLabels() {
    const url = api.labelAPI
    const data = {
      app_id: app.globalData.appId
    }

    wxutil.request.get(url, data).then((res) => {
      if (res.code == 200) {
        let labels = [{
          id: -1,
          name: "全部"
        }]
        this.setData({
          labels: labels.concat(res.data)
        })
      }
    })
  },
  getColors(){
    this.setData({
      isLoading:true
    })
    wx.showLoading({
      title: '数据加载中...',
    })
wx.request({
  usl: 'http://www.quantnn.cn/forum.php',
  method:'get',
  success:({data:res})=>{
    this.setData({
      colorList:[...this.data.colorList,...res.data]
    })
  },
  complete:()=>{
    wx.hideLoading()
    this.setData({
      isLoading:false
    })
  }
})
    },

  onLoad: function (options) {
    const that = this
    this.bindViewTap()
    this.getTopics()
    this.getLabels()
		myRequest.getData().then(res => {
			const {guess,hotRecommends} = res.data
			that.setData({
				showitem: true,
				guess: guess.list.slice(0, 3),
				xiaoshuocontent: hotRecommends.list[0].list,
				xiangshengcontent: hotRecommends.list[2].list,
				tuokocontent: hotRecommends.list[4].list
			})
		}).catch(err => {
			console.log('error :>> ', err);
			that.setData({
				showitem: false
			})
    });
    console.log(options);
    var obj = {};
    console.log(obj);
    if(options.title){
      obj.title = options.title
    }
    if(options.nofixed){
      obj.fixed = false
    }
    if(options.toggleBarShow){
      obj.toggleBarShow = false;
    }
    if (options.backStyle) {
      obj.backStyle = options.backStyle;
    }
    if (options.backHomeEvent) {
      obj.backHomeEvent = false;
    }
    if (options.backEvent) {
      obj.backEvent = false;
    }
    this.setData(obj);
  },
  //下拉刷新
  onPullDownRefresh:function(){
    const labelId = this.data.labelId
    this.getLabels()

    if (labelId == -1) {
      this.getTopics()
    } else {
      this.getTopics(1, labelId)
    }
    wx.stopPullDownRefresh()
    // 振动交互
    wx.vibrateShort()

  },
  //上拉触底
  onReachBottom: function(){
    if    (this.data.isLoading) return
  this.getColors()
  const labelId = this.data.labelId
  const page = this.data.page
  this.setData({
    loading: true
  })
  if (labelId == -1) {
    this.getTopics(page + 1)
  } else {
    this.getTopics(page + 1, labelId)
  }
  },
	//轮播图改变事件
	swiperChange: function (e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
  },
  // 生命周期函数 次渲染完成
    onReady: function () {
  },

	goToBangDan: function () {
		wx.navigateTo({
			url: '/pages/index/bangdan/bangdan',
		})
  },
	gotoDetails(e) {
		const url = e.currentTarget.dataset.coverimg;
		const title = e.currentTarget.dataset.title;
		wx.navigateTo({
			// 页面传参
			url: '/pages/details/details?url=' + url + '&title=' + title,
		})
  },

  gotoDetail(event) {
    wx.navigateTo({
      url: "/pages/topic-detail/index?topicId=" + topicId
    })
  },

clickCate(e){
  console.log(e)
  this.setData(
  {  cateActive: e.currentTarget.dataset.index
  })
  },
  goToYanBao: function(options){
    wx.navigateTo({
      url: '/pages/yanbao/yanbao'
    })
  },
  goToInstructions: function(options){
    wx.navigateTo({
      url: '/pages/instructions/instructions'
    })
  },
  goToVideoLessons: function(options){
    wx.navigateTo({
      url: '/pages/videolessons/videolessons'
    })
  },
  goToSelectStock: function(options){
    wx.navigateTo({
      url: '/pages/selectstock/selectstock'
    })
  },
  goToSelectTime: function(options){
    wx.navigateTo({
      url: '/pages/selecttime/selecttime'
    })
  },
  goToAILab: function(options){
    wx.navigateTo({
      url: '/pages/AILab/AILab'
    })
  },

  bindViewTap: function(e) {
    wx.request({
      method: "GET",
      url: 'http://www.quantnn.cn/',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res)
      }
    })
  },
  touchstart(e) {
    // this.data.touchStartY = e.changedTouches[0].clientY;
    this.setData({ touchStartY: e.changedTouches[0].clientY });
  },
  touchmove(e) {
    if(!this.data.toggleBarShow){
    	return;
    }
    console.log(this.data.touchStartY - e.changedTouches[0].clientY, e.changedTouches[0].clientY);
    if ((e.changedTouches[0].clientY - this.data.touchStartY) > 0 && (e.changedTouches[0].clientY - this.data.touchStartY) > 3) {//向上滚动
      this.selectComponent("#navigationBar").toggleShow();
    }
    if ((e.changedTouches[0].clientY - this.data.touchStartY) < 0 && (this.data.touchStartY - e.changedTouches[0].clientY) > 30) {//向下滚动
      this.selectComponent("#navigationBar").toggleHide();
    }
  },
  onPageScroll(e){
    // console.log(e.scrollTop, e.scrollTop - this.data.touchStartY);
   if (e.scrollTop < 10) {//判断向上滚动顶部
      // this.setData({ touchStartY: e.scrollTop });
      this.selectComponent("#navigationBar").toggleShow();
    }
  },
  onShareAppMessage(res){
    return {
      title: '分享标题',
      path: '/exmaple/child?title=来自分享页'
    }
  },
/**
   * 标签切换
   */
  onTagTap(event) {
    const labelId = this.data.labelId
    const currLabelId = event.currentTarget.dataset.label

    if (labelId == currLabelId) {
      this.getTopics(1, -1)
      this.setData({
        labelId: -1
      })
    } else {
      this.getTopics(1, currLabelId)
      this.setData({
        labelId: currLabelId,
      })
    }

    // 如果显示下拉区则滚动Tag
    if (this.data.showPopup) {
      this.setData({
        toTag: "tag_" + currLabelId
      })
    }
  },

  /**
   * 点击显示或隐藏全文
   */
  onFlodTap(event) {
    const index = event.target.dataset.index
    let topics = this.data.topics

    if (topics[index].flod) {
      topics[index].flod = false
    } else {
      topics[index].flod = true
    }
    this.setData({
      topics: topics
    })
  },

  /**
   * 展开操作菜单
   */
  onMoreTap(event) {
    const topicIndex = event.currentTarget.dataset.index
    let actionList = [{
      name: "分享",
      color: "#666",
      openType: "share"
    }, {
      name: "举报",
      color: "#666"
    }]

    if (this.data.userId == this.data.topics[topicIndex].user.id || this.data.isAdmin) {
      actionList.push({
        name: "删除",
        color: "#d81e05"
      })
    }

    this.setData({
      actionList: actionList,
      showAction: true,
      topicIndex: topicIndex
    })
  },

  /**
   * 关闭操作菜单
   */
  onCancelSheetTap(e) {
    this.setData({
      showAction: false
    })
  },

  /**
   * 点击操作菜单按钮
   */
  onActionItemtap(event) {
    const index = event.detail.index

    if (index == 1) {
      // 举报话题
      this.reportTopic()
    }
    if (index == 2) {
      // 删除话题
      this.deleteTopic()
    }
  },

  /**
   * 删除话题
   */
  deleteTopic() {
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确定要删除该话题？",
      success: (res) => {
        if (res.confirm) {
          const topicId = this.data.topics[this.data.topicIndex].id
          const url = api.topicAPI + topicId + "/"

          wxutil.request.delete(url).then((res) => {
            if (res.code == 200) {
              this.getTopics(this.data.page, this.data.labelId)

              wx.lin.showMessage({
                type: "success",
                content: "删除成功！"
              })
            } else {
              wx.lin.showMessage({
                type: "error",
                content: "删除失败！"
              })
            }
          })
        }
      }
    })
  },

  /**
   * 举报话题
   */
  reportTopic() {
    wx.lin.showDialog({
      type: "confirm",
      title: "提示",
      content: "确定要举报该话题？",
      success: (res) => {
        if (res.confirm) {
          const topicId = this.data.topics[this.data.topicIndex].id
          const url = api.topicAPI + "report/"
          const data = {
            topic_id: topicId
          }

          wxutil.request.post(url, data).then((res) => {
            if (res.code == 200) {
              wx.lin.showMessage({
                type: "success",
                content: "举报成功！"
              })
            } else {
              wx.lin.showMessage({
                type: "error",
                content: "举报失败！"
              })
            }
          })
        }
      }
    })
  },

  /**
   * 展开或收起弹出层
   */
  togglePopup() {
    this.setData({
      showPopup: !this.data.showPopup
    })
  },

  /**
   * 点击编辑
   */
  onEditTap() {
    if (app.globalData.userDetail) {
      wx.navigateTo({
        url: "/pages/topic-edit/index"
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/index"
      })
    }
  },

  nothingTodo() { },

  /**
   * 点赞或取消点赞
   */
  onStarTap(event) {
    const index = event.currentTarget.dataset.index
    let topics = this.data.topics

    const url = api.starAPI
    const data = {
      topic_id: topics[index].id
    }

    wxutil.request.post(url, data).then((res) => {
      if (res.code == 200) {
        const hasStar = topics[index].has_star
        topics[index].has_star = !topics[index].has_star

        if (hasStar) {
          topics[index].star_count--
        } else {
          topics[index].star_count++
        }

        this.setData({
          topics: topics
        })
      }
    })
  },

  /**
   * 跳转话题详情页
   */
  gotoDetail(event) {
    const index = event.currentTarget.dataset.index
    const topicId = event.currentTarget.dataset.id
    let topics = this.data.topics
    topics[index].click_count++;
    this.setData({
      topics: topics
    })
    wx.navigateTo({
      url: "/pages/topic-detail/index?topicId=" + topicId
    })
  },

  /**
   * 点击评论跳转话题详情页
   */
  onCommentTap(event) {
    const topicId = event.currentTarget.dataset.id
    wx.navigateTo({
      url: "/pages/topic-detail/index?focus=true&topicId=" + topicId
    })
  },

  /**
   * 跳转到用户名片页
   */
  gotoVisitingCard(event) {
    if (app.globalData.userDetail) {
      const userId = event.target.dataset.userId
      wx.navigateTo({
        url: "/pages/visiting-card/index?userId=" + userId
      })
    } else {
      wx.navigateTo({
        url: "/pages/auth/index"
      })
    }
  },

  onShareAppMessage(res) {
    if (res.from == "button") {
      const topicIndex = this.data.topicIndex
      const topics = this.data.topics
      let imageUrl = null

      if (topics[topicIndex].images) {
        imageUrl = topics[topicIndex].images[0]
      }
      if (topics[topicIndex].video) {
        imageUrl = topics[topicIndex].video.cover
      }

      return {
        title: topics[topicIndex].content,
        imageUrl: imageUrl,
        path: "/pages/topic-detail/index?topicId=" + topics[topicIndex].id
      }
    }
    return {
      title: "主页",
      path: "/pages/topic/index"
    }
  },

  /**
   * 返回按钮触发事件
   * @param {Object} e 事件对象
   */
  backEvent(e){
    // 这里可以写点击返回按钮相关的业务逻辑，下面逻辑提供参考
    let self = this;
    wx.showModal({
      title: '提示，触发返回按钮事件',
      content: '确定要退出当前页面吗？',
      success(res) {
        res.confirm && self.selectComponent('#navigationBar').runBack();//这里之所以调用了组件内部的返回上一页的方法，因为里面有判断逻辑，不想调用可以自行处理
      }
    })
  },
  /**
   * 返回按钮触发事件
   * @param {Object} e 事件对象
   */
  backHomeEvent(e) {
    // 这里可以写点击返回首页按钮相关的业务逻辑，下面逻辑提供参考
    let self = this;
    wx.showModal({
      title: '提示，触发返回首页按钮事件',
      content: '确定要退出当前页面吗？',
      success(res) {
        res.confirm && self.selectComponent('#navigationBar').runBackHome();//这里之所以调用了组件内部的返回首页的方法，因为里面有判断逻辑，不想调用可以自行处理
      }
    })
  }


})

