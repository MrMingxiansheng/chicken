<template>
  <div class="aite">
    <div class="box1">
      <a href="/pages/qwd/main">
        <div class="head"></div>
      </a>
      <div class="box2">
        <div class="box3">
          <p class="identity">{{name1}}{{identity1}}{{identity2}}@{{name2}}{{identity1}}{{identity2}}</p>
          <div class="words">{{words}}</div>
        </div>
        <div class="box4">
          <p class="time">{{time}}</p>
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
    data() {
      return {
        name1: "粑粑",
        name2: "拉拉",
        identity1:"(销售)",
        identity2:"(题主)",
        time:"三天前",
        words: "看不到大客户读书森林防火双离合分那就回复您开户奥拉夫",
        num1: 0,
        num2: 0
      }
    },
    methods: {
      ClickPraise() {
        this.num1 += 1;
      },
      ClickStep() {
        this.num2 += 1;
      },
    }
  }

</script>

<style scoped>
  .head {
    border: 1px solid #d0d0d0;
    margin-left: 20rpx;
    margin-top: 20rpx;
    height: 40px;
    width: 40px;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    margin-top:10px;
  }

  .box2 {
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
    margin-top: 12rpx;
    font-size: 16px;
  }

  .box3 {
    display: flex;
    flex-direction: column;
  }

  .identity{
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

  .box5 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    position: absolute;
    right: 60px;
  }

  .reply {
    color: #c5a500;
    position: absolute;
    right: 10px;
  }

  .words {
    font-size: 16px;
    margin-top: 10rpx;
    width: 300px;
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
