var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
let isRefesh = false; //正在下拉更多
let isloadmore = false; //正在下载更多
let istop = true;
let pageSize = 10;
let pageIndex = 1;
let totalpages = 1;
Page({
  data: {
    tabs: ["选项一", "选项二"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    wH: 500,
    mydata:[0,1,2,3],
    isTop: true, //滚动条顶部
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          wH: res.windowHeight - 60,
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  
  },
  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {

    isRefesh = true;
    isloadmore = false;
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
  stopPullDownRefresh: function () {
    wx.stopPullDownRefresh({
      complete: function (res) {
        wx.hideToast()
        console.log(res, new Date())
      }
    })
  },
  //滚动条到top
  doScrollTop(e) {
    istop = this.data.isTop
    if (e.detail.scrollTop < 10) {

      if (!istop) {
        this.setData({
          isTop: true
        })
      }
    } else {
      if (istop) {
        this.setData({
          isTop: false
        })
      }

    }
   
  },
  /**
   * 更多
   */
  loadmore(){
    let self=this;
    wx.showLoading({
      title: 'loading',
    })
    setTimeout(() => {
      pageIndex++;
      
      isloadmore = true;
      self.getData();
     
    }, 2000)
  },
  getData(){
    wx.hideLoading();
    let mydata = this.data.mydata;
    if(isRefesh){
      this.stopPullDownRefresh();
      mydata = [0, 1, 2, 3];
    }else{
     
      for (let i = 0; i < 5; i++) {
        mydata.push(i)
      }
    }
    this.setData({
      mydata
    })
    isRefesh = false;
    isloadmore = false;
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
 
});