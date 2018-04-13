var obj = require('../../utils/util.js');
const app = getApp();
Page({
  data:{ 
    user: null,//用户信息
    userInfo:""
  },
  onLoad:function(){
   var that=this;
   var user = wx.getStorageSync('user');
   console.log(user)
   that.setData({
     user:user
   })
  //  obj.loginStatus();
  //   wx.getUserInfo({
  //     success: function (res){
  //       console.log(res)
  //       that.setData({
  //         userInfo: res.userInfo
  //       })
  //     }
  //   })
  },
  login:function(){
    var that=this;
    obj.loginStatus();
    // var user = wx.getStorageSync('user');
    // that.setData({
    //   user: user
    // })
    setTimeout(function(){
      that.setData({
        user: app.globalData.user
        })
    },500)
    
  }
})