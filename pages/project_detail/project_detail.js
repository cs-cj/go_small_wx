const app = getApp(); 
var WxParse = require('../../utils/wxParse/wxParse.js');
var obj = require('../../utils/util.js')
Page({
  data: {
    project_detail: "",//项目详情
    comment_list: [],//回复列表
    pub_time_minutes: "",//创建/发布时间(分钟)
    pub_time_hours: "",//创建/发布时间(小时)
    pub_time_days: "",//创建/发布时间(天)
    show_minutes: true,//是否显示分钟
    show_hours: true,//是否显示小时
    like:"",
    content: "",
    project_id: "",
    isPraise: false,
    isShow: false,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    emojis: [],//qq、微信原始表情
    // nodes:'<div>dahgrae fangasd dfajg </div>',   
  },

  onLoad: function (options) {
    // this.getArticles();//调用加载中函数
    console.log(options)
    var that = this;
    var id = parseInt(options.id);
    var like = parseInt(options.like);
    var isPraise = wx.getStorageSync('isPraise');
    var like1 = wx.getStorageSync('like')
    console.info("id=" + id)
    that.setData({
      project_id: id,
      like: like
    })
    if (isPraise) {
      that.setData({
        isPraise: isPraise
      })
    }
    if (like1) {
      that.setData({
        like: like1
      })
    }

    //请求主题详情数据
    that.getComment();

    //表情包
    obj.getEmojis()
    that.setData({
      emojis: obj.getEmojis()
    })
  },
  //用户输入
  shuInput: function (e) {
    var that = this;
    that.setData({
      content: e.detail.value
    })
  },
  //点赞
  showPraise: function () {
    var that = this;
    var user = wx.getStorageSync('user');
    if (user) {
      that.setData({
        isPraise: true
      })
    } else {
      wx.showToast({
        title: '登录或注册后可点赞',
        icon: 'none',
        duration: 2000
      })
      return;
    }
  },
  //表情选择
  emojiChoose: function (e) {
    console.log(e)
    //当前输入内容和表情合并
    if (this.data.content != undefined) {
      this.setData({
        content: this.data.content + e.currentTarget.dataset.emoji
      })
    } else {
      this.setData({
        content: e.currentTarget.dataset.emoji
      })
    }

  },
  send: function (e) {
    var that = this;
    console.log(that.data.content)
    if (that.data.content == "") {
      return;
    }
    var user = wx.getStorageSync('user');
    if (user) {
      wx.request({
        url: app.globalData.url + 'comment/' + that.data.project_id,
        data: {
          objtype: parseInt(4),
          content: that.data.content,
          token: user.token
        },
        method: 'post',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          //console.log(res)
          that.getComment();
          that.setData({
            content: ""
          })
        }
      })
    } else {
      return
    }
  },
  emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      isLoad: false
    })
  },
  getComment:function(){
    var that=this;
    wx.request({
      url: app.globalData.url + 'project/detail?id=' + that.data.project_id,
      // data:{
      //   id:id
      // },
      method: "GET",
      success: function (res) {
        var result = res.data.data.project;
        // console.info(res)
        console.info(result)
        var ctime = result.ctime//创建时间
        ctime = Date.parse(ctime);//将创建时间转换为时间戳
        // console.info("ctime="+ctime)

        var now = new Date().getTime();//获取当前时间戳
        // console.info("now=" + now);

        var p_time_minutes = Math.floor((now - ctime) / (1000 * 60));//将创建/发布时间转换为分钟
        // console.info(p_time_minutes);

        if (p_time_minutes < 1) {
          p_time_minutes = 1;
          // console.info(p_time_minutes);
        }

        var p_time_hours = 0;
        var p_time_days = 0;
        var flag1 = true;
        var flag2 = true;

        if (p_time_minutes >= 60) {
          p_time_hours = Math.floor(p_time_minutes / 60);//将创建/发布时间转换为小时
          // console.info(p_time_hours);
          flag1 = false;
        }

        if (p_time_hours >= 24) {
          p_time_days = Math.floor(p_time_hours / 24);//将创建/发布时间转换为天数
          flag1 = false;
          flag2 = false;
        }
        //回复头像
        var result0 = res.data.data.replies;
        var str = "http";
        var img_url;//声明头像路径

        for (var i = 0; i < result0.length; i++) {
          img_url = result0[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1 && img_url != "") {//如果头像路径中没有http字段，则图片无效
            result0[i].flag = true;//false表示显示默认图片
            result0[i].img_url = "https://static.studygolang.com/avatar/" + img_url;
          } else {
            result0[i].flag = false;
          }
        }

        that.setData({
          // nodes: result.content,
          project_detail: result,
          comment_list: result0,
          pub_time_minutes: p_time_minutes,
          pub_time_hours: p_time_hours,
          pub_time_days: p_time_days,
          show_minutes: flag1,
          show_hours: flag2
        })
        var detail_content = result.desc;//详情内容
        // WxParse.wxParse('detail_content', 'html', detail_content, that, 5);
        WxParse.wxParse('detail_content', 'md', detail_content, that, 5);
        /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
      }
    });
  },
  onShareAppMessage: function (res) {//设置该页面的转发信息
    return {
      // title: '',
      path: '/pages/project_detail/project_detail',
      success: function (res) {
        wx.showShareMenu({//显示当前页面的转发按钮
          withShareTicket: true
        })
      }
    }
  }

})
