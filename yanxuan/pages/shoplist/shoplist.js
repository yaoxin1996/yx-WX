// pages/item/item.js
Page({
  data: {
    pin:[],
    shopList:[],    //保存数据
    pageIndex:0,    //当前页码
    pageSize:8      //每页大小数量
  },


  loadMore:function(){
    //加载数据
    wx.request({
      url:"http://127.0.0.1:3000/index",
      data:{
        pno:++this.data.pageIndex,
        pageSize:this.data.pageSize},
        success:(res)=>{
          //console.log(res.data.data)
          //判断是否有更多数据
          var pageCount=res.data.pageCount;
          if(this.data.pageIndex>=pageCount){
            this.setData({
              hasMore:false
            })
          }
          //拼接数组
          var rows=this.data.shopList.concat(res.data.data);
          this.setData({
            shopList:rows
          })
        }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.request({
      url:"http://127.0.0.1:3000/pin",
      success:(res)=>{
        //console.log(res.data);
        this.setData({
          pin:res.data
        })
      }    
    });
    this.loadMore();
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

  /*页面相关事件处理函数--监听用户下拉动作*/
  onPullDownRefresh: function () {
    //console.log("下拉")
    //显示第一页数据
    this.setData({
      pageIndex:0,
      shopList:[],
      hasMore:true
    })
    //加载更多
    this.loadMore();
    //停止下拉动作多次执行
    wx.stopPullDownRefresh()
  },

  /*页面上拉触底事件的处理函数*/
  onReachBottom: function () {
    //console.log("上拉")
    this.loadMore();
  },

  /*用户点击右上角分享*/
  onShareAppMessage: function () {

  },
  showDetail:function(e){
    //自定义方法
    var pid=e.target.dataset.pid;
    //console.log(pid);
    wx.navigateTo({
      url:"../detail/detail?pid="+pid
    })
  },
  msg:function(){
    wx.switchTab({
      url:"../msg/msg"
    })
  }

})
