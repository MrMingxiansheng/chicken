<template>
  <div id="app">
    <!-- <i-notice-bar icon="systemprompt" loop>
      小鸡评房正在准备评测未来悦，请大家持续关注！小鸡评房正在准备评测未来悦，请大家持续关注！
    </i-notice-bar> -->
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
    },
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
    onLoad(){
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
      that.queryRealEstate()
    },

    // 下拉刷新回调接口
    onPullDownRefresh: function () {
      let that = this
    setTimeout(function()
      {
      that.sites = []
      that.$get('api/queryRealEstateList').then(function(res){
        that.sites = res.data
        console.log('sites',res.data)
        wx.setStorage({
          key: 'queryRealEstateList',
          data: res.data,
          success: function (res) {
            wx.stopPullDownRefresh({
              success(){
                console.log('刷新成功')
              }
            })
          }
        })
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },1500)
    },
    methods: {
      queryRealEstate(){
        let that = this
        that.$get('api/queryRealEstateList').then(function (res) {
          console.log('查询楼盘列表',res.data)
          that.sites = res.data
          wx.setStorage({
            key: 'queryRealEstateList',
            data: res.data,
            success: function (res) {
              console.log('设置楼盘列表缓存成功')
            }
          })
        }, function (res) {
          // failure
        })
      },


    }//methods下括号
  }

</script>

<style scoped>
 #app{
   background-color: white;
 }
</style>
