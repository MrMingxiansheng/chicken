<template>
  <div class="hot" v-if="item.real_estate_name" @click="toRealEstatePage()">
    <div class="view">
      <div class="title">{{item.real_estate_name}}</div>
      <div class="num">
        <span class="tagNum" decode="ensp">话题&ensp;{{item.tagList.length}}</span>
        <span class="viewNum" decode="ensp">&ensp;&ensp;阅读&ensp;{{item.views_num}}&ensp;&ensp;</span>
        <img src="/static/images/more.png" class="sendTopic" />
      </div>
    </div>
    <div class="bottom">
      <itemx :tagList="itemxList" :real_estate_name="item.real_estate_name" :diff="diff"></itemx>
    </div>
  </div>
</template>

<script>
  import itemx from "@/components/itemx"
  export default {
    components: {
      itemx
    },
    props: ['item', 'diff'],
    data() {
      return {
        real_estate_area: '',
        showArea: false,
        itemxList: []
      }
    },
    onLoad() {
      let that = this
      if (!that.item.tagList) {
        that.item.tagList = []
      }
      that.$get('api/queryRealEstateDetail', {
        real_estate_id: that.item.id
      }).then(function (res) {
        that.itemxList = res.data.tagList.splice(0,6)
      })
    },
    methods: {
      toRealEstatePage() {
        let that = this
        if (that.diff) {
          wx.redirectTo({
            url: '/pages/counter/main?realEstateId=' + that.item.id
          })
        } else {
          wx.navigateTo({
            url: '/pages/counter/main?realEstateId=' + that.item.id
          })
        }
      }
    }
  }

</script>

<style scoped>
  .hot {
    box-shadow: 10rpx 10rpx 10rpx rgb(211, 209, 209);
    /*边框阴影*/
    margin: 40rpx 0;
  }

  .title {
    font-size: 21px;
    color: rgb(53, 61, 68);
  }

  .view {
    margin-left: 16rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 700;
    /*字体加粗*/
  }

  .num {
    font-size: 11px;
    color: rgb(141, 148, 141);
    font-weight: 700;
    /*字体加粗*/
    text-align: center;
  }

  .sendTopic {
    width: 40rpx;
    height: 40rpx;
    margin-right: 20rpx;
    vertical-align: middle;
    margin-bottom: 10rpx;
  }

  .bottom {
    padding-bottom: 15rpx;
  }

</style>
