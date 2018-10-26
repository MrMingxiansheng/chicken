<template>
  <div class="hot" v-if="item.real_estate_name">
    <div class="view">
      <div class="title" @click="toRealEstatePage()">{{item.real_estate_name}}</div>
      <img src="/static/images/more.png" class="sendTopic" @click="toRealEstatePage()" />
      <!-- <div class="sendTopic" @click="toRealEstatePage()">发话题</div> -->
    </div>
      <div class="num">
        <span class="tagNum" decode="ensp">话题&ensp;{{item.tagList.length}}</span>
        <span class="viewNum" decode="ensp">&ensp;&ensp;阅读&ensp;{{item.views_num}}</span>
    </div>
    <div class="bottom">
    <itemx :tagList="item.tagList" :real_estate_name="item.real_estate_name"></itemx>
    </div>
    <!-- <line /> -->
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
    onLoad (){
    },
    methods: {
      toRealEstatePage(){
        let that = this
        wx.navigateTo({
          url:'/pages/counter/main?real='+JSON.stringify(that.item)
        })
      }
    }
  }

</script>

<style scoped>
.hot{
  box-shadow:  10rpx 10rpx 10rpx rgb(211, 209, 209);/*边框阴影*/
  margin:40rpx 0;
}

.title{
  font-size: 21px;
  font-weight:700;/*字体加粗*/
  color:rgb(53, 61, 68);
}
.view{
  margin-left:16rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

 .num{
  font-size: 11px;
  color: rgb(141, 148, 141);
  margin: 10rpx 16rpx;
  font-weight:700;/*字体加粗*/
}
 .sendTopic{
   width:40rpx;
   height:40rpx;
  margin-right:20rpx;
}
.bottom{
  padding-bottom: 15rpx;
}

</style>
