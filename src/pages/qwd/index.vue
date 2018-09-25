<template>
  <div>
    <line />
    <div class="card">{{card}}</div>
    <line />
    <div class="box">
      <div class="head"></div>
      <div class="box1">
        <div class="box2">
          <text class="p1">{{name}}</text>
          <text class="p2" decode="emsp">&emsp; {{identity}} &emsp;&emsp; {{build}}</text>
        </div>
        <text class="p3" decode="emsp">{{praise}}赞 &emsp; {{step}}踩</text>
      </div>
    </div>
  </div>
</template>


<script>
  import line from "@/components/line";
  export default {
    components: {
      line
    },
    data() {
      return {
        card: "个人名片",
        name: "姓名",
        identity: "(销售)",
        build: "未来悦",
        praise: "25",
        step: "3",
      };
    },

    methods: {

    }
  };

</script>

<style scoped>
  .card {
    text-align: center;
    font-size: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .head {
    border: 1px solid #d0d0d0;
    margin-left: 10rpx;
    margin-top: 10rpx;
    height: 50px;
    width: 50px;
  }

  .box {
    display: inline-flex;
    flex-direction: row;
  }

  .box1 {
    display: inline-flex;
    flex-direction: column;
  }

  .box2 {
    display: inline-flex;
    flex-direction: row;
  }

  .p1 {
    margin-left: 10rpx;
  }


  .p3 {
    color:#888888;
    margin-left: 10rpx;
    margin-top: 10px;
  }

</style>
