<template>
  <div>
    <div class="loupan">
      <div class="topic-center">{{topic}}</div>
      <div class="build-right">{{build}}</div>
    </div>
    <line />
    <div class="box1" v-for="site in sites" :key="site">
      <a href="/pages/qwd/main">
        <div class="head"></div>
      </a>
      <div class="box2">
        <div class="box3">
          <p class="name">{{name}}{{identity1}}{{identity2}}</p>
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
    <div>
      <aite></aite>
    </div>
    <div class="item">
      <div class="send_arr">
        <input class="enter" />
        <div class="send" @click="ClickSend">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <span>图片</span>
        </li>
        <li>
          <span>视频</span>
        </li>
        <li>
          <span class="collect" @click="ClickCollect">收藏</span>
        </li>
        <li>
          <span open-type="share" class="share" @click="ClickShare">分享</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
  import line from "@/components/line"
  import aite from "@/components/aite"
  export default {
    components: {
      line,
      aite
    },
    data() {
      return {
        sites: [""],
        topic: "坟景",
        build: "未来城",
        name: "姓名",
        identity1: "(销售)",
        identity2: "(题主)",
        time:"昨天",
        words: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
        num1: 0,
        num2: 0
      };
    },
    created() {},
    onShareAppMessage: function (res) {
      if (res.from === 'span') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '来蒙多这儿',
        path: '/pages/qwb/main',
        imageUrl: ''
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
  };

</script>

<style scoped>
  .loupan {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 40px;
  }

  .topic-center {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size:22px;
  }

  .build-right {
    position: absolute;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 17px;
    right: 10px;
  }

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

  .name{
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

  .item {
    width: 100%;
    position: absolute;
    bottom: 0;
    /*置底*/
  }

  .item ul {
    display: flex;
    flex-direction: row;
  }

  .item li {
    width: 10px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    flex: auto;
  }

  .enter {
    width: 300px;
  }

  .send_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 355px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .send{
    position: relative;
    top:2px;
  }

</style>
