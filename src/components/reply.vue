<template>
  <div class="reply">
    <div class="avatar">
      <img :src="hideUser.head_url"  v-if="user_type === '匿名' && reply.user_id===owner">
      <img :src="reply.user.head_url"  v-if="user_type !== '匿名'" @click="test">
    </div>
    <div class="content">
      <div class="content-in">
        <div v-if="user_type === '匿名' " class="user">
          <span v-if="reply.user_id===owner">{{hideUser.user_name}}(题主)</span>
          <span v-else>{{reply.user.user_name}}</span>
          <span v-if="reply.interact_type==='回复'">&nbsp;&nbsp;回复&nbsp;&nbsp;
            <span v-if="reply.to_interact.user_id===owner">{{hideUser.user_name}}(题主)</span>
            <span v-else>{{reply.to_interact.user.user_name}}</span>
          </span>
        </div>
        <div v-if="user_type !== '匿名' " class="user">
          <span>{{reply.user.user_name}}<span v-if="reply.user_id===owner">(题主)</span></span>
          <span v-if="reply.interact_type==='回复'">&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.to_interact.user.user_name}}<span v-if="reply.to_interact.user_id===owner">(题主)</span></span>
        </div>
        <div class="words">
          {{reply.interact_content}}
        </div>
        <div class="time">
          {{reply.update_time}}
        </div>
      </div>
    </div>
    <div class="interact">
      <div class="interact-in">
        <div class="step" @click="clickStep">
          <span class="step-num">{{reply.cnum}}</span>
          <span class="step-str">踩</span>
        </div>
        <div class="praise" @click="clickPraise">
          <span class="praise-num">{{reply.interact_status}}</span>
          <span class="praise-str">赞</span>
        </div>
        <div class="say" @click="clickReply">
          回复
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["reply","owner","hideUser","user_type"],
    data() {
      return {
        // praiseStatus:'赞',
      }
    },
    methods: {
      clickReply() {
        this.$emit('toReplyName', this.reply.user.user_name, this.reply.id)
      },
      clickPraise() {
        console.log('点了一下赞')
        let that = this
        wx.getStorage({
          key: 'key',
          success: function (res) {
            let myUserId = res.data.id
            let to_interact_id = that.reply.id
            let tag_id = that.reply.tag_id
            let interact = {}
            let todo = ''
            that.$get("api/queryUserDetail", {
              user_id: myUserId
            }).then(function (res) {
              let interactList = res.data.interactList
              let arr = interactList.filter(function (ele) {
                return ele.to_interact_id === to_interact_id
              })
              let arr1 = arr.filter(function (e) {
                return e.interact_type === '点赞'
              })
              if (arr.length > 0) {
                if (arr1.length > 0) {
                  todo = '取消赞'
                } else {
                  todo = '点赞'
                }
              } else {
                todo = '点赞'
              }
              if (todo === '点赞') {
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.interact_type = '点赞'
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.reply.interact_status = parseInt(that.reply.interact_status) + 1
                })
              } else if (todo === '取消赞') {
                interact.id = arr1[0].id
                interact.interact_type = '取消赞'
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.reply.interact_status = parseInt(that.reply.interact_status) - 1
                })
              }
            })
          }
        })
      },
      clickStep() {
        console.log('点了一下踩')
        let that = this
        wx.getStorage({
          key: 'key',
          success: function (res) {
            let myUserId = res.data.id
            let to_interact_id = that.reply.id
            let tag_id = that.reply.tag_id
            let interact = {}
            let todo = ''
            that.$get("api/queryUserDetail", {
              user_id: myUserId
            }).then(function (res) {
              let interactList = res.data.interactList
              let arr = interactList.filter(function (ele) {
                return ele.to_interact_id === to_interact_id
              })
              let arr1 = arr.filter(function (e) {
                return e.interact_type === '点踩'
              })
              if (arr.length > 0) {
                if (arr1.length > 0) {
                  todo = '取消踩'
                } else {
                  todo = '点踩'
                }
              } else {
                todo = '点踩'
              }
              if (todo === '点踩') {
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.interact_type = '点踩'
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.reply.cnum = parseInt(that.reply.cnum) + 1
                })
              } else if (todo === '取消踩') {
                interact.id = arr1[0].id
                interact.interact_type = '取消踩'
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.reply.cnum = parseInt(that.reply.cnum) - 1
                })
              }
            })
          }
        })
      },
      test(){
        console.log('用户id',this.reply.user_id)
        this.$get('api/queryUserDetail',{user_id:this.reply.user_id}).then(function(res){
          console.log(res.data)
        })
        
         
      }
    }
  }

</script>

<style scoped>
  .reply {
    display: flex;
    margin: 20rpx 0;
  }

  .avatar {
    width: 125rpx;
    text-align: center;
  }

  .avatar img {
    width: 80rpx;
    height: 80rpx;
  }

  .content {
    width: 490rpx;

    line-height: 18px;
  }

  .content .content-in {
    width: 460rpx;
  }

  .content-in .user {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }

  .content-in .words {
    color: #000;
    margin: 20rpx 0;
    font-size: 17px;
  }

  .content-in .time {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }

  .interact {
    width: 125rpx;
  }

  .interact .interact-in {
    height: 180rpx;
    width: 100rpx;
    border: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    margin-left: 15rpx;
    font-size: 14px;
    line-height: 60rpx;
  }

  .interact-in span {
    display: inline-block;
    height: 100%;
    width: 45rpx;
  }

  .interact-in .step {
    border-bottom: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    height: 60rpx;
  }

  .step .step-num {
    color: #ccc;
    text-align: right;
  }

  .step .step-str {
    text-align: left;
    margin-left: 4rpx;
  }

  .interact-in .praise {
    border-bottom: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    height: 60rpx;
  }

  .praise .praise-num {
    color: #ccc;
    text-align: right;
  }

  .praise .praise-str {
    text-align: left;
    margin-left: 4rpx;
  }

  .interact-in .say {
    box-sizing: border-box;
    height: 60rpx;
    text-align: center;
  }

</style>
