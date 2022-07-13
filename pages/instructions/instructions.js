// pages/instructions/instructions.js

Page({
  data: {
    list:[],
    isLoadInterface: false,
    nomore: 0,
    page:1,
    totalpage:0,//总页数
    totalcount:0,//总行数
    condition:null
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var obj=JSON.parse(options.data);
    this.setData({
      condition:obj
    })
 
    this.getList();
  },
//获取数据
  getList: function() {
    let that=this;
    var lastList = that.data.list;
    var pagestr = that.data.page;
    var conditionobj=that.data.condition;
    console.log('查询条件:第'+pagestr+'页');
    utils.requestunion({
      url: 'quantnn.cn/instructions/',
      method: 'POST',
      data: {
        'page': pagestr,
        'customid': conditionobj.companyid,
        'customname': conditionobj.companyname,
        'goodsid': conditionobj.goodsid,
        'datestr':conditionobj.date
      }})
      .then((res) => {     
        var obj=res.data;
        console.log(obj)       
        if(obj.code==0){
        //debugger; 
          var newList = lastList.concat(obj.data.sadoclist);//concat函数为合并数组
            that.setData({
                list:newList,
                totalcount:obj.data.totalcount,
                totalpage:obj.data.totalpage,
                isLoadInterface: false
            })          
        }
        else{
          utils.alert(obj,that);
          that.setData({
                            isLoadInterface: false
                        })
        }       
      })
      .catch((res) => { 
        var obj=res.data;
        utils.alerterror(obj.msg,that);
        console.log('catch'+res)
        that.setData({
          isLoadInterface: false
            })
       })
  },
  // 加载下一页数据
  nextDataPage: function () {
    let that=this;
    
    if (!that.data.isLoadInterface) {//防止在接口未执行完再次调用接口
      if (that.data.page * 1 + 1 <= that.data.totalpage) {
        that.setData({
          isLoadInterface: true,
          page: that.data.page * 1 + 1
        })
        console.log('加载第'+that.data.page+'页');
        that.getList();
      } else {
        //如果大于总页数停止请求数据
        that.setData({
          nomore: 1
        })
        console.log("没有更多了");
      }      
    }
  },
    //获取文章详细内容
    getDetail(url) {    
      var that = this;
      var type = "text/html";
      app.utils.get(url, {}, type).then(res => { 
          // console.log(res);
          var html = res;
          var regContent = /id=\"cb_post_title_url\".*?>([\s\S]*?)<\/a>[\s\S]*?id=\"cnblogs_post_body\">([\s\S]*?)<\/div><div\s*id=\"MySignature\">/igm
          var matchArr;
          if ((matchArr = regContent.exec(html))) {
              var detail = {
                id: url,
                title : matchArr[1],   //titile
                content : matchArr[2],  //content
              };
  
              that.setData({
                detail:detail
              });
              WxParse.wxParse('article', 'html', detail.content, that, 5);              
          };
      });
    }
 
})
