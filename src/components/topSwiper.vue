<template>
  <swiper indicator-dots="true" indicator-active-color=rgba(255,225,64,.7) autoplay="true" interval="3000" duration="1000"
    circular="true">
    <div :key="imgIndex" v-for="(top,imgIndex) in tops">
      <swiper-item>
        <img :src="top.imgSrc">
      </swiper-item>
    </div>
  </swiper>

</template>

<script>
  export default {
    props: ['tops']
  }

</script>

<style scoped>
  swiper {
    width: 750rpx;
    height: 330rpx;
    overflow: hidden;
    margin-top: 76rpx;
  }

  swiper img {
    width: 750rpx;
    height: 330rpx;
  }

</style>
