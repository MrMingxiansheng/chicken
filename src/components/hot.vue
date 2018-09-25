<template>
  <div class="hot">
    <div class="box">
      <div class="box1">
        <div class="topic">
          <span decode="ensp">&ensp;{{topic}}小话题&ensp;{{browse}}浏览</span>
        </div>
        <a href="/pages/counter/main">
          <div class="build">{{build}}</div>
        </a>
        <div class="send"><a href="/pages/qwa/main">发个小话题</a></div>
      </div>
      <div class="box2">
        <itemx></itemx>
      </div>
    </div>
    <line />
  </div>
</template>

<script>
  import itemx from "@/components/itemx"
  import line from "@/components/line"
  export default {
    components: {
      itemx,
      line
    },
    data() {
      return {
        build: "未来城",
        topic: "20",
        browse: "10000"
      };
    },
    methods: {}
  };

</script>

<style scoped>
  .box2 {
    margin-left: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 10px;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .build {
    font-size: 24px;
    text-align: center;
  }

  .topic span {
    color: #888888;
    font-size: 11px;
  }

  .send {
    color: #c5a500;
    /*淡黄*/
    font-size: 15px;
    margin-top: 5px;
  }

</style>
