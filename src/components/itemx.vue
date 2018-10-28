<template>
  <div class="itemx" >
    <div class="tagList">
      <div class="tag"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6 || (real_estate_name === '杭州楼市小闲话' && index<9)"  @click="toTopicPage(site)">{{ site.tag_name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tagList','real_estate_name'],
    methods: {
      toTopicPage(site) {
        console.log(this.real_estate_name)
        let obj = {
          real_estate_name:this.real_estate_name,
          tag_id:site.id
        }
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)
        })
      },
    }
  };

</script>

<style scoped>

  .tagList {
    width: 750rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10rpx;
    margin-left: 6rpx;
  }

  .tag {
    padding: 0 20rpx;
    font-size: 12px;
    color:rgba(10, 10, 10, 0.774);
    background: #f5f5f5;
    font-weight:700;/*字体加粗*/
    line-height: 60rpx;
    /* border: 2px solid rgb(141, 148, 141); */
    /* border-radius:5px;弧度 */
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }
  
  /* .tag:hover {
    width: 230rpx;
    font-size: 13px;
    background: rgb(141, 148, 141);
    color:rgb(255, 255, 255);
    font-weight:700;字体加粗
    line-height: 60rpx;
    border: 2px solid rgb(141, 148, 141);
    border-radius:5px;弧度 */
    /* text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  } */

</style>
