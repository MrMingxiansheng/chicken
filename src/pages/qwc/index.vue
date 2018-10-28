<template>
  <div>
    <div class="page-search">
      <div class="search_that.arr">
        <icon class="searchcion" size="17" type="search"></icon>
        <input type="text" placeholder="输入楼盘名称或小话题搜索" v-model="searchValue" focus="true" />
      </div>
      <div class="sousuo" @click="suo">搜索</div>
    </div>
    <div class="content">{{content}}</div>
    <div class="Hot">
      <hot :item="site" v-for="site in sites" :key="site"></hot>
    </div>
    <div class="collect" v-for="(list,index) in dataList" :key="index">
      <div class="item">
        <div class="collect-tag_name" @click="toTopicPage(list)">{{ list.tag_name }}</div>
        <div class="collect-build">{{list.real_estate_name}}</div>
      </div>
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
        dataList: [],
        searchValue: '',
        content: '',
      };
    },
    onUnload() {
      this.searchValue = ''
      this.content = ''
      this.sites = []
      this.dataList = []
    },
    methods: {
      suo: function () {
        let that = this;
        that.content = ''
        that.sites = [] //空值
        that.dataList = []
        let searchValue = that.searchValue
        console.log('长度', searchValue.length)
        if (searchValue.length > 0) {
          wx.getStorage({
            key: 'queryRealEstateList',
            success: function (res) {
              //查找匹配搜索
              for (let i in res.data) {
                wx.showLoading({
                  title: '正在加载',
                  mask: true
                })
                if (res.data[i].real_estate_name.indexOf(searchValue) >= 0) { //insecOf用法
                  that.content = ''
                  that.sites.push(res.data[i])
                }
                for (let j = 0; j < res.data[i].tagList.length; j++) {
                  if (res.data[i].tagList[j].tag_name.indexOf(searchValue) >= 0) { //insecOf用法
                    res.data[i].tagList[j].real_estate_name = res.data[i].real_estate_name
                    that.content = ''
                    that.dataList.push(res.data[i].tagList[j])
                    let temp = JSON.parse(JSON.stringify(that.dataList))
                    that.dataList = []
                    that.dataList = temp
                  }
                }
                if (that.sites.length !== 0 || that.dataList.length !== 0) {
                  wx.hideLoading({
                    success() {
                      that.content = ''
                    }
                  })
                } 
                if (that.sites.length == 0 && that.dataList.length == 0) {
                  wx.hideLoading({
                    success() {
                      that.content = 'Sorry!没有搜到相关信息。。'
                    }
                  })
                }
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
      },
      toTopicPage(list) {
        console.log('taglist', this.dataList)
        let obj = {
          tag_name: list.tag_name,
          views_num: list.views_num,
          user_id: list.user_id,
          real_estate_name: list.real_estate_name,
          id: list.id
        }
        wx.navigateTo({
          url: '/pages/qwb/main?tag=' + JSON.stringify(obj)
        })
      }
    }
  }

</script>

<style scoped>
  .page-search {
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #ffe144;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 88;
  }

  .search_that.arr {
    display: flex;
    flex-direction: row;
    width: 700rpx;
    height: 60rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
    background-color: #fff;
    border-radius: 7px;
  }

  .searchcion {
    margin: 15rpx;
    text-align: center;
    /*搜索图标*/
  }

  .search_that.arr input {
    margin-left: 20rpx;
    height: 60rpx;
    border-radius: 5px;
    width: 440rpx;
    font-size: 13px;
    /*input框内*/
  }

  .content {
    text-align: center;
    margin-top: 100rpx;
    font-size: 16px;
    color: rgb(137, 145, 150);
  }

  .sousuo {
    font-size: 17px;
    margin-left: 20rpx;
    width: 100rpx;
    height: 60rpx;
    line-height: 60rpx;
  }


  .item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    font-weight:700;/*字体加粗*/
    box-shadow:  10rpx 10rpx 10rpx rgb(211, 209, 209);/*边框阴影*/
  }

  .collect-build {
    margin-right: 15rpx;
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
    margin: 20rpx 15rpx;
  }

</style>
