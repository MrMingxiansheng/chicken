<template>
  <div class="page" bindtap="suo">
    <a href="/pages/login/main"><span class="p">{{city}}</span></a>
    <div class="search">
      <div class="search_arr">
        <icon class="searchcion" size="20" type="search"></icon>
        <input type="search" placeholder="输入楼盘名称或小话题搜索" />
        <a href="/pages/qwc/main"><span class="seek">搜索</span></a>
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

    }
  };

</script>

<style scoped>
  .p {
    margin-left: 10px;
    font-size: 18px;
    position: relative;
    top: 2px;
  }

  .search_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 300px;
    height: 30px;
    margin-bottom: 10px;
    margin-left: 10px;
  }

  .searchcion {
    margin: 10rpx 10rpx 10rpx 10rpx;
    position: absolute;
    left: 55px;
    z-index: 2;
    width: 20px;
    height: 20px;
    text-align: center;
    /*搜索图标*/
  }

  .search_arr input {
    margin-left: 30px;
    height: 30px;
    border-radius: 5px;
    width: 220px;
    font-size: 17px;
    /*input框内*/
  }

  .seek {
    color:#888888;
    font-size: 19px;
    /*搜索*/
    position: relative;
    top: 2px;
  }

  .page {
    display: flex;
    flex-direction: row;
    /*整体*/
    margin-top: 10px;
  }

</style>
