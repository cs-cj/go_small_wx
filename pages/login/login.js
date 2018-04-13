const app = getApp();

Page({
  data: {
    errorInfo:"",
    errorInfo1: "",
    emailInfo:false,
    passInfo: false
  },
  onLoad: function (options) {
   
  },
  closeBlur:function(e){
    // var value = e.detail.value;
    // var that=this;
    // if(value==""){
    //  that.setData({
    //    errorInfo:""
    //  })
    //  return;
    // }
    // var pattern =/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    // if (pattern.test(value)){ 
    //   that.setData({
    //     errorInfo: "",
    //     emailInfo:true  
    //   })
    // }else{
    //   that.setData({
    //     errorInfo: "邮箱输入有误，请重新输入"
    //   })
    // }
  },
  closeBlur1:function(e){
    // var value = e.detail.value;
    // var that = this;
    // if (that.emailInfo==false){
    //   return;
    // };
    // if (value == "") {
    //   that.setData({
    //     errorInfo1: ""
    //   })
    //   return;
    // }
    // var pattern =/^[a-zA-Z0-9_]{6,16}$/;
    // if (pattern.test(value)){
    //   that.setData({
    //     errorInfo1: "",
    //     passInfo: true
    //   })
    // } else {
    //   that.setData({
    //     errorInfo1: "密码输入有误，请重新输入"
    //   })
    //   return;
    // }
  },
  formSubmit:function(e){
    console.log(e)
    var that=this;
    if (that.passInfo==false){
     return;
    }
    if (that.errorInfo == "" || that.errorInfo1 == ""){
    return;
    }
    // if (e.detail.value.email == "") {
    //  that.setData({
    //    errorInfo: "邮箱不能为空"
    //  })
    //   return;
    // }
    // if (e.detail.value.psd == "") {
    //   that.setData({
    //     errorInfo1: "密码不能为空"
    //   })
    //   return;
    // }
    wx.request({
      url: app.globalData.url +'wechat/login',
      data:{
        unbind_token: app.globalData.unbind_token,
        username:e.detail.value.email,
        passwd: e.detail.value.psd,
        userInfo: JSON.stringify(app.globalData.userInfo)
      },
      method: 'post',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
     success:function(res){
       console.log(res)
       if(res.data.code==0){
         app.globalData.user = res.data.data
        wx.setStorageSync('user', res.data.data)
        wx.switchTab({
           url: '../index/index'
         }) 
       } else if (res.data.code == 1 && res.data.msg=="用户名不存在"){
         that.setData({
           errorInfo: res.data.msg
         })
       } else if (res.data.code == 1 && res.data.msg=="密码错误"){
         that.setData({
           errorInfo1: res.data.msg
         })
       } else if (res.data.code == 1 && res.data.msg == "用户名为空"){
         that.setData({
           errorInfo1: '用户名不能为空'
         })
       } else if (res.data.code == 1 && res.data.msg == "用户名或邮箱存在") {
         that.setData({
           errorInfo1: '用户名已存在，可直接登录'
         })
       }
     }

    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})