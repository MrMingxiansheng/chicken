<template>
  <div>
    <button v-if="!user_name" open-type="getUserInfo" @getuserinfo="handleUserInfo">授权登录</button>
    <div class="box">
      <div class="head">
        <img :src="head_url" class="avatarUrl" />
      </div>
      <div class="box1">
        <p class="p1">{{user_name}}</p>
        <p class="p3" decode="emsp"><span>{{num}}</span>赞 &emsp; <span>{{cnum}}</span>踩</p>
      </div>
    </div>
    <div>
      <div class="tab">
        <div class="hd">
          <div :class="{cur:lanmu=='col'}" @click="change('col')">收藏</div>
          <div :class="{cur:lanmu=='mytopic'}" @click="change('mytopic')">话题</div>
          <div :class="{cur:lanmu=='mes'}" @click="change('mes')" class="topMes"><i-badge :dot='dot' @click="clickDot">消息</i-badge></div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="col" v-if="lanmu=='col'">
            <collect v-for="record in myDetail.recordList" :key="record.id" :record="record"></collect>
          </div>
          <div class="mytopic" v-if="lanmu=='mytopic'">
            <mytopic v-for="tag in myDetail.tagList" :key="tag.id" :tag="tag" :myDetail="myDetail"></mytopic>
          </div>
          <div class="mes" v-if="lanmu=='mes'">
            <message></message>
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
        user: '姓名',
        identity: '(销售)',
        build: '未来悦',
        num: 0,
        cnum: 0,
        lanmu: 'col',
        dot: true ,
        myDetail:'',
        user_name:'',
        head_url:''
      }
    },
    onLoad (){
       let that = this
        wx.getStorage({
          key: 'myDetail',
          success: function (res) {
            for (let i=0; i<res.data.msgList.length; i++){
              if (res.data.msgList[i].interact_type === "点赞"){
                that.num += 1
              }
              if (res.data.msgList[i].interact_type === "点踩"){
                that.cnum += 1
              }
            }
          }
        })
    },
    onShow: function () {
      this.getMyDetail()
    },
    methods: {
      change: function (str) {
        this.lanmu = str;
      },
     clickDot () {
        this.dot = false
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
                    that.head_url = res.userInfo.nickName
                    that.user_name = res.userInfo.avatarUrl
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

      //获取myDetail缓存
      getMyDetail(){
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success: function (res) {
            console.log('获取myDetail成功',res.data)
            that.myDetail = res.data
            that.head_url = that.myDetail.user.head_url
            that.user_name = that.myDetail.user.user_name
          }
        })
      },

      //重新获取myDetail缓存
      reGetStorage(){
        this.getMyDetail()
      }
    }
  }

</script>
<style scoped>
  .head {
    margin-left: 30rpx;
    height: 100rpx;
    width: 100rpx;
    display: inline-block;
  }

  .avatarUrl {
    height: 100rpx;
    width: 100rpx;
    border-radius:50%;
  }

  .box {
    margin-top: 20rpx;
  }

  .box1 {
    margin-left: 20rpx;
    display: inline-block;
    height: 100rpx;
    width: 600rpx;
  }


  .p1 {
    height: 35rpx;
    float:left;
    width: 600rpx;
    font-size: 35rpx;
    line-height: 35rpx;
    margin-bottom: 30rpx;
  }


  .p3 {
    color: #888888;
    height: 35rpx;
    float:left;
    width: 600rpx;
    font-size: 35rpx;
    line-height: 35rpx;
  }

  .p3 span{
    font-size: 30rpx;
  }

  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40rpx;
  }

  .topMes {
    position: relative;
    bottom:5rpx;
  }

  .cur{
    color: #f3cc01;
  }

</style>
