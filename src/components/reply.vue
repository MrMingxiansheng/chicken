<template>
  <div class="reply">
    <div class="header" v-if="reply.toUserInfo.user_name">
      <img :src="reply.userInfo.head_url" alt="">
      <span>{{reply.userInfo.user_name}}</span>
      <span class="middle">&nbsp;&nbsp;回复</span>
      <img :src="reply.toUserInfo.head_url" alt="">
      <span>{{reply.toUserInfo.user_name}}</span>
    </div>
    <div class="header1" v-if="!reply.toUserInfo.user_name">
      <img :src="reply.userInfo.head_url" alt="">
      <span>{{reply.userInfo.user_name}}</span>
    </div>
    <div class="content">
      <p>{{reply.interactInfo.interact_content}}</p>
      <ul>
        <li v-for="img in reply.replyImages" :key="img">
          <img :src="img" alt="">
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="left">{{reply.interactInfo.update_time}}</div>
      <div class="right">
        <div class="subReply">回复</div>
        <div class="step">
          <span>踩</span>
        </div>
        <div class="praise">
          {{reply.interactInfo.interact_status}}
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

