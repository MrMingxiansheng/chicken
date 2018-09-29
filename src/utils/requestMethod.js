
let serverPath = '47.96.113.195/'
export function get(url,data) {
  wx.showLoading({
        title: '加载中',
        })
    return new Promise((resolve,reject) => {
        wx.request({
              url: serverPath + url   , // 拼接完整的url
              data: data,
              method:'GET',
              header: {
                  'content-type': 'application/json'
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