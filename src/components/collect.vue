<template>
  <div class="collect">
    <div class="item">
      <div class="border" @click="test">{{ record.tag.tag_name }}</div>
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
          views_num:this.record.tag.views_num,
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
    font-size: 13px;
    align-items: baseline;
  }

  .collect-build {
    margin-right: 20rpx;
  }

  .border {
    width: 230rpx;
    /* background-color: #f8f8f8; */
    line-height: 60rpx;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    box-sizing: border-box;
    margin: 20rpx 20rpx;
  }

</style>
