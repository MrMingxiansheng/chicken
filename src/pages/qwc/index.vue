<template>
  <div>
    <div class="page-search">
      <div class="search_that.arr">
        <icon class="searchcion" size="20" type="search"></icon>
        <input type="search" placeholder="输入楼盘名称或小话题搜索" v-model="searchValue" focus="true" />
      </div>
      <div class="sousuo" @click="suo">搜索</div>
    </div>
    <div class="Hot">
      <hot :item="site" v-for="site in sites" :key="site"></hot>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import hot from "@/components/hot"
  export default {
    components: {
      line,
      hot,
    },
    data() {
      return {
        sites: [],
        arr: [],
        searchValue: "",
      };
    },

    methods: {
      suo: function () {
        let that = this;
        that.arr = [] //空值
        that.sites = []
        let searchValue = that.searchValue
        console.log('长度', searchValue.length)
        if (searchValue.length > 0) {
          let sites = wx.getStorage({
            key: 'queryRealEstateList',
            success: function (res) {
              console.log('搜索：', res)
              //查找匹配搜索
              for (let i in res.data) {
                res.data[i].show = false
                if (res.data[i].real_estate_name.indexOf(searchValue) >= 0) { //insecOf用法
                  res.data[i].show = true
                  that.arr.push(res.data[i])
                }
              }
              if (that.arr.length == 0) {

              } else {
                that.sites = that.arr
              }
            },
            fail() {
              wx.showToast({
                title: '网络异常！',
                duration: 2000
              })
            }
          })
        }
      }
    }
  }

</script>

<style scoped>
  .page-search {
    display: flex;
    flex-direction: row;
    /*整体*/
    margin-top: 20rpx;
  }

  .search_that.arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 600rpx;
    height: 60rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .searchcion {
    margin: 10rpx 10rpx 10rpx 10rpx;
    position: absolute;
    left: 20rpx;
    z-index: 2;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    /*搜索图标*/
  }

  .search_that.arr input {
    margin-left: 60rpx;
    height: 60rpx;
    border-radius: 5px;
    width: 440rpx;
    font-size: 17px;
    /*input框内*/
  }


  .sousuo {
    font-size: 17px;
    margin-left: 15rpx;
    width: 100rpx;
    height: 60rpx;
    line-height: 150%;
    text-align: center;
    border: 1px solid #d0d0d0;
    border-radius: 10rpx;
  }

</style>
