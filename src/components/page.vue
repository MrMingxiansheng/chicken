<template>
  <div class="page" bindtap="suo">
    <a href="/pages/login/main"><span class="p">{{city}}</span></a>
    <div class="search">
      <div class="search_arr">
        <icon class="searchcion" size="20" type="search"></icon>
        <input type="search" placeholder="输入楼盘名称或小话题搜索" />
        <a href="/pages/qwc/main" hover-class="none"><span class="seek">搜索</span></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        city: "杭州",
        inputText:''
      };
    },
    methods: {
      clean () {
        this.inputText=''
      }
    }
  };

</script>

<style scoped>
  .p {
    margin-left: 20rpx;
    font-size: 18px;
    position: relative;
    top:8rpx;
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

  .seek {
    color:#888888;
    font-size: 19px;
    /*搜索*/
    position: relative;
    top:8rpx;
  }

  .page {
    display: flex;
    flex-direction: row;
    /*整体*/
    margin-top: 20rpx;
  }

</style>
