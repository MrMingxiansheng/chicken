<template>
  <div id="app">
    <i-notice-bar icon="systemprompt" loop>
      小鸡评房正在准备评测未来悦，请大家持续关注！小鸡评房正在准备评测未来悦，请大家持续关注！
    </i-notice-bar>
    <div>
      <page></page>
    </div>
    <topswiper :tops="tops"></topswiper>
    <div class="Hot">
      <hot :item="site" v-for="site in sites" :key="site.id"></hot>
    </div>
  </div>
</template>

<script>
  //导入组件
  import line from "@/components/line"
  import hot from "@/components/hot"
  import page from "@/components/page"
  import topswiper from "@/components/topSwiper"
  export default {
    components: {
      line,
      hot,
      page,
      topswiper
    }, //声明在当前组件下使用组件
    data() {
      return {
        sites: [],
        tops: [{
            imgSrc: '/static/images/timg.jpg'
          },
          {
            imgSrc: '/static/images/timg1.jpg'
          },
          {
            imgSrc: '/static/images/timg2.jpg'
          }
        ]
      }
    },
    onLoad() {
      let that = this
      wx.login({
        success: function (res) {
          let code = res.code;
          if (code) {
            console.log('获取用户登录凭证：' + code);
            // --------- 发送凭证 ------------------
            wx.request({
              url: 'http://www.xaoji.com/api/getUser',
              data: {
                code: code
              },
              success(res) {
                console.log('发送code成功', res.data)
                let msg = res.data.msg
                if (msg == 'have data') {
                  wx.setStorage({
                    key: 'key',
                    data: res.data.data[0],
                    success: function (res) {
                      console.log(res)
                    }
                  })
                } else {
                  console.log('open_id_test:', JSON.parse(res.data.data).openid)
                  wx.setStorage({
                    key: 'open_id',
                    data: JSON.parse(res.data.data).openid,
                    success: function (res) {
                      console.log(res)
                    }
                  })
                }
              }
            })
            // ------------------------------------
          } else {
            console.log('获取用户登录态失败：' + res.errMsg);
          }
        }
      });
      wx.getStorage({
        key: 'open_id',
        success: function (res) {
          if (!res.data) {
            wx.login({
              success: function (res) {
                let code = res.code;
                if (code) {
                  console.log('获取用户登录凭证：' + code);
                  wx.request({
                    url: 'http://www.xaoji.com/api/getUser',
                    data: {
                      code: code
                    },
                    success(res) {
                      console.log('发送code成功', res.data)
                      let msg = res.data.msg
                      if (msg == 'have data') {
                        wx.setStorage({
                          key: 'key',
                          data: res.data.data[0],
                          success: function (res) {
                            console.log(res)
                          }
                        })
                      } else {
                        console.log('open_id_test:', JSON.parse(res.data.data).openid)
                        wx.setStorage({
                          key: 'open_id',
                          data: JSON.parse(res.data.data).openid,
                          success: function (res) {
                            console.log(res)
                          }
                        })
                      }
                    }
                  })
                  // ------------------------------------
                } else {
                  console.log('获取用户登录态失败：' + res.errMsg);
                }
              }
            });
          }
        }
      })
      that.$get('api/queryRealEstateList').then(function (res) {
        console.log('返回数据:', res)
        that.sites = res.data
        wx.setStorage({
          key: 'queryRealEstateList',
          data: res.data,
          success: function (res) {
            console.log(res)
          }
        })
      }, function (res) {
        // failure
      })
    },
    // 下拉刷新回调接口
    onPullDownRefresh: function () {
        let that = this
        that.sites = []
        that.$get('api/queryRealEstateList').then(function (res) {
        that.sites = res.data
        wx.setStorage({
          key: 'queryRealEstateList',
          data: res.data,
          success: function (res) {
            console.log(res)
          }
        })
      }, function (res) {
        // failure
      })
    },
    methods: {}
  }

</script>

<style scoped>
  /*.timg {
    width: 750rpx;
    height: 200rpx;
  }

  .timg img {
    width: 100%;
    height: 100%;
  } */

</style>
