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
    width: 740rpx;
    height: 200rpx;
    margin-left: 5rpx;
    overflow: hidden;
  }

  swiper img {
    width: 740rpx;
    height: 200rpx;
  }

</style>
