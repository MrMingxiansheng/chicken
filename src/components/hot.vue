<template>
  <div class="hot" v-if="item.real_estate_name">
    <div class="box">
      <div class="box1">
        <div class="topic">
          <span decode="ensp">&ensp;{{item.topic}}小话题&ensp;{{item.views_num}}浏览</span>
        </div>
        <a href="/pages/counter/main" hover-class="none">
          <div class="build" @click="real_estate_name">{{item.real_estate_name}}</div>
        </a>
        <div class="send" @click="sendTopic"><a href="/pages/qwa/main" hover-class="none">发个小话题</a></div>
      </div>
      <div class="box2">
        <itemx :id="item.id"></itemx>
      </div>
    </div>
    <line />
  </div>
</template>

<script>
  import itemx from "@/components/itemx"
  import line from "@/components/line"
  export default {
    components: {
      itemx,
      line
    },
    props:['item'],
    data() {
      return {
      };
    },
    methods: {
      sendTopic: function(){
        let that = this
         wx.setStorage({
                   key: 'real_estate_id', //楼盘ID
                   data: that.item.id,
                   success: function(res) {
                   
                }
               })
         wx.setStorage({
                   key: 'real_estate_name', //楼盘名字
                   data: that.item.real_estate_name,
                   success: function(res) {
                   
                }
               })
      },
      real_estate_name: function(){
        let that = this
        wx.setStorage({
                   key: 'real_estate_id', //楼盘ID
                   data: that.item.id,
                   success: function(res) {
                }
               })
        wx.setStorage({
                   key: 'real_estate_name', //楼盘名字
                   data: that.item.real_estate_name,
                   success: function(res) {
                   
                }
               })
      }
    }
  }

</script>

<style scoped>
  .box2 {
    margin-left: 30rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: 20rpx;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 10rpx;
  }

  .build {
    font-size: 24px;
    text-align: center;
  }

  .topic span {
    color: #888888;
    font-size: 11px;
  }

  .send {
    color: #c5a500;
    /*淡黄*/
    font-size: 15px;
    margin-top: 10rpx;
  }

</style>
