<template>
  <div class="reply">
    <div class="header">
      <img :src="reply.sendAvatarUrl" alt="">
      <span>{{reply.sendNickName}}</span>
      <span class="middle">&nbsp;&nbsp;回复</span>
      <img :src="reply.rogerAvatarUrl" alt="">
      <span>{{reply.rogerNickName}}</span>
    </div>
    <div class="content">
      <p>{{reply.replyWords}}</p>
      <ul>
        <li v-for="img in reply.replyImages" :key="img">
          <img :src="img" alt="">
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="left">{{reply.time}}</div>
      <div class="right">
        <div class="subReply">回复</div>
        <div class="step">
          {{reply.step}}
          <span>踩</span>
        </div>
        <div class="praise">
          {{reply.praise}}
          <span>赞</span>
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
    height: 50rpx;
    margin-left: 50rpx;
  }
  .footer .left {
    float: left;
  }
  .footer .praise {
    float:right;
    margin-right: 10rpx;
  }
  .footer .subReply {
    float:right;
    margin: 0 10rpx;
  }
  .footer .step {
    float:right;
  }
  

</style>

