<template>
  <div class="topic">
    <div class="box">
      <div class="box1">
        <a href="/pages/qwd/main">
          <div class="bor">
            <div class="border1"></div>
            <span>{{owner}}{{identity}}</span>
          </div>
        </a>
        <a href="/pages/qwb/main">
          <span class="title">"{{topic}}"</span></a>
        <div class="talk">
          <span class="number">{{num}}讨论</span>
          <span class="send" decode="ensp"><a href="#">&ensp;讨论&ensp;</a></span>
        </div>
      </div>
      <div class="box2" v-for="(site,index) in sites" :key="site" v-if="index<=3">
        <a href="/pages/qwb/main">
        <div class="item">
          <div class="border2"></div>
          <span class="name" decode="ensp">{{name}}{{identity}}:&ensp;{{message}}</span>
        </div>
        </a>
      </div>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line
    },
    data() {
      return {
        topic: "高铁",
        owner: "程咬金",
        identity:"(销售)",
        name: "程咬金",
        message: "程咬金说这个地方很糟糕veryveryveryverylow",
        num: 0,
        sites: [{}]
      };
    },
    methods: {}
  };

</script>

<style scoped>
  .bor {
    display: flex;
    flex-direction: row;
  }

  .bor span {
    color: #c5a500;
    font-size: 16px;
  }

  .title {
    font-size: 25px;
  }

  .border1 {
    border: 1px solid #d0d0d0;
    height: 16px;
    width: 16px;
    margin-top: 3px;
  }

 .border2 {
    border: 1px solid #d0d0d0;
    height: 16px;
    width: 16px;
    position: relative;
    bottom:3px;
  }

  .number {
    color: #888888;
  }

  .send {
    color: #c5a500;
  }

  .talk {
    display: flex;
    flex-direction: row;
    font-size: 15px;
  }

  .item {
    display: flex;
    flex-direction: row;
    font-size:17px;
    align-items: center;
  }

  .box2 { 
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    flex: auto;
    width: 100%;
  }

  .name {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 300px;
    display: block;
    white-space: nowrap;
    /*过长省略*/
  }

</style>
