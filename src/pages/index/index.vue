<template>
  <div id="app">
    <i-notice-bar icon="systemprompt" loop>
      小鸡评房正在准备评测未来悦，请大家持续关注！小鸡评房正在准备评测未来悦，请大家持续关注！
    </i-notice-bar>
    <div>
      <page></page>
    </div>
    <!-- <div class="timg">
      <img src="/static/images/timg.jpg" />
    </div> -->
    <topswiper :tops="tops"></topswiper> 
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
  import topswiper from "@/components/topSwiper"
  export default {
    components: {
      line,
      hot,
      page,
      topswiper
    }, //声明在当前组件下使用组件
    data() {
      return {
        sites: [""],
        tops : [
          {imgSrc:'/static/images/timg.jpg'},
          {imgSrc:'/static/images/timg1.jpg'},
          {imgSrc:'/static/images/timg2.jpg'}
        ]
      }
    },
    methods: {}
  }

</script>

<style scoped>
  .timg {
    width: 750rpx;
    height: 200rpx;
  }

  .timg img {
    width: 100%;
    height: 100%;
  } */

  .topic {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
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
