import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

let serverPath = 'http://www.xaoji.com/'
let Methods = function get(url,data) {
    wx.showLoading({
          title: '加载中',
          mask: true,  
          duration: 1000 
          })
      return new Promise((resolve,reject) => {
          wx.request({
                url: serverPath + url   , // 拼接完整的url
                data: data,
                method:'GET',
                header: {
                    'content-type': 'x-www-form-urlencoded'
                },
                success(res) {
                  resolve(res.data)  // 把返回的数据传出去
                },
                fail(ret) {
                  reject(ret)   // 把错误信息传出去
                }
              })
      }) 
  }
Vue.prototype.$get = Methods

const app = new Vue(App)
app.$mount()

