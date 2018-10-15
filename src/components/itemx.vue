<template>
<<<<<<< HEAD
  <div class="itemx" >
    <div class="tagList">
      <div class="tag"  v-for="(site,index) in tagList" :key="site.id"  v-if="index<6" @click="toTopicPage(site)">{{ site.tag_name }}</div>
    </div>
=======
  <div class="itemx">
    <ul>
      <div v-for="(site,index) in item" :key="site" v-if="index<9">
<<<<<<< HEAD
            <li><div class="border" @click="ClickTag_name(site)">{{ site.tag_name }}</div></li>
=======
        <a href="/pages/topic/main">
          <li @click="storageTagId(site)">{{ site.tag_name }}</li>
        </a>
>>>>>>> 29910dc851c718a06b1465fcf51c40c3ff876e44
      </div>
    </ul>
    {{getitem}}
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
  </div>
</template>

<script>
  export default {
<<<<<<< HEAD
    props: ['tagList'],
=======
    props: ['id'],
    data() {
      return {
        item: []
      }
    },
    computed: {
      getitem() {
        let that = this
<<<<<<< HEAD
        let param={
          real_estate_id: this.id //楼盘id
        }
        that.$get('api/queryRealEstateDetail',param).then(function(res) { //查对应id的数据
        that.item = res.data.tagList
      }, function(res) {
       // failure
      });
      }
    },
    onLoad (){
    },
    methods: {
      ClickTag_name:function (site){
        let that = this
         wx.setStorage({
                   key: 'tag_id', //话题ID
                   data: site.id,
                   success: function(res) {
                     console.log('zzzz',site.id)
                }
               })
               wx.setStorage({
                   key: 'tag_name', //话题名字
                   data: site.tag_name,
                   success: function(res) {
                }
               })
        wx.navigateTo({
                  url: '/pages/qwb/main'
                })
      }
    }
  }
=======
        let param = {
          real_estate_id: this.id
        }
        that.$get('api/queryRealEstateDetail', param).then(function (res) {
          console.log('返回:', res)
          console.log('tag', res.data.tagList)
          that.item = res.data.tagList

        }, function (res) {
          // failure
        });
      }
    },
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
    methods: {
      toTopicPage(site) {
        wx.navigateTo({
          url:'/pages/topic/main?tag='+JSON.stringify(site)
        })
      }
    }
  };
>>>>>>> 29910dc851c718a06b1465fcf51c40c3ff876e44

</script>

<style scoped>
  .tagList {
    width: 750rpx;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10rpx;
  }

<<<<<<< HEAD
  .tag {
    width: 230rpx;
    background-color: #f8f8f8;
    font-size: 13px;
    line-height: 60rpx;
    border: 1px solid rgb(229, 229, 229);
    text-align: center;
    box-sizing: border-box;
    margin: 10rpx 10rpx;
=======
  li {
    font-size: 16px;
    float: left;
    width: 240rpx;
    color: #c5a500;
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
  }

  .border{
    border: 1px solid #d0d0d0;
    width: 200rpx;
    height:40rpx;
    margin-bottom:10rpx;
  }

</style>
