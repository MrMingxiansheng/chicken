<template>
  <div class="itemx" >
    <div class="tagList">
      <div class="tag" v-for="site in tagList" :key="site.id" @click.stop="toTopicPage(site)">
       <div class="arrowImage">
         <em></em><span></span>
       </div>
       <img :src="site.interact.user.head_url" alt="" class="headImage"/>
       {{ site.tag_name }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['tagList','real_estate_name','diff'],
    data(){
      return{
      }
    },
    methods: {
      toTopicPage(site) {
        let that = this
        let obj = {
          real_estate_name:this.real_estate_name,
          tag_id:site.id
        }
        if(that.diff){
          wx.redirectTo({
            url:'/pages/qwb/main?tag='+JSON.stringify(obj)
          })
        }else{
          wx.navigateTo({
            url:'/pages/qwb/main?tag='+JSON.stringify(obj)
          })
        }
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
    margin-top: 10rpx;
    margin-left: 6rpx;
  }

  .tag {
    padding: 0 20rpx;
    font-size: 12px;
    color: rgba(10, 10, 10, 0.774);
    background: #e8e8e8;
    font-weight: 700;
    line-height: 60rpx;
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 0 10rpx 40rpx;
    position:relative;
    border-radius: 8px 8px 8px 0;
  }

  .arrowImage {
    border-width: 12rpx;
    position: absolute;
    bottom: 0;
    left: -20rpx;
    border-style: dashed solid solid dashed;;
    border-color: transparent #e8e8e8 #e8e8e8 transparent;
  }

  .headImage {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    vertical-align: middle;
    /*图居中*/
  }

</style>
