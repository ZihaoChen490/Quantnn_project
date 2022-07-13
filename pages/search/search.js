Page({
	data: {
		searchHistory: [],
		hotData: [
			{ title: "Model", icon: "icon-jiantouUp", color: "text-orange" },
			{ title: "CNN Model", icon: "icon-jiantouUp", color: "text-red" },
			{ title: "RNN Model", icon: "icon-jiantouDown", color: "text-green" },
			{ title: "Transformer", icon: "icon-jiantouUp", color: "text-red" },
			{ title: "Bert", icon: "icon-jiantouDown", color: "text-red" },
		]
	},
	/**
	 * 搜索事件
	 * @param {Object} e 
	 */
	search(e){
		this.setData({
			searchHistory: [...this.data.searchHistory,e.detail.value]
		})
	},
	/**
	 * 取消搜索事件
	 */
	cancelSearch(){
		wx.navigateBack({
			delta: 1,
		})
	},
	/**
	 * 清空历史记录
	 */
	clearHistory(){
		this.setData({
			searchHistory: []
		})
	}
})