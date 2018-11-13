<template>
  <div id="app">
    <div>
      <page></page>
    </div>
    <topswiper :tops="tops"></topswiper>
    <div class="Top">
      <top :item="site" v-for="site in five" :key="site.id"></top>
    </div>
    <div class="Hot">
      <hot :item="site" v-for="site in sites" :key="site.id"></hot>
    </div>
    <div class="mask" v-if="show">
      <img src="../../../static/images/close.png" @click="closeMask()">
      <button v-if="true" open-type="getUserInfo" @getuserinfo="handleUserInfo">微信登录</button>
      <div class="span">
        <mianze></mianze>
      </div>
    </div>
  </div>
</template>

<script>
  //导入组件
  import hot from "@/components/hot"
  import page from "@/components/page"
  import topswiper from "@/components/topSwiper"
  import top from "@/components/top"
  import mianze from "@/components/mianze"
  export default {
    components: {
      page,
      hot,
      topswiper,
      top,
      mianze
    },
    data() {
      return {
        sites: [],
        tops: [],
        five: [],
        show: ''
      }
    },
    created() {
      let that = this
      wx.getStorage({
        key: 'user',
        success() {
          that.show = false
        },
        fail() {
          that.show = true
        }
      })
    },
    onLoad(option) {
      let that = this
      that.queryRealEstate()
      if (option.tag) {
        wx.navigateTo({
          url: '/pages/qwb/main?tag=' + option.tag
        })
      } else if (option.realEstateId) {
        wx.navigateTo({
          url: '/pages/counter/main?realEstateId=' + option.realEstateId
        })
      }
    },

    // 下拉刷新回调接口
    onPullDownRefresh() {
      let that = this
      that.$get('api/queryRealEstateList').then(function (res) {
        that.sites = []
        res.data.splice(0, 4)
        wx.setStorage({
          key: 'queryRealEstateList',
          data: res.data,
          success() {
            wx.stopPullDownRefresh({
              success() {
                console.log('刷新成功')
              }
            })
          }
        })
        res.data.splice(0, 5)
        for (let i = 0; i < res.data.length; i++) {
          that.sites.push(res.data[i])
        }
      })
    },
    methods: {
      queryRealEstate() {
        let that = this
        that.$get('api/queryRealEstateList').then(function (res) {
          that.tops = []
          that.sites = []
          that.five = []
          res.data.splice(0, 1)
          let tops = res.data.splice(0, 3)
          that.tops = [{
              imgSrc: tops[0].real_estate_area + '?date=' + JSON.stringify(new Date()),
              adSrc: tops[0].real_estate_name
            },
            {
              imgSrc: tops[1].real_estate_area + '?date=' + JSON.stringify(new Date()),
              adSrc: tops[1].real_estate_name
            },
            {
              imgSrc: tops[2].real_estate_area + '?date=' + JSON.stringify(new Date()),
              adSrc: tops[2].real_estate_name
            },
          ]
          wx.setStorage({
            key: 'queryRealEstateList',
            data: res.data,
            success: function (res) {
              console.log('设置楼盘列表缓存成功')
            }
          })
          that.five = res.data.splice(0, 5)
          for (let i = 0; i < res.data.length; i++) {
            that.sites.push(res.data[i])
          }
        })
      },

      closeMask() {
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
                that.$setStorage('user', res.data)
              })
            }
          })
        }
      },

    } //methods下括号
  }

</script>

<style scoped>
  .toReal {
    display: flex;
    flex-direction: row;
    margin-top: 10rpx;
  }

  .q {
    text-align: center;
    width: 132rpx;
    height: 132rpx;
    margin-left: 15rpx;
  }

  .Top {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 720rpx;
    margin: 20rpx 15rpx 0 15rpx;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 5;
    left: 0;
    top: 0;
    background-color: #fff;
  }

  .mask img {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    right: 50rpx;
    top: 50rpx;
    z-index: 10;
  }

  .mask .notice {
    margin-top: 200rpx;
  }

  .mask button {
    background-color: #ffe144;
    width: 500rpx;
    height: 60rpx;
    font-size: 15px;
    line-height: 60rpx;
    margin-top: 300rpx;
  }

  .notice .text1 {
    text-align: center;
  }

  .notice .text2 {
    font-size: 13px;
    color: rgb(137, 145, 150);
    width: 600rpx;
    margin: 50rpx auto;
  }

</style>
