<template>
  <div class="collect">
    <collectitem v-for="record in recordList" :key="record.id" :tag_id="record.tag_id"></collectitem>
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemx from "@/components/itemx"
  import collectitem from "@/components/collectItem"
  export default {
    components: {
      line,
      itemx,
      collectitem
    },
    onLoad(){
      let that = this
      wx.getStorage({
        key:'key',
        success:function(res){
          that.$get('api/queryUserDetail',{user_id:res.data.id}).then(function(obj){
            that.recordList = obj.data.recordList.filter(function(ele){
              return ele.record_type === '收藏记录'
            })
          })
        }
      })
    },
    data() {
      return {
        recordList:''
      }
    },
      methods: {
      
      }
  }

</script>

<style scoped>
  .collect {
    display: flex;
    flex-direction: column;
  }

  .collect-build {
    text-align: center;
    margin-top: 20rpx;
  }

  .item {
    margin-left: 30rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    font-size: 16px;
    float: left;
    width: 240rpx;
    color: #c5a500;
  }

  .border {
    border: 1px solid #d0d0d0;
    width: 200rpx;
    height: 40rpx;
    margin-bottom: 10rpx;
  }

</style>

