<template>
  <div>
    <div class="home">
      <div class="home-center">{{real_estate_name}}</div>
      <div class="browse-right">{{views_num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'rpx'}" class="item">
      <div class="box">
        <topic v-for="(site,index) in dataList" :item="site" :key="index"></topic>
      </div>
    </scroll-view>
    <div class="item1">
      <line />
      <ul>
        <li>
          <button open-type="share" class="share" plain="true" @click="ClickShare">分享</button>
        </li>
        <li>
          <button class="publish" plain="true" @click="ClickPublish">发表小话题</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import topic from "@/components/topic"
  export default {
    components: {
      line,
      topic
    }, // 数据
    data() {
      return {
        scrollHeight: "",
        views_num: "",
        real_estate_name: "",
        real_estate_id: '',
        dataList: [],
      }
    },

    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '来程咬金这儿',
        path: '/pages/counter/main',
        imageUrl: ''
      }
    },

    onLoad() {
      this.ScrollViewHeight()
      this.getdDataList()
    },

    onUnload() {
      this.real_estate_name = ''
      this.views_num = ''
      this.dataList = []
    },

    // 计算属性
    computed: {},
    methods: {
      ScrollViewHeight() {
        let that = this
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let rwindowWidth = 750
        let px_to_rpx = rwindowWidth / windowWidth
        let rWindowHeight = windowHeight * px_to_rpx
        that.scrollHeight = rWindowHeight - 180;
        //读取机型全屏高度，减去固定高度获得scroll高度
      },

      ClickPublish: function () {
        let that = this
        wx.setStorage({
          key: 'real_estate_id', //楼盘ID
          data: that.real_estate_id,
          success: function (res) {}
        })
        wx.setStorage({
          key: 'real_estate_name', //楼盘名字
          data: that.real_estate_name,
          success: function (res) {}
        })
        wx.navigateTo({
          url: '/pages/qwa/main'
        })
      },

      getdDataList() {
        let that = this
        wx.getStorage({
          key: 'real_estate_name', //楼盘名字
          success: function (res) {
            that.real_estate_name = res.data
          }
        })
        wx.getStorage({
          key: 'real_estate_id', //楼盘ID
          success: function (res) {
            that.real_estate_id = res.data
            let param = {
              real_estate_id: res.data
            };
            that.$get('api/queryRealEstateDetail', param).then(function (res) {
              that.views_num = res.data.realEstate.views_num
              for (let i = 0; i < res.data.tagList.length; i++) {
                that.dataList = res.data.tagList
                let second_tag_id = {
                  tag_id: that.dataList[i].id
                }
                that.$get('api/queryTagDetail', second_tag_id).then(function (res) {
                  that.dataList[i].cnum = res.data.interactList[0].cnum
                  that.dataList[i].length = res.data.interactList.length
                  let temp = JSON.parse(JSON.stringify(that.dataList))
                  that.dataList = []
                  that.dataList = temp
                })
              }
            })
          }
        })
      }
    }
  }

</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
  }

  .home-center {
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 22px;
  }

  .browse-right {
    position: fixed;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 15px;
    right: 20rpx;
  }

  .item1 {
    width: 100%;
    position: fixed;
    bottom: 0;
    /*置底*/
  }

  .item1 ul {
    display: flex;
    flex-direction: row;
  }

  .item1 li {
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  .share {
    width: 120rpx;
    height: 70rpx;
    color: #f3cc01;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 50rpx;
    border: none;
  }

  .publish {
    width: 240rpx;
    height: 70rpx;
    color: #f3cc01;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 50rpx;
    border: none;
  }

</style>
