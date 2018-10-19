<template>
  <div>

    <button v-if="!myDetail.user.user_name" open-type="getUserInfo" @getuserinfo="handleUserInfo">授权登录</button>

    <div class="box">
      <div class="head">
        <img :src="myDetail.user.head_url" class="avatarUrl" />
      </div>
      <div class="box1">
        <div class="box2">
          <div class="p1">{{myDetail.user.user_name}}{{identity}}</div>
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
          <div :class="{cur:lanmu=='mytopic'}" @click="change('mytopic')">话题</div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="mes" v-if="lanmu=='mes'">
            <message v-for="msg in myDetail.msgList" :key="msg.id" :msg="msg"></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <collect v-for="record in myDetail.recordList" :key="record.id" :record="record"></collect>
          </div>
          <div class="mytopic" v-if="lanmu=='mytopic'">
            <mytopic v-for="tag in myDetail.tagList" :key="tag.id" :tag="tag" @reGetStorage="reGetStorage"></mytopic>
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
  import line from "@/components/line"
  import message from "@/components/message"
  import collect from "@/components/collect"
  import mytopic from "@/components/myTopic"
  import suggest from "@/components/suggest"
  export default {
    components: {
      line,
      message,
      collect,
      mytopic,
      suggest,
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
        myDetail:''
      }
    },
    onShow: function () {
      this.getMyDetail()
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
                        let param = {    //数据库查询
                          'db': 'WpUserModel',
                          'model': 'edit',
                          'item': JSON.stringify(temp),
                          'items': JSON.stringify(temp)
                        }
                        that.$get('api/update', param)
                        console.log("发送")
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
      },


      getMyDetail(){
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success: function (res) {
            console.log('获取myDetail成功',res.data)
            that.myDetail = res.data
          }
        })
      },

      reGetStorage(){
        this.getMyDetail()
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

  .cur{
    color: #f3cc01;
  }

</style>
