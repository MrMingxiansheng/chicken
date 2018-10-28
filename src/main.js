import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

let serverPath = 'https://www.xaoji.com/'
let Methods = function get(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: serverPath + url, // 拼接完整的url
      data: data,
      method: 'GET',
      header: {
        'content-type': 'x-www-form-urlencoded'
      },
      success(res) {
        resolve(res.data) // 把返回的数据传出去
      },
      fail(ret) {
        reject(ret) // 把错误信息传出去
      }
    })
  })
}

let isLogin = async function () {
  let p = new Promise((resolve, reject) => {
    wx.getStorage({
      key: 'key',
      success: function (res) {
        if(res.data.hasOwnProperty('user_name')) {
          resolve(res.data)
        } else {
          resolve('error')
        }
      }
    })
  })
  let res = await p
  console.log('8888883333',res)

  if (res === 'error') {
    return false
  } else {
    return res.id
  }
}


function sendMessage(msg){
  wx.sendSocketMessage({
    data:msg,
    success(){
      console.log('成功发送一条消息')
    }
  })
}

function setStorage(key,data){
  wx.setStorage({
    key:key,
    data:data,
    success(){
      console.log(key+'缓存设置成功')
    }
  })
}
function reSetStorage(key,data){
  wx.setStorage({
    key:key,
    data:data,
    success(){
      console.log(key+'缓存更新成功')
    }
  })
}




Vue.prototype.$isLogin = isLogin
Vue.prototype.$get = Methods
Vue.prototype.$sendMessage = sendMessage
Vue.prototype.$setStorage = setStorage
Vue.prototype.$reSetStorage = reSetStorage
const app = new Vue(App)
app.$mount()
