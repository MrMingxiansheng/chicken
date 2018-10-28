<template>
  <div>
    <div class="box">
      <div class="head">
        <img :src="user.head_url" class="avatarUrl" v-if="user.head_url"/>
        <img src="/static/images/nobody.png" class="avatarUrl" v-else/>
      </div>
      <div class="box1" v-if="user.user_name">
        <div class="p1">{{user.user_name}}</div>
        <div class="p3" decode="emsp"><span>{{praise}}</span>赞 &emsp; <span>{{step}}</span>踩</div>
      </div>
      <button v-else plain="true" open-type="getUserInfo" @getuserinfo="handleUserInfo">点击获取昵称</button>
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
            <div class="notice" v-if="revMsgList.length===0">消息为空</div>
            <message v-for="msg in revMsgList" :key="msg.id" :msg="msg" :userList="userList"></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <div class="notice" v-if="recordList.length===0">收藏为空</div>
            <collect v-for="record in recordList" :key="record.id" :record="record"></collect>
          </div>
          <div class="mytopic" v-if="lanmu=='mytopic'">
            <div class="notice" v-if="tagList.length===0">话题为空</div>
            <mytopic v-for="tag in tagList" :key="tag.id" :tag="tag" :tagList="tagList" :recordList="recordList"></mytopic>
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
        identity: "(销售)",
        praise: "25",
        step: "3",
        lanmu: "col",
        red: false,
        user:'',
        msgList:'',
        recordList:'',
        tagList:'',
        userList:''
      }
    },
    created() {
      this.init()
    },

    onLoad(){
      console.log('我的页面onload')
      if(!this.user){
        console.log('没有用户信息')
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
      let that = this
      wx.getStorage({
        key:'recordList',
        success(res){
          that.recordList = res.data
        }
      })
      wx.getStorage({
        key:'tagList',
        success(res){
          that.tagList = res.data
        }
      })
    },

    computed: {
      revMsgList() {
        let arr;
        if(this.msgList.length>0){
          arr = JSON.parse(JSON.stringify(this.msgList)).reverse()
        }else{
          arr = []
        }
        return arr;
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
                wx.setStorage({
                  key:'user',
                  data:res.data,
                  success(){
                    that.init()
                  }
                })
              })
            }
          })
        }
      },


      init() {
        console.log('我的页面init开始')
        let that = this
        wx.getStorage({
          key: 'user',
          success(res) {
            console.log('user缓存获取成功')
            that.user = res.data
            that.$get('api/queryUserDetail', {
              user_id: res.data.id
            }).then(function (obj) {
              wx.getStorage({
                key:'msgList',
                success(res){
                  if (obj.data.msgList.length > res.data.length) {
                    that.red = true
                  }
                }
              })
              that.userList = obj.data.userList
              that.msgList = obj.data.msgList
              that.recordList = obj.data.recordList
              that.tagList = obj.data.tagList
              that.$setStorage('interactList',obj.data.interactList)
              //that.$setStorage('msgList',obj.data.msgList)
              that.$setStorage('recordList',obj.data.recordList)
              that.$setStorage('tagList',obj.data.tagList)
              that.$setStorage('userList',obj.data.userList)
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
                  user_id: obj.data.user.id,
                  status: 'connect'
                }))
              })
              wx.onSocketMessage(function (message) {
                console.log('接收到新消息')
                that.red = true
                let chat = JSON.parse(message.data)
                console.log('chat', chat)
                that.msgList.push(chat)
                //要不要存缓存?
              })
            })
          },
          fail() {
            console.log('user缓存获取失败')
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
                        console.log('后台有这个用户')
                        wx.setStorage({
                          key:'user',
                          data:res.data.data[0],
                          success(){
                            console.log('user缓存设置成功')
                            that.init()
                          }
                        })
                      } else {
                        console.log('后台没有这个用户')
                        that.$setStorage('open_id',JSON.parse(res.data.data).openid)
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
  .head {
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
