<template>
  <div class="hot" v-if="item.real_estate_name">
    <div class="title" @click="toTopicPage"><a href="/pages/counter/main" hover-class="none">{{item.real_estate_name}}</a></div>
    <div class="view">
      <div class="num">
        <span class="tagNum">{{tagList.length}}话题</span>
        <span class="viewNum">&ensp;&ensp;{{item.views_num}}阅读</span>
      </div>
      <div class="sendTopic" @click="toTopicPage"><a href="/pages/counter/main" hover-class="none">发话题</a></div>
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
        console.log('tag',that.tagList)
      }, function (res) {
        // failure
      });
    },
    methods: {
      toTopicPage: function () {
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
      }
    }
  }

</script>

<style scoped>
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
</style>
