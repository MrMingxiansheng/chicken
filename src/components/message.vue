<template>
  <div class="message">
    <div class="build">{{build}}</div>
    <div class="box1">
      <a href="/pages/qwd/main" hover-class="none">
        <div class="head"></div>
      </a>
      <div class="box2">
        <div class="box3">
          <p class="name">{{name1}}{{identity}}@{{name2}}{{identity}}</p>
          <div class="words">{{words}}</div>
        </div>
        <div class="box4">
          <p class="time">{{time}}</p>
          <div class="box5">
            <div class="praise-num">{{num1}}</div>
            <div class="praise">赞</div>
            <div class="step-num" decode="ensp">&ensp;{{num2}}</div>
            <div class="step">踩</div>
          </div>
          <p class="reply" @click="ClickReply">回复</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        build: "楼盘名称",
        name1: "姓名",
        identity: "(销售)",
        name2: "拉拉",
        time: "前天",
        words: "看不到大客户读书森林防火双离合分那就回复您开户奥拉夫",
        num1: "5",
        num2: "5"
      }
    },
    methods: {}
  }

</script>

<style scoped>
  .build {
    text-align: center;
    margin-top: 20rpx;
  }

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
    /*默认*/
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

  .box4 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .box5 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    position: absolute;
    right: 120rpx;
    color: #888888;
  }

  .name {
    color: #888888;
  }

  .time {
    color: #888888;
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

</style>
