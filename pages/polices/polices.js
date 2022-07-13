//index.js
//获取应用实例
const app = getApp()
const myRequest = require('../../api/index.js');
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		imgList: [
			'/images/swiper/ad1.jpg',
			'/images/swiper/ad2.jpg',
			'/images/swiper/ad3.jpg',
			'/images/swiper/ad4.jpg',
			'/images/swiper/ad5.jpg',
			'/images/swiper/ad6.jpg',
			'/images/swiper/ad7.jpg'
		],
		navList: [{
			icon: '/images/icon_polices/huobancelve.jpg',
			events: 'goToHuoBanCeLve',
			text: ''
		},
		{
			icon: '/images/icon_polices/zizhicelve.jpg',
			events: 'goToZiZhiCeLve',
			text: ''
		},
		{
			icon: '/images/icon_polices/zhishuzhuanchang.jpg',
			events: 'goToZhiShuZhuanChang',
			text: ''
		},
		{
			icon: '/images/icon_polices/jijinrank.jpg',
			events: 'goToJiJinRank',
			text: ''
		},

		],
		swiperCurrent: 0,
		//存放轮播图数据
		swiperList:[],
	 //存放四宫格数据
		gridList:[]

	},
	onLoad: function (options) {
		const that = this
		this.getSwiperList()
		this.getGridList()
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
		})
	},
	//获取轮播图数据
	getSwiperList(){
wx.request({
	url:'https://www.quantnn.cn/',
	method:'Get',
	success:(res)=>{
	console.log(res)
	this.setData({
		swiperList:res.data
						})
	}
})},
	//获得四宫格数据
	getGridList(){
		wx.request({
			url:'https://www.quantnn.cn/GridList',
			method:'Get',
			success:(res)=>{
			console.log(res)
			this.setData({
				GridList:res.data
								})
			}
		})},
	//轮播图改变事件
	swiperChange: function (e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
	},
	goToUse: function () {
		wx.navigateTo({
			url: '/pages/polices/gotouse/gotouse',
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
	btnTapHandler(e){
	console.log(e)
	}
})
