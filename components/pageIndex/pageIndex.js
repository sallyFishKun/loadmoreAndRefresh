// components/pageIndex.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isTop: { //滚动条是否在顶部
      type: Boolean,
      value: true
    }, 
    loadmoreing: { //加载中
      type: Boolean,
      value: false
    },
   
    wH: {//高度
      type: Number,
      value: 400
    },
    len:{//数据长度
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    topNum: 0,

  },

  /**
   * 组件的方法列表
   */
  methods: {
    sloadmore() {
      this.triggerEvent('onloadmore')
    },


    //滚动条到top
    doScrollTop(e) {
      let istop = this.data.isTop
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
  }
})