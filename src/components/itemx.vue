<template>
  <div class="itemx">
    <ul>
      <div v-for="(site,index) in item" :key="site" v-if="index<9">
        <a href="/pages/topic/main">
          <li @click="storageTagId(site)">{{ site.tag_name }}</li>
        </a>
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

</script>

<style scoped>
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    float: left;
    width: 240rpx;
    color: #c5a500;
  }

</style>
