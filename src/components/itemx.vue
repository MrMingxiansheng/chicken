<template>
  <div class="itemx" >
    <div class="tagList">
      <div class="tag"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6" @click="toTopicPage(site)">{{ site.tag_name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tagList'],
    methods: {
      toTopicPage(site) {
        wx.navigateTo({
          url:'/pages/topic/main?tag='+JSON.stringify(site)
        })
      }
    }
  };

</script>

<style scoped>
  .tagList {
    width: 750rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10rpx;
  }

  .tag {
    width: 230rpx;
    background-color: #f8f8f8;
    font-size: 13px;
    line-height: 60rpx;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }

</style>
