<template>
  <div class="hot" v-if="item.real_estate_name">
<<<<<<< HEAD
    <div class="title" @click="real_estate_name"><a href="/pages/counter/main" hover-class="none">{{item.real_estate_name}}</a></div>
    <div class="view">
      <div class="num">
        <span class="tagNum">{{tagList.length}}话题</span>
        <span class="viewNum">&ensp;&ensp;{{item.views_num}}阅读</span>
=======
    <div class="box">
      <a href="/pages/counter/main" hover-class="none">
          <div class="build" @click="ClickBuild">{{item.real_estate_name}}</div>
        </a>
      <div class="box1">
        <div class="topic">
          <span decode="ensp">&ensp;{{item.topic}}小话题&ensp;{{item.views_num}}浏览</span>
        </div>
        <div class="send" @click="sendTopic">发个小话题</div>
      </div>
      <div class="box2">
        <itemx :id="item.id"></itemx>
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
      </div>
      <div class="sendTopic" @click="sendTopic"><a href="/pages/qwa/main" hover-class="none">发话题</a></div>
    </div>
    <itemx :tagList="tagList"></itemx>
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
    props: ['item'],
    data() {
      return {
        tagList:''
      }
    },
    onLoad() {
      let that = this
      let param = {
        real_estate_id: this.item.id
      }
      that.$get('api/queryRealEstateDetail', param).then(function (res) {
        that.tagList = res.data.tagList || []
      }, function (res) {
        // failure
      });
    },
    onLoad (){
      
    },
    methods: {
      sendTopic: function () {
        let that = this
<<<<<<< HEAD
        wx.setStorage({
          key: 'real_estate_id', //楼盘ID
          data: that.item.id,
          success: function (res) {

          }
        })
        wx.setStorage({
          key: 'real_estate_name', //楼盘名字
          data: that.item.real_estate_name,
          success: function (res) {

          }
        })
      },
      real_estate_name: function () {
        let that = this
        wx.setStorage({
          key: 'real_estate_id', //楼盘ID
          data: that.item.id,
          success: function (res) {}
        })
        wx.setStorage({
          key: 'real_estate_name', //楼盘名字
          data: that.item.real_estate_name,
          success: function (res) {

          }
        })
=======
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
               wx.navigateTo({
                  url: '/pages/qwa/main'
                })
      },
      ClickBuild(){
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
               wx.navigateTo({
                  url: '/pages/counter/main'
                })
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
      }
    }
  }

</script>

<style scoped>
<<<<<<< HEAD
.title{
  font-size: 20px;
  text-align: center;
  margin-top: 10rpx;
}
.view{
  width: 700rpx;
  margin: 0 auto;
}
.view .num{
  float: left;
  font-size: 11px;
  color: rgb(137, 145, 150);
  margin-top: 10rpx;
}
.view .sendTopic{
  float: right;
  font-size: 12px;
  border: 1px solid rgb(229,229,229);
  padding: 10rpx;
}
=======
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
    font-size: 20px;
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

>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
</style>
