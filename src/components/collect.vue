<template>
  <div>
    <div class="collect" v-for="site in dataList" :key="site" v-if="real_estate_name">
      <div>
      <div class="collect-build">{{site.real_estate_name}}</div>
      <ul>
        <li>
          <div class="border" @click="ClickTag_name(site)">{{ site.tag_name }}</div>
        </li>
      </ul>
    </div>
    <line />
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line,
    },

    data() {
      return {
        dataList: [],
        real_estate_name:'',
        tag_name:''
      }
    },
    onLoad: async function () {
        let that = this
        let isLogin = await this.$isLogin()
        if (!isLogin) {
          //handle error
          return
        }
        let collect = {}
        let arr = []
        let collectId = {
          user_id: isLogin
        }
        console.log(collectId)
        that.$get('api/queryUserDetail', collectId).then(function (res) {
          for (let i = 0; i < res.data.recordList.length; i++) {
            if (res.data.recordList[i].record_type === '收藏记录') {
              that.dataList.push(res.data.recordList[i]) //push后dataList变为收藏记录的数组
            }
          }
              for (let j = 0; j < that.dataList.length; j++) {
              let tag_id = {
              tag_id: that.dataList[j].tag_id //获取对应的tag_id
            }
            that.$get('api/queryTagDetail', tag_id).then(function (res) { //查询对应的tag_name和real_estate_id
              that.dataList[j].tag_name = res.data.tag.tag_name
              that.tag_name = res.data.tag.tag_name
              // collect.tag_name = res.data.tag.tag_name
              // console.log('对象话题名字', collect.tag_name)
              collect.real_estate_id = res.data.tag.real_estate_id
              let first_id = {
                real_estate_id: res.data.tag.real_estate_id
              }
              that.$get('api/queryRealEstateDetail', first_id).then(function (res) { //查询对应楼盘名
               that.dataList[j].real_estate_name = res.data.realEstate.real_estate_name
               that.real_estate_name = res.data.realEstate.real_estate_name
                // collect.real_estate_name = res.data.realEstate.real_estate_name
                // console.log('对象楼盘名字', collect.real_estate_name)
                // that.dataList.push(collect)
                // console.log('一个对象', collect)
                console.log('总', that.dataList)
              })
        })
            }
        })
      },
      methods: {
        ClickTag_name: function (site) {
          let that = this
          wx.setStorage({
            key: 'tag_id', //话题ID
            data: site.tag_id,
            success: function (res) {}
          })
          wx.setStorage({
            key: 'tag_name', //话题名字
            data: site.tag_name,
            success: function (res) {}
          })
          wx.navigateTo({
            url: '/pages/qwb/main'
          })
        }
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

