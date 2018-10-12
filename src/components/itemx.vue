<template>
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
  </div>
</template>

<script>
  export default {
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
    methods: {
      //<把需要用到的数据存到缓存里>
      storageTagId(site) {
        wx.setStorage({
          key: 'tag_id',
          data: site.id,
          success: function () {}
        })
        wx.setStorage({
          key: 'real_estate_id',
          data: site.real_estate_id,
          success: function () {}
        })
        wx.setStorage({
          key: 'tag_name',
          data: site.tag_name,
          success: function () {}
        })
        wx.setStorage({
          key: 'user_id',
          data: site.user_id,
          success: function () {}
        })
        wx.setStorage({
          key: 'views_num',
          data: site.views_num,
          success: function () {}
        })
      }
      //</把需要用到的数据存到缓存里>
    }
  };
>>>>>>> 29910dc851c718a06b1465fcf51c40c3ff876e44

</script>

<style scoped>
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

  .border{
    border: 1px solid #d0d0d0;
    width: 200rpx;
    height:40rpx;
    margin-bottom:10rpx;
  }

</style>
