const app = getApp();
Page({
  data: {
    currentTab: 0,
    resources_list: [],//资源列表
    has_more: true,//是否还有更多数据
    page: 1,//页码
    loadText: "点击加载更多...",
    hiddebtn: true,//“加载更多”按钮是否显示,默认不显示
  },
  onLoad: function () {
    var that = this;
    var page = that.data.page;
    wx.request({
      url: app.globalData.url + 'resources',
      method: "GET",
      data: {
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.resources;
        console.info(res)
        // console.info(result)
        var str = "http";
        var img_url;//声明头像路径
        var new_resources_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_resources_list = that.data.resources_list.concat(result);
        }
        if (res.data.data.has_more == true) {
          page++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          resources_list: new_resources_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });
  },
  loadMore: function () {
    var that = this;
    var page = that.data.page;
    console.info("page=" + page);
    wx.request({
      url: app.globalData.url + 'resources',
      method: "GET",
      data: {
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.resources;
        console.info(res.data.data)
        // console.info(result)
        var str = "http";
        var img_url;//声明头像路径
        var new_resources_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_resources_list = that.data.resources_list.concat(result);
        }
        if (res.data.data.has_more == true) {
          page++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          resources_list: new_resources_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });
  },
  onShareAppMessage: function (res) {//设置该页面的转发信息
    return {
      // title: '',
      path: '/pages/resource/resource',
      success: function (res) {
        wx.showShareMenu({//显示当前页面的转发按钮
          withShareTicket: true
        })
      }
    }
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }

  },

})