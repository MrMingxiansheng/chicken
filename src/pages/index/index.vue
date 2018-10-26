<template>
  <div id="app">
    <div>
      <page></page>
    </div>
    <topswiper :tops="tops"></topswiper>
    <div class="Hot">
      <hot :item="site" v-for="site in sites" :key="site.id"></hot>
    </div>
    <div class="mask" v-if="show">
      <img src="../../../static/images/close.png" @click="closeMask()">
      <div class="notice">
        <div class="text1">微信快速登录</div>
        <div class="text2">
          <div>点击下方"微信登录"按钮进行登录,登录后您可以:</div>
          <div>1.</div>
          <div>2.</div>
          <div>3.</div>
        </div>
      </div>
      <button v-if="true" open-type="getUserInfo" @getuserinfo="handleUserInfo">微信登录</button>
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
            imgSrc: '/static/images/ad1.png'
          },
          {
            imgSrc: '/static/images/ad2.png'
          },
          {
            imgSrc: '/static/images/ad3.png'
          }
        ],
        show:true
      }
    },
    created(){
      let that = this
      wx.getStorage({
        key:'myDetail',
        success(){
          that.show = false
        },
        fail(){
          that.show = true
        }
      })
    },
    onLoad(){
      let that = this
      that.queryRealEstate()
     
    },

    // 下拉刷新回调接口
    onPullDownRefresh: function () {
      let that = this
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
                console.log('首页下拉刷新成功')
              }
            })
          }
        })
      })
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
      reSetMyDetail(data) {
        wx.setStorage({
          key: 'myDetail',
          data: data,
        })
      },
      closeMask(){
        this.show = false
      },

      handleUserInfo(e) {
        console.log('点击登录')
        let that = this
        if (e.mp.detail.rawData) {
          that.show = false
          let temp = {}
          temp.user_name = e.mp.detail.userInfo.nickName
          temp.head_url = e.mp.detail.userInfo.avatarUrl
          wx.getStorage({
            key: 'open_id',
            success(res) {
              temp.open_id = res.data
              let param = {
                'db': 'WpUserModel',
                'model': 'edit',
                'item': JSON.stringify(temp),
                'items': JSON.stringify(temp)
              }
              that.$get('api/update', param).then(function (res) {
                console.log('登录后的返回', res)
                that.$get('api/queryUserDetail',{user_id:res.data.id}).then(function(res){
                  wx.setStorage({
                    key: 'myDetail',
                    data: res.data,
                    success(){
                      console.log('<myDetail>缓存设置成功')
                    }
                  })
                })
              })
            }
          })
        }
      },

    }//methods下括号
  }

</script>

<style scoped>
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    background-color: #fff;
  }
  .mask img{
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    right: 50rpx;
    top: 50rpx;
    z-index: 1000;
  }
  .mask .notice{
    margin-top: 400rpx;
  }
  .mask button{
    background-color: #ffe144;
    width: 500rpx;
    height: 60rpx;
    font-size: 15px;
    line-height: 60rpx;
  }
  .notice .text1{
    text-align: center;
  }
  .notice .text2{
    font-size: 13px;
    color: rgb(137, 145, 150);
    width: 600rpx;
    margin: 50rpx auto;
  }
</style>
