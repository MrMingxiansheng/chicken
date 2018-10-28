<template>
  <div v-if="tag.tag_name">
    <div class="item">
      <div class="my-tag_name" @click="ClickTag_name">{{ tag.tag_name }}</div>
      <span class="my-topic">{{tag.realEstate.real_estate_name}}</span>
      <img src="/static/images/chacha.png" class="min" @click="removeImage">
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line
    },
    props:['tag','tagList','recordList'],
    methods: {
      removeImage() {
        let that = this
        let temp = {}
        temp.id = that.tag.id
        temp.tag_status = 'DELETE'
        let updateTemp = {
          'db': 'WpTagModel',
          'model': 'edit',
          'item': JSON.stringify(temp),
          'items': JSON.stringify(temp)
        }
        wx.showModal({
          title: '提示',
          content: '确定要删除话题吗?',
          success: function (res) {
            if (res.confirm) {
              wx.showLoading({
                title: '删除中',
                mask: true
              })
              console.log('用户点击确定')
              that.$get('api/update', updateTemp).then(function (res) {
                wx.hideLoading()
                for(let i=0; i<that.tagList.length; i++){
                  if(that.tagList[i].id === that.tag.id){
                    that.tagList.splice(i,1)
                    break
                  }
                }
                for(let i=0; i<that.recordList.length; i++){
                  if(that.recordList[i].tag_id === that.tag.id){
                    that.recordList.splice(i,1)
                    break
                  }
                }
                that.$reSetStorage('recordList',that.recordList)
                that.$reSetStorage('tagList',that.tagList)
                console.log('删除话题成功', res)
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
              return
            }
          }
        })

      },
      ClickTag_name: function () {
        let obj = {
          real_estate_name: this.tag.realEstate.real_estate_name,
          tag_id: this.tag.id
        }
        wx.navigateTo({
          url: '/pages/qwb/main?tag=' + JSON.stringify(obj)
        })
      }
    }
  };

</script>

<style scoped>
  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    position: relative;
    font-weight:700;/*字体加粗*/
  }

  .my-topic {
    margin-right: 120rpx;
    font-size: 13px;
  }

  .my-tag_name {
    padding: 0 20rpx;
    font-size: 12px;
    color:rgba(10, 10, 10, 0.774);
    background: #f5f5f5;
    line-height: 60rpx;
    text-align: center;
    box-sizing: border-box;
    margin: 20rpx 20rpx;
  }

  .min {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    right: 20rpx;
    top: 30rpx;
  }

</style>
