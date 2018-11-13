<template>
<div class="top" @click="toRealEstatePage()">
  <div class="img" v-if="item.real_estate_area">
      <img :src="picture" class="picture"  />
  </div>
  <div class="middle" v-if="item.real_estate_area" >
      <div class="area">{{real_estate_area}}</div>
  </div>
  <div class="bottom" v-if="item.real_estate_name" >
      <div class="title">{{item.real_estate_name}}</div>
  </div>
</div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        picture: '',
        real_estate_area: '',
      }
    },
    onLoad() {
      let articleArr = this.item.real_estate_area.split('https://')
      this.real_estate_area = articleArr[0]
      this.picture = 'https://' + articleArr[1] + '?date=' + JSON.stringify(new Date())
    },

    methods: {
      toRealEstatePage() {
        let that = this
        wx.navigateTo({
          url:'/pages/counter/main?realEstateId='+that.item.id
        })
      }
    }
  }

</script>

<style scoped>

  .top{
    width: 132rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    color: rgb(53, 61, 68);
    font-weight: 700;
  }
  
  .picture {
    width: 100rpx;
    height: 100rpx;
  }
  

</style>