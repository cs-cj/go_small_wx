const app = getApp();
Page({
  data: {
    currentTab:0,
    topics_list: [],//主题列表
    topics_list1: [],
    topics_list2: [],
    page:1,//页码
    page1: 1,//页码
    page2: 1,//页码
    loadText: "点击加载更多...",
    hiddebtn: true,//“加载更多”按钮是否显示,默认不显示
    hiddebtn1: true,
    hiddebtn2: true,
    // disabled: false,  //“加载更多”按钮是否可用
  },
  onLoad: function () {
    var that = this;
    var page = that.data.page;
    var page1 = that.data.page1;
    var page2 = that.data.page2;
    // var obj = require('../../utils/util.js');
    // var tab ="all";
    // var tab1 = "qna";
    // var tab2 = "go";
    // var topics_list = that.data.topics_list;
    // var topics_list1 = that.data.topics_list1;
    // var topics_list2 = that.data.topics_list2;
    // var hiddebtn = that.data.hiddebtn;
    // var hiddebtn1 = that.data.hiddebtn1;
    // var hiddebtn2 = that.data.hiddebtn2;
    // obj.loadTopic(that, page, tab, topics_list,hiddebtn);//调用全局函数
    // obj.loadTopic(that, page1, tab1, topics_list1,hiddebtn1);//调用全局函数
    // obj.loadTopic(that, page2, tab2, topics_list2,hiddebtn2);//调用全局函数
    
    // console.info(topics_list)
    // console.info(topics_list1)

    //请求主题列表数据
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data:{
        tab:"all",
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        console.info(res);
        // console.info(result);
        console.info("has_more=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list=[];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list.concat(result);
        }
        if (res.data.data.has_more==true){
          page++;
          hidden_flag = false;
        }else{
          hidden_flag = true;
        }

        that.setData({
          topics_list: new_topics_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });

    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "qna",
        p: page1//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        console.info(res);
        // console.info(result);
        console.info("has_more1=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list1.concat(result);
        }
        if (res.data.data.has_more == true) {
          page1++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          topics_list1: new_topics_list,
          page1: page1,
          hiddebtn1: hidden_flag,
        })

      }
    });

    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "go",
        p: page2//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        console.info(res);
        // console.info(result);
        console.info("has_more2=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list2.concat(result);
        }
        if (res.data.data.has_more == true) {
          page2++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          topics_list2: new_topics_list,
          page2: page2,
          hiddebtn2: hidden_flag,
        })

      }
    });

  },
  loadMore:function(){
    var that = this;
    var page = that.data.page;
    // var obj = require('../../utils/util.js');
    // var tab = "all";
    // var topics_list = that.data.topics_list;
    // obj.loadTopic(that, page, tab, topics_list);//调用全局函数
 
    //请求主题列表数据
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "all",
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        // console.info(res.data.data)
        console.info(result);
        console.info("has_more=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list.concat(result);
        }
        if (res.data.data.has_more == true) {
          page++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          topics_list: new_topics_list,
          page: page,
          hiddebtn: hidden_flag,
        })

      }
    });

  },
  loadMore1: function () {
    var that = this;
    var page1 = that.data.page1;
    // var obj = require('../../utils/util.js');
    // var tab = "qna";
    // var topics_list = that.data.topics_list1;
    // obj.loadTopic(that, page, tab, topics_list);//调用全局函数
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "qna",
        p: page1//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        // console.info(res.data.data)
        console.info(result);
        console.info("has_more1=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list1.concat(result);
        }
        if (res.data.data.has_more == true) {
          page1++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          topics_list1: new_topics_list,
          page1: page1,
          hiddebtn1: hidden_flag,
        })

      }
    });
  },
  loadMore2: function () {
    var that = this;
    var page2 = that.data.page2;
    // var obj = require('../../utils/util.js');
    // var tab = "go";
    // var topics_list = that.data.topics_list2;
    // obj.loadTopic(that, page, tab, topics_list);//调用全局函数
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "go",
        p: page2//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        // console.info(res.data.data)
        console.info(result);
        console.info("has_more2=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var new_topics_list = [];//新数据
        var hidden_flag;//是否隐藏
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          new_topics_list = that.data.topics_list2.concat(result);
        }
        if (res.data.data.has_more == true) {
          page2++;
          hidden_flag = false;
        } else {
          hidden_flag = true;
        }

        that.setData({
          topics_list2: new_topics_list,
          page2: page2,
          hiddebtn2: hidden_flag,
        })

      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom:function(){
  //   var that = this;
  //   var page = that.data.page;
  //   var obj = require('../../utils/util.js');
  //   var tab = "all"
  //   obj.loadTopic(that, page, tab);//调用全局函数
  // },
  onShareAppMessage: function (res) {//设置该页面的转发信息
    return {
      // title: '',
      path: '/pages/topic/topic',
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