<template>
<<<<<<< HEAD
  <div class="collect">
    <collectitem v-for="record in recordList" :key="record.id" :tag_id="record.tag_id"></collectitem>
=======
  <div>
    <div class="collect" v-for="(item,itemIndex) in itemList" :key="itemIndex" >
      <div>
      <div class="collect-build">{{item.real_estate_name}}</div>
      <ul>
        <li v-for="(site,index) in dataList" :key="index">
          <div class="border" @click="ClickTag_name(site)">{{ site.tag_name }}</div>
        </li>
      </ul>
    </div>
    <line />
    </div>
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
  </div>
</template>

<script>
  import line from "@/components/line"
<<<<<<< HEAD
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
=======
  export default {
    components: {
      line,
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
    },
    data() {
      return {
<<<<<<< HEAD
        recordList:''
=======
        itemList: [],
        dataList: [],
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
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
        let second_collect = {}
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
            console.log('tag_id', tag_id)
            that.$get('api/queryTagDetail', tag_id).then(function (res) { //查询对应的tag_name和real_estate_id
              that.dataList[j].tag_name = res.data.tag.tag_name
              collect.tag_name = res.data.tag.tag_name
              console.log('name', collect.tag_name)
              collect.real_estate_id = res.data.tag.real_estate_id
              let first_id = {
                real_estate_id: res.data.tag.real_estate_id
              }
              that.$get('api/queryRealEstateDetail', first_id).then(function (res) { //查询对应楼盘名
                collect.real_estate_name = res.data.realEstate.real_estate_name
                console.log('name3', collect.real_estate_name)
                that.itemList.push(collect)
                console.log('1', that.itemList)
              })
            console.log('2', that.dataList)
         }, function() {
                 if (res.data.tag.real_estate_id === that.itemList[j].real_estate_id){
                   that.itemList[j].tag_name = res.data.tag.tag_name
                   that.dataList[j].tag_name = res.data.tag.tag_name
                 }else{
                   that.dataList[j].tag_name = res.data.tag.tag_name
               second_collect.tag_name = res.data.tag.tag_name
               let second_id = {
                real_estate_id: res.data.tag.real_estate_id
              }
              that.$get('api/queryRealEstateDetail', second_id).then(function (res) {
                second_collect.real_estate_name = res.data.realEstate.real_estate_name
                that.itemList.push(second_collect)
              })
                 }
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
