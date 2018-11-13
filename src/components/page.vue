<template>
  <div class="page" v-if="city" @click="test">
    <span class="city">{{city}}</span>
    <div class="search" @click="suo">
      <div class="search_arr">
        <icon class="searchcion" size="17" type="search"></icon>
        <input type="text" placeholder="输入楼盘名称或小话题搜索" disabled="true" 
        placeholder-style="font-size:13px;color:#ccc"
        />
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
      },
      test(){
        wx.setStorage({
          key:'userList',
          data:[],
          success(){
            console.log('缓存成功')
          }
        })
      }
    }
  }

</script>

<style scoped>
  .page {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #ffe144;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    height: 100rpx;
    padding: 20rpx 0;
    box-sizing: border-box;
  }

  .city {
    margin-left: 30rpx;
    font-size: 16px;
    position: relative;
    top: 8rpx;
  }

  .search_arr {
    display: flex;
    flex-direction: row;
    width: 600rpx;
    height: 60rpx;
    /* margin-bottom: 20rpx; */
    margin-left: 30rpx;
    background-color: #fff;
    border-radius: 7px;
  }

  .searchcion {
    margin: 15rpx;
    text-align: center;
    /*搜索图标*/
  }

  .search_arr input {
    margin-left: 60rpx;
    height: 60rpx;
    border-radius: 5px;
    width: 440rpx;
    /*input框内*/
  }
  
</style>
