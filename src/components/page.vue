<template>
  <div class="page" v-if="city">
    <span class="city"><a href="/pages/qwd/main">{{city}}</a></span>
    <div class="search" @click="suo">
      <div class="search_arr">
        <icon class="searchcion" size="20" type="search"></icon>
        <input type="text" placeholder="输入楼盘名称或小话题搜索" disabled="true" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        city: "杭州",
      };
    },
    methods: {
      suo: function () {
        wx.navigateTo({
          url: '/pages/qwc/main',
        })
      }
    }
  }

</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: row;
    /*整体*/
    margin-top: 20rpx;
  }

  .city {
    margin-left: 20rpx;
    font-size: 18px;
    position: relative;
    top: 8rpx;
  }

  .search_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 600rpx;
    height: 60rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .searchcion {
    margin: 10rpx 10rpx 10rpx 10rpx;
    position: absolute;
    left: 110rpx;
    z-index: 2;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    /*搜索图标*/
  }

  .search_arr input {
    margin-left: 60rpx;
    height: 60rpx;
    border-radius: 5px;
    width: 440rpx;
    font-size: 17px;
    /*input框内*/
  }

</style>
