<template>
  <div class="hot" v-if="item.real_estate_name">
    <div class="title" @click="toRealEstatePage()">{{item.real_estate_name}}</div>
    <div class="view">
      <div class="num">
        <span class="tagNum">{{item.tagList.length}}话题</span>
        <span class="viewNum">&ensp;&ensp;{{item.views_num}}阅读</span>
      </div>
      <div class="sendTopic" @click="toRealEstatePage()">发话题</div>
    </div>
    <itemx :tagList="item.tagList" :real_estate_name="item.real_estate_name"></itemx>
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
