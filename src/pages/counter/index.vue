<template>
  <div>
    <div class="home">
      <div class="home-center">{{build}}</div>
      <div class="browse-right">{{num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" class="item">
    <div class="pop">热门话题</div>
    <div class="box">
      <div class="item1">
        <itemr></itemr>
      </div>
      <line />
      <div>
        <topic v-for="site in dataList" :item="site" :key="site"></topic>
      </div>
    </div>
    </scroll-view>
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
        scrollHeight:"",
        num: "2200",
        build: "未来城瓦课程",
        sites: [{}],
        dataList:
        [
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
          {
             topic: "高铁",
             owner: "程咬金",
             userType:"(销售)",
             user: "程咬金",
             content: "程咬金说这个地方很糟糕veryveryveryverylow",
          },
        ], 
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
    onReady (){
      console.log("ScrollViewHeight")
      this.ScrollViewHeight()
    },
    // 计算属性
    computed: {},
    // created生命周期，组件创建后执行
    methods: {
<<<<<<< HEAD
      ScrollViewHeight() {
     let that = this
     let windowHeight = wx.getSystemInfoSync().windowHeight;
     let scrollHeight = windowHeight -85;
     that.scrollHeight = scrollHeight;
     //读取机型全屏高度，减去固定高度获得scroll高度
    },
=======
  
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
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
    position: fixed;
    width: 100%;
    text-align: center;
    font-size:22px;
  }

  .browse-right {
    position: fixed;
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

<<<<<<< HEAD
  .item1 {
    margin-left: 20rpx;
    margin-bottom: 20rpx;
=======
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
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
  }

  .item2 {
    width: 100%;
    position: fixed;
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
