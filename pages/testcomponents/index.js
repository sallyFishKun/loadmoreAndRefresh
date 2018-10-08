// pages/testcomponents/index.js
let isRefesh = false; //正在下拉更多
// let isloadmore = false; //正在下载更多
let istop = true;
let pageSize = 10;
let pageIndex = 1;
let totalpages = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mydata:[],
    loadmoreing:true
  },
  /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
  onPullDownRefresh: function () {
    this.onrefresh()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        self.setData({
          wH: res.windowHeight ,
        
        });
      }
    })
    this.onrefresh()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  onrefresh() {
    isRefesh = true;
    // isloadmore = false;
    istop = false;
    wx.showToast({
      title: 'loading...',
      icon: 'loading'
    })
    let self = this;
    setTimeout(() => {
      pageIndex++;
      self.getData();

    }, 2000)
  },
  //停止刷新
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },
  /**
  * 更多
  */
  onloadmore() {
    let self = this;
    wx.showLoading({
      title: 'loading',
    })
    // isloadmore = true;

    self.setData({
      loadmoreing: true,
    })
    setTimeout(() => {
      pageIndex++;

      self.getData();

    }, 2000)
  },
  getData() {
    wx.hideLoading();
   let mydata=this.data.mydata;
    if (isRefesh) {
      this.stopPullDownRefresh();
      mydata = [0, 1, 2, 3];
    } else {
      if (mydata.length>5){
      
      }else{
        for (let i = 0; i < 5; i++) {
          mydata.push(i)
        }
      }
     
    }
    this.setData({
      loadmoreing: false,
      mydata
    })
    isRefesh = false;
    // isloadmore = false;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

 

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})