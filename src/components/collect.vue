<template>
  <div class="collect" v-if="record.tag.tag_name">
    <div class="item">
      <div class="collect-tag_name" @click="test">{{ record.tag.tag_name }}</div>
      <div class="collect-build">{{record.realEstate.real_estate_name}}</div>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemx from "@/components/itemx"
  export default {
    components: {
      line,
      itemx
    },
    props:['record'],
    onLoad(){
      
    },
    data() {
      return {
       
      }
    },
    methods: {
      test(){
        let obj = {
          tag_name:this.record.tag.tag_name,
          user_id:this.record.tag.user_id,
          real_estate_name:this.record.realEstate.real_estate_name,
          id:this.record.tag.id
        }
        wx.navigateTo({
          url: '/pages/qwb/main?tag=' + JSON.stringify(obj)
        })
      },
    }
  };

</script>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    font-weight:700;/*字体加粗*/
  }

  .collect-build {
    margin-right: 20rpx;
    font-size: 13px;
  }

  .collect-tag_name {
    padding: 0 20rpx;
    font-size: 12px;
    color:rgba(10, 10, 10, 0.774);
    background: #f5f5f5;
    line-height: 60rpx;
    text-align: center;
    box-sizing: border-box;
    margin: 20rpx 20rpx;
  }

</style>
