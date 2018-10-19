<template>
  <div>
    <div class="item">
      <div class="border" @click="ClickTag_name">{{ tag.tag_name }}</div>
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
    props:['tag'],
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
              console.log('用户点击确定')
              that.$get('api/update', updateTemp).then(function (res) {
                let myDetail = wx.getStorageSync('myDetail')
                for(let i=0; i<myDetail.tagList.length; i++){
                  if(myDetail.tagList[i].id === that.tag.id){
                    myDetail.tagList.splice(i,1)
                    break
                  }
                }
                wx.setStorage({
                  key:'myDetail',
                  data:myDetail,
                  success(){
                    that.$emit('reGetStorage')
                  }
                })
                console.log('成功', res)
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
          tag_name: this.tag.tag_name,
          views_num: this.tag.views_num,
          user_id: this.tag.user_id,
          real_estate_id: this.tag.realEstate.id,
          id: this.tag.id
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
    font-size: 13px;
    align-items: baseline;
    position: relative;
  }

  .my-topic {
    margin-right: 120rpx;
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

  .min {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    right: 20rpx;
    top: 30rpx;
  }

</style>
