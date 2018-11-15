// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:1,
    content:[],
    pic:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url:"http://127.0.0.1:3000/content",
      success:(res)=>{
        //console.log(res.data)
        this.setData({
          content:res.data
        })
      }
    });
    var pid=options.pid;
    wx.request({
      url:"http://127.0.0.1:3000/pic?pid="+pid,
      success:(res)=>{
        this.setData({
          pic:res.data 
        })
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  },
  addNum:function(){
    //加号
    //console.log("+")
    var n=this.data.number+1;
    if(n>99){n=99}
    this.setData({
      number:n
    })
  },
  subNum:function(){
    //减号
    //console.log("-")
    var n=this.data.number-1;
    if(n<1){n=1}
    this.setData({
      number:n
    })
  }

})