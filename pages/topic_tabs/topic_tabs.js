const app = getApp();
Page({
  data: {
    navbarArray: [
   {
      text: '全部',
      type: 'navbar-item-active',
      ename:"all"
    }, 
    // { 
    //   text: 'Go问与答',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: 'Go语言',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: '酷工作',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: 'Go标准库',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: 'Go开发工具',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: '求职',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: 'Go cmd 开发',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: '微服务',
    //   type: '',
    //   ename: ""
    // }, 
    // {
    //   text: 'Android',
    //   type: '',
    //   ename: ""
    // }
    ],
    navbarShowIndexArray: Array.from(Array(12).keys()),
    navbarHideIndexArray: [],
    windowWidth: 375,
    scrollNavbarLeft: 0,
    currentChannelIndex: 0,
    startTouchs: {
      x: 0,
      y: 0
    },
    channelSettingShow: '',
    channelSettingModalShow: '',
    channelSettingModalHide: true,
    articlesHide: false,
    articleContent: '',
    loadingModalHide: false,
    temporaryArray: Array.from(new Array(9), (val, index) => index + 1),

    topics_list: [],//主题列表
    tab_active:"",//当前点击的tab标签
    page: 1,//页码
    loadText: "点击加载更多...",
    hiddebtn: true,//“加载更多”按钮是否显示,默认不显示
  },
  onLoad: function () {
    this.getArticles(0);
    
    let that = this;
    //-----------
    var page = that.data.page;
    
    //请求主题列表数据
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: "all",
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var tab_list = res.data.data.tab_list;
        var arr=[];
        for (var k = 0; k < tab_list.length;k++){
          arr.push(
            {
              text: tab_list[k].name,
              type: '',
              ename: tab_list[k].ename
            }
          )
        }
        that.setData({
          navbarArray:that.data.navbarArray.concat(arr),
        })
        // console.info(that.data.navbarArray)
        // console.info("navbarShowIndexArray=" + that.data.navbarShowIndexArray)

        var result = res.data.data.topics;
        // console.info(res);
        // console.info(result);
        // console.info("has_more=" + res.data.data.has_more);
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
        });

      }
    });
    //-------------
    

    let navbarShowIndexArrayData = wx.getStorageSync('navbarShowIndexArray');
    if (navbarShowIndexArrayData) {
      this.setData({
        navbarShowIndexArray: navbarShowIndexArrayData
      });
    } else {
      this.storeNavbarShowIndexArray();
    }

    this.getArticles(0);

    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowWidth: res.windowWidth
        });
      }
    });

    let navbarArray = this.data.navbarArray;
    let navbarShowIndexArray = this.data.navbarShowIndexArray;
    let navbarHideIndexArray = [];
    navbarArray.forEach((item, index, array) => {
      if (-1 === navbarShowIndexArray.indexOf(index)) {
        navbarHideIndexArray.push(index);
      }
    });
    this.setData({
      navbarHideIndexArray: navbarHideIndexArray
    });
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  //点击tba标签函数
  onTapNavbar: function (e) {
    var that=this;
    var page = that.data.page;
    
    //数据初始化
    that.setData({
      topics_list: [],
      page: 1,
      hiddebtn: true,
    })

    this.switchChannel(parseInt(e.currentTarget.id));
    var tab_active = that.data.navbarArray[parseInt(e.currentTarget.id)].ename;
    console.info("tab=" + tab_active );
    that.setData({
      tab_active: tab_active  //  将当前点击的tab标签赋值给tab_active变量
    })

    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: tab_active,
        p: page//传页码参数，默认展示第一页
      },
      success: function (res) {
        var result = res.data.data.topics;
        console.info(res);
        // console.info(result);
        // console.info("has_more=" + res.data.data.has_more);
        var str = "http";
        var img_url;//声明头像路径
        var hidden_flag;//是否隐藏
        var new_topics_list = [];//新数据
        for (var i = 0; i < result.length; i++) {//默认展示前5条数据
          img_url = result[i].user.avatar;//获取头像路径          
          if (img_url.indexOf(str) == -1) {//如果头像路径中没有http字段，则图片无效
            result[i].flag = false;//false表示显示默认图片
          } else {
            result[i].flag = true;
          }
          // new_topics_list.push(result);
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

        // console.info(that.data.topics_list);
      }
    });      
  },
  loadMore:function (e) {
    var that = this;
    var page = that.data.page;

    //获取当前tab标签
    var tab = e.currentTarget.dataset.tab;
    // console.info("tab0="+tab)

    //请求主题列表数据
    wx.request({
      url: app.globalData.url + 'topics',
      method: "GET",
      data: {
        tab: tab,
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
  switchChannel: function (targetChannelIndex) {
    this.getArticles(targetChannelIndex);

    let navbarArray = this.data.navbarArray;
    navbarArray.forEach((item, index, array) => {
      item.type = '';
      if (index === targetChannelIndex) {
        item.type = 'navbar-item-active';
      }
    });


    this.setData({
      navbarArray: navbarArray,
      currentChannelIndex: targetChannelIndex
    });
  },
  getArticles: function (index) {
    this.setData({
      loadingModalHide: false,
      articleContent: ''
    });
    setTimeout(() => {
      this.setData({
        loadingModalHide: true,
        articleContent: this.data.navbarArray[index].text
      });
    }, 1000);
  },
  onTouchstartArticles: function (e) {
    this.setData({
      'startTouchs.x': e.changedTouches[0].clientX,
      'startTouchs.y': e.changedTouches[0].clientY
    });
  },
  onTouchendArticles: function (e) {
    let deltaX = e.changedTouches[0].clientX - this.data.startTouchs.x;
    let deltaY = e.changedTouches[0].clientY - this.data.startTouchs.y;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      let deltaNavbarIndex = deltaX > 0 ? -1 : 1;
      let currentChannelIndex = this.data.currentChannelIndex;
      let navbarShowIndexArray = this.data.navbarShowIndexArray;
      let targetChannelIndexOfNavbarShowIndexArray = navbarShowIndexArray.indexOf(currentChannelIndex) + deltaNavbarIndex;
      let navbarShowIndexArrayLength = navbarShowIndexArray.length;
      if (targetChannelIndexOfNavbarShowIndexArray >= 0 && targetChannelIndexOfNavbarShowIndexArray <= navbarShowIndexArrayLength - 1) {
        let targetChannelIndex = navbarShowIndexArray[targetChannelIndexOfNavbarShowIndexArray];
        if (navbarShowIndexArrayLength > 6) {
          let scrollNavbarLeft;
          if (targetChannelIndexOfNavbarShowIndexArray < 5) {
            scrollNavbarLeft = 0;
          } else if (targetChannelIndexOfNavbarShowIndexArray === navbarShowIndexArrayLength - 1) {
            scrollNavbarLeft = this.rpx2px(110 * (navbarShowIndexArrayLength - 6));
          } else {
            scrollNavbarLeft = this.rpx2px(110 * (targetChannelIndexOfNavbarShowIndexArray - 4));
          }
          this.setData({
            scrollNavbarLeft: scrollNavbarLeft
          });
        }
        this.switchChannel(targetChannelIndex);
      }
    }
  },
  rpx2px: function (rpx) {
    return this.data.windowWidth * rpx / 750;
  },
  showChannelSettingModal: function () {
    this.setData({
      channelSettingShow: 'channel-setting-show',
      articlesHide: true,
      channelSettingModalHide: false
    });
    setTimeout(() => {
      this.setData({
        channelSettingModalShow: 'channel-setting-modal-show'
      });
    }, 50);
  },
  hideChannelSettingModal: function () {
    this.resetNavbar();

    this.setData({
      channelSettingShow: '',
      channelSettingModalShow: ''
    });
    setTimeout(() => {
      this.setData({
        channelSettingModalHide: true,
        articlesHide: false
      });
      this.getArticles(0);
    }, 500);
  },
  hideChannel: function (e) {
    let navbarShowIndexArray = this.data.navbarShowIndexArray;
    let navbarHideIndexArray = this.data.navbarHideIndexArray;
    navbarHideIndexArray.push(navbarShowIndexArray.splice(navbarShowIndexArray.indexOf(parseInt(e.currentTarget.id)), 1)[0]);
    this.setData({
      navbarShowIndexArray: navbarShowIndexArray,
      navbarHideIndexArray: navbarHideIndexArray
    });
    this.storeNavbarShowIndexArray();
  },
  upChannel: function (e) {
    let navbarShowIndexArray = this.data.navbarShowIndexArray;
    let index = navbarShowIndexArray.indexOf(parseInt(e.currentTarget.id));
    let temp = navbarShowIndexArray[index];
    navbarShowIndexArray[index] = navbarShowIndexArray[index - 1];
    navbarShowIndexArray[index - 1] = temp;
    this.setData({
      navbarShowIndexArray: navbarShowIndexArray
    });
    this.storeNavbarShowIndexArray();
  },
  showChannel: function (e) {
    let navbarShowIndexArray = this.data.navbarShowIndexArray;
    let navbarHideIndexArray = this.data.navbarHideIndexArray;
    navbarShowIndexArray.push(navbarHideIndexArray.splice(navbarHideIndexArray.indexOf(parseInt(e.currentTarget.id)), 1)[0]);
    this.setData({
      navbarShowIndexArray: navbarShowIndexArray,
      navbarHideIndexArray: navbarHideIndexArray
    });
    this.storeNavbarShowIndexArray();
  },
  storeNavbarShowIndexArray: function () {
    wx.setStorage({
      key: 'navbarShowIndexArray',
      data: this.data.navbarShowIndexArray
    });
  },
  resetNavbar: function () {
    let navbarArray = this.data.navbarArray;
    navbarArray.forEach((item, index, array) => {
      item.type = '';
      if (0 === index) {
        item.type = 'navbar-item-active';
      }
    });
    this.setData({
      navbarArray: navbarArray,
      scrollNavbarLeft: 0
    });
  }
});
