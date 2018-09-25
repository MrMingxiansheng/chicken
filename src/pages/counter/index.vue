<template>
  <div>
    <div class="home">
      <div class="home-center">{{build}}</div>
      <div class="browse-right">{{num}}浏览</div>
    </div>
    <line />
    <div class="pop">热门话题</div>
    <div class="box">
      <div class="item">
        <itemr></itemr>
      </div>
      <line />
      <div class="item1">
        <topic v-for="site in sites" :key="site"></topic>
      </div>
    </div>
    <div class="item2">
      <line />
      <ul>
        <li>
          <button open-type="share" class="share" plain="true" @click="ClickShare">分享</button>
        </li>
        <li>
          <a class="publish" hover-class="none" href='/pages/qwa/main'>发表小话题</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemr from "@/components/itemr"
  import topic from "@/components/topic"
  export default {
    components: {
      line,
      itemr,
      topic
    }, // 数据
    data() {
      return {
        num: "2200",
        build: "未来城瓦课程",
        sites: [{}]
      }
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '来程咬金这儿',
        path: '/pages/counter/main',
        imageUrl: ''
      }
    },
    // 计算属性
    computed: {},
    // created生命周期，组件创建后执行
    methods: {
  
    }
  }

</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
  }

  .home-center {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size:22px;
  }

  .browse-right {
    position: absolute;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 15px;
    right: 20rpx;
  }

  .pop {
    color: #888888;
    font-size: 15px;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    padding-left: 20rpx;
  }

  .box {
    display: flex;
    flex-direction: column;
  }

  .item {
    margin-left: 20rpx;
    margin-bottom: 20rpx;
  }

  .item1 {
    margin: 0px;
    padding: 0px;
    list-style: none;
  }

  .item1 ul {
    margin-top: 40rpx;
    margin-left: 1rpx;
  }

  .item1 li {
    font-size: 20px;
    padding-top: 20rpx;
  }

  .item2 {
    width: 100%;
    position: absolute;
    bottom: 0;
    /*置底*/
  }

  .item2 ul {
    display: flex;
    flex-direction: row;
  }

  .item2 li {
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  .share{
    width:120rpx;
    height:70rpx;
    color:#c5a500;
    font-size:20px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    line-height:50rpx;
    border:none;
  }

  .publish{
    color:#c5a500;
    font-size:20px;
    text-align:center;
  }

</style>
