<template>
  <div class="reply">
    <div class="header" v-if="reply.interact_type==='回复'">
      <img :src="reply.user.head_url" alt="">
      <span>{{reply.user.user_name}}</span>
      <span class="middle">&nbsp;&nbsp;回复</span>
      <img :src="reply.to_interact.user.head_url" alt="">
      <span>{{reply.to_interact.user.user_name}}</span>
    </div>
    <div class="header1" v-if="reply.interact_type==='评论'">
      <img :src="reply.user.head_url" alt="">
      <span>{{reply.user.user_name}}</span>
    </div>
    <div class="content">
      <p>{{reply.interact_content}}</p>
      <ul>
        <li v-for="img in reply.replyImages" :key="img">
          <img :src="img" alt="">
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="left">{{reply.update_time}}</div>
      <div class="right">
        <div class="subReply" @click="clickReply">回复</div>
        <div class="step">
          <span>踩</span>
        </div>
        <div class="praise">
          {{reply.interact_status}}
          <span @click="clickPraise">赞</span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props:["reply"],
  methods: {
    clickReply(){
      this.$emit('toReplyName',this.reply.user.user_name,this.reply.id)
    },
    clickPraise(){
      let that = this
      wx.getStorage({
        key:'key',
        success:function(res){
          let myUserId = res.data.id
          let to_interact_id = that.reply.id
          that.$get("api/queryUserDetail", {user_id: myUserId}).then(function(res){
            console.log(res.data)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .reply {
    width: 750rpx;
    border-bottom: 1px solid #ddd;
  }
  .header {
    height: 80rpx;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  .header .middle {
    color: #666;
  }
  .header img {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    margin: 5px 10rpx;
  }

  .header1 {
    height: 100rpx;
    display: flex;
    align-items: center;
  }
  
  .header1 img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin: 10px 20rpx;
  }
  .content {
    width: 700rpx;
    margin-left: 50rpx;
  }
  .content ul {
    display: flex;
    margin-top: 10rpx;
  }
  .content ul li {
    margin-right: 10rpx;
  }
  .content ul li img {
    width: 100rpx;
    height: 100rpx;
  }
  .footer {
    width: 700rpx;
    height: 45rpx;
    margin-left: 50rpx;
  }
  .footer .left {
    float: left;
    color: #ccc;
    font-size: 14px;
    margin-top: 5px
  }
  .footer .praise {
    float:right;
    margin-right: 10rpx;
    color: orange;
    font-size: 17px;
  }
  .footer .subReply {
    float:right;
    margin: 0 10rpx;
    color: orange;
    font-size: 17px;
  }
  .footer .step {
    float:right;
    color: orange;
    font-size: 17px;
  }
  

</style>

