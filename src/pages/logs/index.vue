<template>
  <div>
    <div class="box">
      <div class="head"></div>
      <div class="box1">
        <div class="box2">
          <span class="p1">{{name}}</span>
          <span class="p2" decode="emsp">&emsp; {{identity}} &emsp;&emsp; {{build}}</span>
        </div>
        <span class="p3" decode="emsp">{{praise}}赞 &emsp; {{step}}踩</span>
      </div>
    </div>
    <div>
      <div class="tab">
        <div class="hd">
          <div :class="{cur:lanmu=='mes'}" @click="change('mes')">消息</div>
          <div :class="{cur:lanmu=='col'}" @click="change('col')">收藏</div>
          <div :class="{cur:lanmu=='se'}" @click="change('se')">看过</div>
          <div :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</div>
        </div>
        <line />
        <div class="bd">
          <div class="mes" v-if="lanmu=='mes'">
            <message></message>
          </div>
          <div class="col" v-if="lanmu=='col'">
            <collect></collect>
          </div>
          <div class="se" v-if="lanmu=='se'">
            <see></see>
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
  import see from "@/components/see"
  import suggest from "@/components/suggest"
  export default {
    components: {
      line,
      message,
      collect,
      see,
      suggest,
    },

    data() {
      return {
        name: "姓名",
        identity: "(销售)",
        build: "未来悦",
        praise: "25",
        step: "3",
        lanmu: "mes"
      }
    }, // 计算属性
    computed: {}, // created生命周期，组件创建后执行s
    methods: {
      change: function (str) {
        this.lanmu = str;
      }
    }
  }

</script>
<style scoped>
  .head {
    border: 1px solid #d0d0d0;
    margin-left: 10rpx;
    margin-top: 10rpx;
    height: 100rpx;
    width: 100rpx;
  }

  .box {
    display: inline-flex;
    flex-direction: row;
    margin-top:20rpx;
  }

  .box1 {
    display: inline-flex;
    flex-direction: column;
    margin-top:5rpx;
  }

  .box2 {
    display: inline-flex;
    flex-direction: row;
  }

  .p1 {
    margin-left: 10rpx;
  }


  .p3 {
    margin-left: 10rpx;
    margin-top: 32rpx;
    color:#888888;
  }

  .hd {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 40rpx;
  }

</style>
