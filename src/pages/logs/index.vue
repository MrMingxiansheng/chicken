<template>
  <div class="logs">
    <div class="box">
      <div class="head">
        <img :src="user.head_url" class="avatarUrl" v-if="user.head_url" />
        <img src="/static/images/nobody.png" class="avatarUrl" v-else />
      </div>
      <div class="box1" v-if="user.user_name">
        <div class="user">{{user.user_name}}</div>
        <div class="Num" decode="emsp"><span>{{praise}}</span>赞 &emsp; <span>{{step}}</span>踩</div>
      </div>
      <button v-else plain="true" open-type="getUserInfo" @getuserinfo="handleUserInfo">点击获取昵称</button>
    </div>
    <div>
      <div class="tab">
         <div class="hd"><div :class="{cur:lanmu=='mes'}" @click="change('mes')" class="topMes">
            <i-badge :dot='red' @click="clickDot">消息</i-badge>
          </div>
          <div :class="{cur:lanmu=='col'}" @click="change('col')">收藏</div>
          <div :class="{cur:lanmu=='mytopic'}" @click="change('mytopic')">话题</div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="mes" v-if="lanmu=='mes'">
            <div class="notice" v-if="revMsgList.length===0">消息为空</div>
            <message v-for="msg in revMsgList" :key="msg.id" :msg="msg"
            @removeMsg="removeMsg"></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <div class="notice" v-if="recordList.length===0">收藏为空</div>
            <collect v-for="record in recordList" :key="record.id" :record="record"></collect>
          </div>
          <div class="mytopic" v-if="lanmu=='mytopic'">
            <div class="notice" v-if="myTagList.length===0">话题为空</div>
            <mytopic v-for="tag in myTagList" :key="tag.id" :tag="tag" @delMyTag="delMyTag"></mytopic>
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
        lanmu: "mes",
        red: false,
        user: '',
        msgList: [],
        recordList: [],
        myTagList: [],
        allMessage:[]
      }
    },
    created() {
      this.init()
    },

    onLoad() {
      console.log('我的页面onload')
      if (!this.user) {
        console.log('没有用户信息')
        this.init()
      }
    },
    onShow: function () {
      let that = this
      wx.getStorage({
        key: 'recordList',
        success(res) {
          that.recordList = []
          for(let i=0; i<res.data.length; i++){
            that.recordList.push(res.data[i])
          }
        }
      })
      wx.getStorage({
        key: 'myTagList',
        success(res) {
          that.myTagList = []
          for(let i=0; i<res.data.length; i++){
            that.myTagList.push(res.data[i])
          }
        }
      })
    },

    computed: {
      revMsgList() {
        let arr;
        if (this.msgList.length > 0) {
          arr = JSON.parse(JSON.stringify(this.msgList)).reverse()
        } else {
          arr = []
        }
        return arr;
      },
      praise() {
        let num = 0
        for (let i = 0; i < this.allMessage.length; i++) {
          if (this.allMessage[i].interact_type === '点赞') {
            num++
          }
        }
        return num;
      },
      step() {
        let num = 0
        for (let i = 0; i < this.allMessage.length; i++) {
          if (this.allMessage[i].interact_type === '点踩') {
            num++
          }
        }
        return num;
      }
    },
    methods: {
      //切换收藏,话题,消息,反馈
      change (str) {
        this.lanmu = str;
      },

      //点消息让红点消失
      clickDot() {
        this.red = false
      },

      //用户登录
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
                  key: 'user',
                  data: res.data,
                  success() {
                    that.init()
                  }
                })
              })
            }
          })
        }
      },

      //初始化websocket连接,我的信息的缓存等
      init() {
        console.log('我的页面init开始')
        let that = this
        wx.getStorage({
          key: 'user',
          success(res) {
            console.log('user缓存获取成功')
            that.user = res.data //用来展示头像昵称
            that.$get('api/queryUserDetail', {
              user_id: res.data.id
            }).then(function (obj) {
              let msgArr = obj.data.msgList.filter(function(ele){
                return ele.msg_status !== 'DELETE'
              })
              console.log('msgArr',msgArr)
              wx.getStorage({
                key: 'msgList',
                success(res) {
                  if (msgArr.length > res.data.length) {
                    that.red = true //有新消息就显示红点
                  }
                  that.$setStorage('msgList', msgArr)
                }
              })
              that.msgList = []
              that.recordList = []
              that.myTagList = []
              that.allMessage = []
              for(let i=0; i<msgArr.length; i++){
                that.msgList.push(msgArr[i])
              }
              for(let i=0; i<obj.data.msgList.length; i++){
                that.allMessage.push(obj.data.msgList[i])
              }
              for(let i=0; i<obj.data.recordList.length; i++){
                that.recordList.push(obj.data.recordList[i])
              }
              for(let i=0; i<obj.data.tagList.length; i++){
                that.myTagList.push(obj.data.tagList[i])
              }
              that.$setStorage('myInteractList', obj.data.interactList)
              that.$setStorage('recordList', obj.data.recordList)
              that.$setStorage('myTagList', obj.data.tagList)
              that.$setStorage('userList', obj.data.userList)
              console.log('obj.data.userList',obj.data.userList)
              wx.connectSocket({
                url: 'wss://www.xaoji.com',
                data: {
                  user_id: obj.data.user.id
                },
                success() {
                  console.log('socket连接')
                }
              })
              wx.onSocketClose(function () {
                console.log('socket连接断开')
                wx.connectSocket({
                  url: 'wss://www.xaoji.com',
                  data: {
                    user_id: obj.data.user.id
                  },
                  success() {
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
                that.allMessage.push(chat)
                that.$setStorage('msgList', that.msgList)
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
                    url: 'https://www.xaoji.com:3001/api/getUser',
                    data: {
                      code: code
                    },
                    success(res) {
                      console.log('发送code成功')
                      if (res.data.msg == 'have data') {
                        console.log('后台有这个用户')
                        wx.setStorage({
                          key: 'user',
                          data: res.data.data[0],
                          success() {
                            console.log('user缓存设置成功')
                            that.init()
                          }
                        })
                      } else {
                        console.log('后台没有这个用户')
                        that.$setStorage('open_id', JSON.parse(res.data.data).openid)
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
      },

      removeMsg(msgId){
        let that = this
        console.log('父组件删除函数')
        console.log('msgId',msgId)
        for(let i=0; i<that.msgList.length; i++){
          console.log('if外面',that.msgList[i])
          if(that.msgList[i].id === msgId){
            console.log('if里面',that.msgList[i])
            that.msgList.splice(i,1)
            that.$setStorage('msgList', that.msgList)
            break
          }
        }
        wx.hideLoading()
      },

      delMyTag(id){
        let that = this
        for(let i=0; i<that.myTagList.length; i++){
          if(that.myTagList[i].id === id){
            that.myTagList.splice(i,1)
            break
          }
        }
        for(let i=0; i<that.recordList.length; i++){
          if(that.recordList[i].tag_id === id){
            that.recordList.splice(i,1)
            break
          }
        }
        that.$reSetStorage('recordList',that.recordList)
        that.$reSetStorage('myTagList',that.myTagList)
        wx.hideLoading()
        console.log('删除话题成功', res)
      }


    } //methods
  }

</script>

<style scoped>
  .logs{
    overflow: hidden;
  }
  .avatarUrl {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
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
    border: none;
    text-align: left;
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
    font-weight: 700;
    /*字体加粗*/
    line-height: 35rpx;
  }

  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: rgb(141, 148, 141);
    margin-top: 40rpx;
    font-weight: 700;
    /*字体加粗*/
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
    font-size: 25px;
    color: rgb(229, 229, 229);
    margin-top: 200rpx;
  }

</style>
