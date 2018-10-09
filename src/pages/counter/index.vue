<template>
  <div>
    <div class="home">
      <div class="home-center">{{build}}</div>
      <div class="browse-right">{{num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" class="item">
        <div class="box">
          <topic v-for="site in dataList" :item="site" :key="site"></topic>
        </div>
    </scroll-view>
    <div class="item2">
      <line />
      <ul>
        <li>
          <button open-type="share" class="share" plain="true" @click="ClickShare">分享</button>
        </li>
        <li>
          <a class="publish" hover-class="none" href='/pages/qwa/main'>发表小话题</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemx from "@/components/itemx"
  import topic from "@/components/topic"
  export default {
    components: {
      line,
      itemx,
      topic
    }, // 数据
    data() {
      return {
        scrollHeight: "",
        num: "",
        build: "",
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
      let that = this
      wx.getStorage({
        key: 'real_estate_name', //楼盘名字
        success: function (res) {
          that.build = res.data
          console.log('楼盘',that.build)
        }
      })
      wx.getStorage({
        key: 'real_estate_id', //楼盘ID
        success: function (res) {  
           let param={
             real_estate_id: res.data
           };  
           let temp = {}
           that.dataList = []
            that.$get('api/queryRealEstateDetail',param).then(function (res){
              that.num = res.data.realEstate.views_num
              temp.tag_name = res.data.tagList[0].tag_name
              temp.views_num = res.data.tagList[0].views_num //没有
              temp.interact_content = res.data.tagList[0].interact.interact_content
              
                let user_id={
                  user_id: res.data.tagList[0].user_id
                }
                 that.$get('api/queryUserDetail',user_id).then(function (res){
                   temp.user_name = res.data.user.user_name
                   temp.user_type = res.data.user.user_type //没有
                   temp.head_url = res.data.user.head_url
                 })
                        
              })
              that.dataList.push(temp)  //把数据push到数组里
              console.log('数据',temp)
        }
      })
    },
    onReady() {
      console.log("ScrollViewHeight")
      this.ScrollViewHeight()
    },
    // 计算属性
    computed: {},
    // created生命周期，组件创建后执行
    methods: {
      ScrollViewHeight() {
        let that = this
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let scrollHeight = windowHeight - 85;
        that.scrollHeight = scrollHeight;
        //读取机型全屏高度，减去固定高度获得scroll高度
      },
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

  .box {
    margin-left: 20rpx;
    margin-bottom: 20rpx;
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
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 50rpx;
    border: none;
  }

  .publish {
    color: #c5a500;
    font-size: 20px;
    text-align: center;
  }

</style>
