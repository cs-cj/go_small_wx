const app = getApp();
Page({ 
  data: {
    articles_list: [],//文章列表
    has_more: true,//是否还有更多数据
    page: 1,//页码
    loadText: "点击加载更多...",
    hiddebtn: true,//“加载更多”按钮是否显示,默认不显示
  },

  onLoad: function () {
    var that=this;
    var page = that.data.page;
    //请求文章列表数据
    wx.request({
      url: app.globalData.url + 'articles',
      method: "GET",
      data: {
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.articles;
        console.info(res.data.data)
        // console.info(result)
        var new_articles_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          result[i].tags = result[i].tags.split(",");
        }
        new_articles_list = that.data.articles_list.concat(result);

        if (res.data.data.has_more == true) {
          page++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          articles_list: new_articles_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });

  },
  loadMore: function () {
    var that = this;
    var page = that.data.page;
    console.info("page="+page);
    wx.request({
      url: app.globalData.url + 'articles',
      method: "GET",
      data: {
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.articles;
        console.info(res.data.data)
        // console.info(result)
        var new_articles_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          result[i].tags = result[i].tags.split(",");
        }
        new_articles_list = that.data.articles_list.concat(result);
        console.info("length="+new_articles_list.length)
        if (res.data.data.has_more == true) {
          page++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          articles_list: new_articles_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });
  },
  onShareAppMessage: function (res) {//设置该页面的转发信息
    return {
      // title: '',
      path: '/pages/article/article',
      success: function (res) {
        wx.showShareMenu({//显示当前页面的转发按钮
          withShareTicket: true
        })
      }
    }
  }
})
