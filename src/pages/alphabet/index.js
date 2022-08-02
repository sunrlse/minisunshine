const app = getApp()
// const Util = require('../../utils/util.js')
// let hostN = "https://xxxxxxx.com"
// const { imageProPath } = require('../../utils/imageUrlUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: imageProPath,
    placeholder: ' 请输入车辆品牌 ',
    inputValue: '',//搜索值
    onsearch: false,
    searchResult: [],//搜索结果
    searchcarlist: [],//所有品牌数组
    recommendList: [],//热门品牌数组
    id: 'hot',//需要滑动到的ID
    highlight: 'hot',//当前高亮字母
    hoverText: '',//手指放拖动Navi时左侧显示的气泡
    naviList: ['hot', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],//Navi数组
    carlist: {},//所有品牌按类型分类对象
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initBrand();
  },
  /**
  * 初始化品牌数据
  */
  //初始化车辆品牌
  async initBrand() {
    try {
      wx.showLoading({
        title: '加载中',
      })
      // let { data } = await Util.httpRequest({
      //   url: `${hostN}/car/getCarBrands`,
      //   method: 'get',
      // })
      let carlist = {}
      this.data.naviList.slice(1).forEach((key, index) => {
        carlist[key] = [
          { brandId: key + '0', name: 'new' + key + '0' },
          { brandId: key + '1', name: 'new' + key + '1' },
        ]
      })
      // if (data.code === 10200) {
        this.setData({
          carlist: carlist,
          // recommendList: hotBrands
        })
      // }

      wx.hideLoading({
        success: (res) => { },
      })
    } catch (error) {
      wx.showToast({
        title: error.errMsg,
        icon: 'none'
      })
      wx.hideLoading({
        success: (res) => { },
      })
    }
  },
  /**
  * 滑动触发（设置右侧导航高亮）
  */
  scrollView(e) {
    let that = this;
    this.data.naviList.forEach(item => {
      console.log(item)
      wx.createSelectorQuery().select(`#${item}`).boundingClientRect(function (rect) {
        if (-rect.top <= rect.height && (rect.bottom - 71) > 0 && rect.bottom <= (rect.height + 71)) {
          that.setData({
            highlight: rect.id
          })
        } else { }
      }).exec()
    });
  },
  /**
   * 点击搜索栏触发
   */
  onfocus(e) {
    this.setData({
      placeholder: ''
    })
    let searchcarlist = []
    for (const key in this.data.carlist) {
      if (this.data.carlist.hasOwnProperty(key)) {
        const element = this.data.carlist[key];
        searchcarlist = searchcarlist.concat(element)
      }
    }
    this.setData({
      searchcarlist: searchcarlist
    })
  },
  /**
   * 取消搜索触发
   */
  cancelInput() {
    this.setData({
      onsearch: false,
      inputValue: '',
      placeholder: ' 请输入车辆品牌 ',
    })
  },
  /**
   * 搜索时触发
   */
  input(e) {
    let inputvalue = e
    if (inputvalue.detail.value === '') {
      this.setData({
        searchResult: []
      })
      return
    }
    let rep = new RegExp(inputvalue.detail.value)
    let fiterText = this.data.searchcarlist.filter((e) => {
      return rep.test(e.name)
    })
    this.setData({
      searchResult: fiterText
    })
  },
  /**
   * 用手指在右侧导航栏滑动时触发
   */
  touchStart(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      id: e.currentTarget.dataset.record,
    })
  },
  touchEnd(e) {
    this.setData({
      hoverText: '',
    })
  },
  touchMoveNavi(e) {
    if (e.changedTouches[0].clientY <= 50 || e.changedTouches[0].clientY >= 505) {
      this.setData({
        hoverText: '',
      })
      return
    }
    this.setData({
      id: this.data.naviList[Math.floor((e.changedTouches[0].clientY - 65) / 18)],
      hoverText: this.data.naviList[Math.floor((e.changedTouches[0].clientY - 65) / 18)],
    })
  }

})
