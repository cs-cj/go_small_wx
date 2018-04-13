//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    articles_list:[],//文章列表
    topics_list: [],//主题列表
    statistics_datas:[]//统计数据
  },
  onLoad: function (options) {
    var that = this;
    //请求统计数据
    wx.request({
      url:app.globalData.url+'stat/site',
      method:'GET',
      success:function(res){
        var result=res.data.data;
        that.setData({
          statistics_datas:result
        })
      }

    });
    
    //请求文章列表数据
    wx.request({
      url: app.globalData.url +'articles',
      method: "GET",
      success:function(res){      
        var result = res.data.data.articles;
        // console.info(res.data.data)
        // console.info(result)

        var arr=[];
        for (var i = 0; i < 5; i++) {//默认展示前5条数据
          result[i].tags = result[i].tags.split(",");
          arr.push(result[i])
        }
        that.setData({
          articles_list: arr
        })

      }
    });

    //请求主题列表数据
    wx.request({ 
      url: app.globalData.url + 'topics',
      method: "GET",
      success: function (res) {       
        var result = res.data.data.topics;
        // console.info(res.data.data)
        // console.info(result)
        var str = "http";
        var img_url;//声明头像路径
        var arr=[];
        for (var i = 0; i < 5; i++) {//默认展示前5条数据
          img_url= result[i].user.avatar;//获取头像路径          
          if(img_url.indexOf(str)==-1){//如果头像路径中没有http字段，则图片无效
            result[i].flag=false;//false表示显示默认图片
          }else{ 
            result[i].flag = true;
          }
          arr.push(result[i])
        }
      
        that.setData({
          topics_list: arr
        })

      }
    })

  },
  onShareAppMessage: function (res) {//设置该页面的转发信息
    return {
      // title: '',
      path: '/pages/index/index',
      success: function (res) {
        wx.showShareMenu({//显示当前页面的转发按钮
          withShareTicket: true
        })
      }
    }
  }
 
})

// Page({
//   data: {
//     // motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
