<template>
  <div>
    <div class="box">
      <div class="head">
        <img :src="myDetail.user.head_url" class="avatarUrl" v-if="myDetail"/>
        <img src="/static/images/nobody.png" class="avatarUrl" v-else/>
      </div>
      <div class="box1" v-if="myDetail">
        <div class="user">{{myDetail.user.user_name}}</div>
        <div class="Num" decode="emsp"><span>{{num}}</span>赞 &emsp; <span>{{cnum}}</span>踩</div>
      </div>
      <button v-if="!myDetail" plain="true" open-type="getUserInfo" @getuserinfo="handleUserInfo">点击获取昵称</button>
    </div>
    <div>
      <div class="tab">
        <div class="hd">
          <div :class="{cur:lanmu=='col'}" @click="change('col')">收藏</div>
          <div :class="{cur:lanmu=='mytopic'}" @click="change('mytopic')">话题</div>
          <div :class="{cur:lanmu=='mes'}" @click="change('mes')" class="topMes">
            <i-badge :dot='red' @click="clickDot">消息</i-badge>
          </div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="mes" v-if="lanmu=='mes'">
            <div class="notice" v-if="msgList.length===0">消息为空</div>
            <message v-for="msg in msgList" :key="msg.id" :msg="msg" :userList="myDetail.userList"></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <div v-if="myDetail"><div class="notice" v-if="myDetail.recordList.length===0">收藏为空</div></div>
            <collect v-for="record in myDetail.recordList" :key="record.id" :record="record"></collect>
          </div>
          <div class="mytopic" v-if="lanmu=='mytopic'">
            <div v-if="myDetail"><div class="notice" v-if="myDetail.tagList.length===0">话题为空</div></div>
            <mytopic v-for="tag in myDetail.tagList" :key="tag.id" :tag="tag"></mytopic>
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
        num: 0,
        cnum: 0,
        lanmu: 'col',
        red: false,
        myDetail:'',
      }
    },
    created() {
      this.init()
    },
    onLoad (){
       let that = this
       if(!this.myDetail){
        this.init()
       }
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

    computed: {
      msgList() {
        let arr;
        if(this.myDetail.msgList){
          if(this.myDetail.msgList.length>0){
            arr = JSON.parse(JSON.stringify(this.myDetail.msgList)).reverse()
          }else{
            arr = []
          }
        }else{
          arr = []
        }
        return arr
      }
    },
    methods: {
      change: function (str) {
        this.lanmu = str;
      },
      clickDot() {
        this.red = false
      },
      handleUserInfo(e) {
        console.log('点击登录')
        let that = this
        if (e.mp.detail.rawData) {
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
                      that.init()
                    }
                  })
                })
              })
            }
          })
        }
      },

      //获取myDetail缓存
      getMyDetail() {
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success: function (res) {
            console.log('获取myDetail成功', res.data)
            that.myDetail = res.data
          }
        })
      },

      init() {
        console.log('我的页面init开始')
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success(res) {
            console.log('<myDetail>缓存获取成功')
            that.$get('api/queryUserDetail', {
              user_id: res.data.user.id
            }).then(function (obj) {
              if (obj.data.msgList.length > res.data.msgList.length) {
                that.red = true
              }
              that.myDetail = obj.data
              wx.setStorage({
                key: 'myDetail',
                data: obj.data,
                success() {
                  console.log('<myDetail>缓存更新成功')
                }
              })
              wx.connectSocket({
                url: 'ws://www.xaoji.com:3001',
                data: {
                  user_id: obj.data.user.id
                },
                success(){
                  console.log('socket连接')
                }
              })
              wx.onSocketClose(function () {
                console.log('socket连接断开')
                wx.connectSocket({
                  url: 'ws://www.xaoji.com:3001',
                  data: {
                    user_id: obj.data.user.id
                  },
                  success(){
                    console.log('socket连接')
                  }
                })
              })
              wx.onSocketOpen(function () {
                console.log('发送初始化消息')
                that.$sendMessage(JSON.stringify({
                  user_id: res.data.user.id,
                  status: 'connect'
                }))
              })
              wx.onSocketMessage(function (message) {
                console.log('接收到新消息')
                that.red = true
                let chat = JSON.parse(message.data)
                console.log('chat', chat)
                that.myDetail.msgList.push(chat)
                wx.setStorage({
                  key: 'myDetail',
                  data: that.myDetail,
                  success() {
                    console.log('<myDetail>缓存更新成功')
                  }
                })
              })
            })
          },
          fail() {
            console.log('<myDetail>缓存获取失败')
            wx.login({
              success: function (res) {
                console.log('获取code成功')
                let code = res.code;
                if (code) {
                  wx.request({
                    url: 'https://www.xaoji.com/api/getUser',
                    data: {
                      code: code
                    },
                    success(res) {
                      console.log('发送code成功')
                      if (res.data.msg == 'have data') {
                        that.$get('api/queryUserDetail',{user_id:res.data.data[0].id}).then(function(res){
                          wx.setStorage({
                            key: 'myDetail',
                            data: res.data,
                            success(){
                              console.log('<myDetail>缓存设置成功')
                              that.init()
                            }
                          })
                        })
                      } else {
                        wx.setStorage({
                          key: 'open_id',
                          data: JSON.parse(res.data.data).openid,
                          success(){
                            console.log('<open_id>缓存设置成功')
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
            })
          }
        })
      }


    } //methods
  }

</script>

<style scoped>

  .avatarUrl {
    height: 100rpx;
    width: 100rpx;
    border-radius:50%;
  }

  .box {
    margin-top: 20rpx;
    margin-left: 50rpx;
    display: flex;
    flex-direction: row;
    color: rgb(141, 148, 141);
  }
  
  .box button {
    width: 400rpx;
    height: 100rpx;
    font-size: 35rpx;
    line-height: 100rpx;
    border:none;
    text-align:left;
  }

  .box1 {
    margin-left: 20rpx;
    height: 100rpx;
    width: 600rpx;
  }


  .user {
    height: 35rpx;
    width: 600rpx;
    font-size: 35rpx;
    line-height: 35rpx;
    margin-bottom: 30rpx;
  }


  .Num {
    height: 35rpx;
    width: 600rpx;
    font-size: 13px;
    line-height: 35rpx;
  }

  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: rgb(141, 148, 141);
    margin-top: 40rpx;
    font-weight: 700;/*字体加粗*/
    margin-bottom: 20rpx;
  }

  .cur {
    color: #f3cc01;
  }

  .topMes {
    position: relative;
    bottom: 5rpx;
  }

  .notice {
    text-align: center;
    font-size: 30px;
    color: rgb(229, 229, 229);
    margin-top: 200rpx;
  }

</style>
