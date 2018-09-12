<template>
  <div id="app">
    <i-notice-bar icon="systemprompt" loop>
      小鸡评房正在准备评测未来悦，请大家持续关注！小鸡评房正在准备评测未来悦，请大家持续关注！;
    </i-notice-bar>
    <div>
      <page></page>
    </div>
    <div class="timg">
      <img src="/static/images/timg.jpg" />
    </div>
    <div class="topic">
      <p>热门话题</p>
      <div class="hot-topic">
        <itemx></itemx>
      </div>
      <p>热门楼盘</p>
    </div>
    <line />
    <div class="Hot">
      <hot v-for="site in sites" :key="site"></hot>
    </div>
  </div>
</template>

<script>
  //导入组件
  import line from "@/components/line"
  import hot from "@/components/hot"
  import page from "@/components/page"
  import itemx from "@/components/itemx"
  export default {
    components: {
      line,
      hot,
      page,
      itemx
    }, //声明在当前组件下使用组件
    data() {
      return {
        sites: [""]
      }
    },
    methods: {}
  }

</script>

<style scoped>
  .timg {
    width: 800rpx;
    height: 200rpx;
  }

  .timg img {
    width: 100%;
    height: 100%;
  }

  .topic {
    display: flex;
    flex-direction: column;
  }

  .topic p {
    font-size: 16px;
    margin-left: 20rpx;
    margin-top: 20rpx;
  }

  .hot-topic {
    margin-left: 30rpx;
  }

  /* <a href="/pages/counter/main">
          <li>{{ site.name }}</li>
          </a>     
   重要 ，将for循环列表元素分别链接       
*/

</style>
