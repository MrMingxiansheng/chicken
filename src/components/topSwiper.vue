<template>
  <swiper indicator-dots="true" indicator-active-color=rgba(255,225,64,.7) autoplay="true" interval="4000" duration="1000"
    circular="true">
    <div :key="index" v-for="(info,index) in tops" @click="toAd(info.adSrc)">
      <swiper-item>
        <img :src="info.imgSrc">
      </swiper-item>
    </div>
  </swiper>

</template>

<script>
  export default {
    props: ['tops'],
    methods:{
      toAd(src){
        wx.navigateTo({
          url: '/pages/article/main?src=' + src
        })
      }
    }
  }

</script>

<style scoped>
  swiper {
    width: 750rpx;
    height: 210rpx;
    overflow: hidden;
    margin-top: 100rpx;
  }

  swiper img {
    width: 750rpx;
    height: 210rpx;
  }

</style>
