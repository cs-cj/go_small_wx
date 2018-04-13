const app = getApp();
Page({
  data: {
    error:"",
    isShow: true,
    isShow1:true,
    password:true,
    password1:true
  },
  formSubmit:function(e){
    console.log(e)
    console.log(app.globalData.unbind_token)
    // console.log(typeof JSON.stringify(app.globalData.userInfo))
    // console.log(JSON.stringify(app.globalData.userInfo))
    var that=this;
    if(e.detail.value.account==""){
    that.setData({
      error:"微信昵称不能为空"
    })
    return;
    } else if (!(/^[a-zA-Z0-9_]{4,20}$/.test(e.detail.value.account))){
      that.setData({
        error: "微信昵称格式错误，请重新输入"
      })
      return;
    }else if (e.detail.value.email==""){
      that.setData({
        error: "邮箱不能为空"
      })
      return;
    } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(e.detail.value.email))) {
      that.setData({
        error: "邮箱格式错误，请重新输入"
      })
      return;
    }else if (e.detail.value.psd == "") {
      that.setData({
        error: "密码不能为空"
      })
      return;
    } else if (!(/^[a-zA-Z0-9]{6,16}$/.test(e.detail.value.psd))){
      that.setData({
        error: "密码格式有误，请重新输入"
      })
      return;
    }else if (e.detail.value.psd1 == "") {
      that.setData({
        error: "确认密码不能为空"
      })
      return;
    } else if (e.detail.value.psd != e.detail.value.psd1){
      that.setData({
        error: "两次输入的密码不一致，请确认后再输入"
      })
      return;
    }else{
      that.setData({
        error: ""
      })
    }
    wx.request({
      url: app.globalData.url + 'wechat/register',
      data: {
        unbind_token: app.globalData.unbind_token,
        username: e.detail.value.account,
        email: e.detail.value.email,
        passwd: e.detail.value.psd,
        pass2: e.detail.value.psd1,
        userInfo: JSON.stringify(app.globalData.userInfo)
      },
      method: 'post',
      header: {
        //"content-type":"application/json"
         "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if(res.data.code==0){
          wx.switchTab({
          url: '../login/login'
        })
        } else if (res.data.code == 1 && res.data.msg=="无效请求!"){
          that.setData({
            error: "该账号已注册过"
          })
        }
        
      }
    })
  },
  isHiddenPsd: function (e) {
    var that = this;
    that.setData({
      isShow: !that.data.isShow,
      password: !that.data.password
    })
  },
  isHiddenPsd1: function (e) {
    var that = this;
    that.setData({
      isShow1: !that.data.isShow1,
      password1: !that.data.password1
    })
  },
  onLoad: function (options) {
  
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})