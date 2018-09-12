<template>
  <div class="aite">
   <div class="box1">
      <a href="/pages/qwd/main" hover-class="none">
        <div class="head"></div>
      </a>
      <div class="box2">
        <div class="box3">
          <p class="user">{{item.user}}{{item.userType}}</p>
          <div class="words">{{item.content}}</div>
        </div>
        <div class="box4">
            <p class="time">{{item.time}}</p>
            <div class="box5">
            <div class="praise-num">{{num1}}</div>
            <div class="praise" @click.stop="ClickPraise">赞</div>
            <div class="step-num" decode="ensp">&ensp;{{num2}}</div>
            <div class="step" @click.stop="ClickStep">踩</div>
            </div>
            <p class="reply" @click="ClickReply">回复</p>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    props:['item'],
    data() {
      return {  
        num1:0,
        num2:0,   
      }
    },
    methods: {
      ClickPraise() {
        this.num1 += 1;
      },
      ClickStep() {
        this.num2 += 1;
      },
      ClickReply:function () {
        this.$emit("child", "")
        this.setData({
           focus: true
        })
    },
      
    }
  }

</script>

<style scoped>
  .head {
    border: 1px solid #d0d0d0;
    margin-left: 20rpx;
    margin-top: 20rpx;
    height: 80rpx;
    width: 80rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    margin-top:20rpx;
  }

  .box2 {
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
    margin-top: 16rpx;
    font-size: 16px;
  }

  .box3 {
    display: flex;
    flex-direction: column;
  }

  .user{
    color:#888888;
  }

  .time{
    color:#888888;
  }

  .box4 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .box5{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    position: absolute;
    right: 120rpx;
  }

  .reply {
    color: #c5a500;
    position: absolute;
    right: 20rpx;
  }

  .words {
    font-size: 16px;
    margin-top: 20rpx;
    width: 600rpx;
    white-space: normal;
    /*自动换行*/
  }

  .praise {
    color: #c5a500;
  }

  .praise-num{
    color:#888888;
  }

  .step {
    color: #c5a500;
  }

  .step-num{
    color:#888888;
  }
</style>
