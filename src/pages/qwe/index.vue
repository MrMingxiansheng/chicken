<template>
  <div>
      <div class='page' bindtap="suo">
    <div class="search">
      <div class="search_arr">
        <icon class="searchcion" size='20' type='search'></icon>
        <input class="" disabled placeholder="请输入关键字"/>
      </div>
    </div>
    <div class='sousuo'>搜索</div>
  </div>

  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line,
    },

    data() {
      return {
    lists: [],              // 接收搜索的内容
    wxSearchData: '',       // 输入的值
      }
    },
    methods: {
         suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 监听软键盘确认键
   */
  wxSearchConfirm: function (e) {

  },

  /**
   * 返回
   */
  back: function (e) {
    wx.navigateBack({
      delta: 1,
    })
  }
    },  
}
</script>

<style scoped>
 .search{
  width: 80%;
}
.search_arr {
  border: 1px solid #d0d0d0;
  border-radius: 10rpx;
  margin-left: 20rpx;
}
.search_arr input{
  margin-left: 60rpx;
  height: 60rpx;
  border-radius: 5px;
}
.bc_text {
  line-height: 68rpx;
  height: 68rpx;
  margin-top: 34rpx;
}
 
.sousuo {
  margin-left: 15rpx;
  width: 15%;
  line-height: 150%;
  text-align: center;
  border: 1px solid #d0d0d0;
  border-radius: 10rpx;
}
.page{
  display: flex;
  flex-direction: row
}
.searchcion {
  margin: 10rpx 10rpx 10rpx 10rpx;
  position: absolute;
  left:25rpx;
  z-index: 2;
  width: 20px;
  height: 20px;
  text-align: center;
}


</style>
