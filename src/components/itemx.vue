<template>
  <div class="itemx" >
    <div class="tagList">
      <div :class="currentIndex===index?'tag2':'tag1'"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6"  @click="toTopicPage(site)">{{ site.tag_name }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tagList'],
    data(){
      return{
        currentIndex:''
      }
    },
    methods: {
      toTopicPage(site) {
        let obj = {
          tag_name:site.tag_name,
          views_num:site.views_num,
          user_id:site.user_id,
          real_estate_id:site.real_estate_id,
          id:site.id
        }
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)
        })
      },

      down(index){
        this.currentIndex = index
      },
      up(){
        this.currentIndex = ''
      }
    }
  };

</script>

<style scoped>
  .tagList {
    width: 750rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10rpx;
    margin-left: 5rpx;
  }

  .tag1 {
    width: 230rpx;
    background-color: #f8f8f8;
    font-size: 13px;
    line-height: 60rpx;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }

  .tag2 {
    width: 230rpx;
    background-color: #ffe144;
    font-size: 13px;
    line-height: 60rpx;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
  }


</style>
