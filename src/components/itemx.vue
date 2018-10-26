<template>
  <div class="itemx" >
    <div class="tagList">
<<<<<<< HEAD
      <div class="tag"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6 || (real_estate_name === '杭州楼市小闲话' && index<9)"  @click="toTopicPage(site)">{{ site.tag_name }}</div>
=======
      <div class="tag"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6"  @click="toTopicPage(site)">{{ site.tag_name }}</div>
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
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
          tag_name:site.tag_name,
          user_id:site.user_id,
          real_estate_name:this.real_estate_name,
          id:site.id
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
<<<<<<< HEAD
    margin-left: 6rpx;
=======
    margin-left: 5rpx;
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
  }

  .tag {
    width: 230rpx;
    font-size: 13px;
    color:rgb(141, 148, 141);
    font-weight:700;/*字体加粗*/
    line-height: 60rpx;
    border: 2px solid rgb(141, 148, 141);
    border-radius:5px;/*弧度*/
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }
<<<<<<< HEAD
  
  .tag:hover {
    width: 230rpx;
    font-size: 13px;
    background: rgb(141, 148, 141);
    color:rgb(255, 255, 255);
    font-weight:700;/*字体加粗*/
    line-height: 60rpx;
    border: 2px solid rgb(141, 148, 141);
    border-radius:5px;/*弧度*/
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }
=======
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6

</style>
