<template>
  <div class="comment">
    <div class="header">
      <img :src="comment.avatarUrl" alt="">
      <span>{{comment.nickName}}</span>
    </div>
    <div class="content">
      <p>{{comment.commentWords}}</p>
      <ul>
        <li v-for="img in comment.commentImages" :key="img">
          <img :src="img" alt="">
        </li>
      </ul>
    </div>
    <div class="footer">
      <div class="left">{{comment.time}}</div>
      <div class="right">
        <div class="reply">回复</div>
        <div class="step">
          {{comment.step}}
          <span>踩</span>
        </div>
        <div class="praise">
          {{comment.praise}}
          <span>赞</span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props:["comment"],
  methods: {
    
  }
}
</script>

<style scoped>
  .comment {
    width: 750rpx;
    border-bottom: 1px solid #ddd;
  }
  .header {
    height: 100rpx;
    display: flex;
    align-items: center;
  }
  
  .header img {
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
    height: 50rpx;
    margin-left: 50rpx;
  }
  .footer .left {
    float: left;
  }
  .footer .right .praise {
    float:right;
    margin-right: 10rpx;
  }
  .footer .right .reply {
    float:right;
    margin: 0 10rpx;
  }
  .footer .right .step {
    float:right;
  }
  

</style>

