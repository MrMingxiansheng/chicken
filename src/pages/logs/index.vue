<template>
  <div>

    <button v-if="!userInfo.user_name" open-type="getUserInfo" @getuserinfo="handleUserInfo">授权登录</button>

    <div class="box">
      <div class="head">
        <img :src="userInfo.head_url" class="avatarUrl" />
      </div>
      <div class="box1">
        <div class="box2">
          <div class="p1">{{userInfo.user_name}}{{identity}}</div>
          <div class="p2">{{build}}</div>
        </div>
        <div class="p3" decode="emsp">{{praise}}赞 &emsp; {{step}}踩</div>
      </div>
    </div>
    <div>
      <div class="tab">
        <div class="hd">
          <div :class="{cur:lanmu=='mes'}" @click="change('mes')">消息</div>
          <div :class="{cur:lanmu=='col'}" @click="change('col')">收藏</div>
          <div :class="{cur:lanmu=='se'}" @click="change('se')">看过</div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="mes" v-if="lanmu=='mes'">
            <message></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <collect></collect>
          </div>
          <div class="se" v-if="lanmu=='se'">
            <see></see>
          </div>
          <div class="sug" v-if="lanmu=='sug'">
            <suggest></suggest>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//  decode="emsp"设置空格
import { showSuccess } from "@/util";
import config from "@/config";
import line from "@/components/line";
import message from "@/components/message";
import collect from "@/components/collect";
import see from "@/components/see";
import suggest from "@/components/suggest";
export default {
  components: {
    line,
    message,
    collect,
    see,
    suggest
  },

    data() {
      return {
        //canIUse: wx.canIUse('button.open-type.getUserInfo'), //判断小程序的API，回调，参数，组件等是否在当前版本可用

        user: "姓名",
        identity: "(销售)",
        build: "未来悦",
        praise: "25",
        step: "3",
        lanmu: "mes",
        userInfo: {},

      }
    },
    onLoad: function () {
      let that = this
      wx.getStorage({
        //获取数据的key
        key: 'key',
        success: function (res) {
          console.log(res)
          that.userInfo = res.data
        },
        fail() {

        }
        /*wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              console.log('已授权!')
              wx.getUserInfo({
                success: function (res) {
                  console.log(res.userInfo)
                  //用户已经授权过
                  that.userInfo = res.userInfo

                }
              })
            }
          }
        })*/

      })
    },
    methods: {
      change: function (str) {
        this.lanmu = str;
      },
      handleUserInfo(e) {
        console.log(e)
        if (e.mp.detail.rawData) {
          let that = this
          wx.getSetting({
            success: function (res) {
              if (res.authSetting['scope.userInfo']) {
                console.log('已授权!')
                wx.getUserInfo({
                  success: function (res) {
                    console.log(res.userInfo)
                    //用户已经授权过
                    let temp = {}
                    temp.user_name = res.userInfo.nickName
                    temp.head_url = res.userInfo.avatarUrl
                    wx.getStorage({
                      key: 'open_id',
                      success: function (res) {
                        console.log(res)
                        temp.open_id = res.data
                        let param = {
                          'db': 'WpUserModel',
                          'model': 'edit',
                          'item': JSON.stringify(temp),
                          'items': JSON.stringify(temp)
                        }
                        that.$get('api/update', param)
                        console.log("发送")
                        that.userInfo = temp
                        wx.setStorage({
                          key: 'key',
                          data: temp,
                          success: function (res) {
                            console.log(res)
                          }
                        })
                      }
                    })
                  }
                })
              } else {

              }
            }
          })
        }
      }
    }
    
  }

</script>
<style scoped>
  .head {
    border: 1px solid #d0d0d0;
    margin-left: 10rpx;
    margin-top: 10rpx;
    height: 100rpx;
    width: 100rpx;
  }

  .avatarUrl {
    height: 100rpx;
    width: 100rpx;
  }

  .box {
    display: inline-flex;
    flex-direction: row;
    margin-top: 20rpx;
  }

  .box1 {
    display: inline-flex;
    flex-direction: column;
    margin-top: 5rpx;
  }

.box1 {
  display: inline-flex;
  flex-direction: column;
  margin-top: 5rpx;
}

.box2 {
  display: inline-flex;
  flex-direction: row;
}

.p1 {
  margin-left: 10rpx;
}

  .p3 {
    margin-left: 10rpx;
    margin-top: 32rpx;
    color: #888888;
  }

  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40rpx;
  }

.hd {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40rpx;
}
</style>
