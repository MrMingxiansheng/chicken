<template>
  <div class="itemx">
    <ul>
      <div v-for="(site,index) in item" :key="site" v-if="index<9">
        <a href="/pages/qwb/main">
          <li>{{ site.tag_name }}</li>
        </a>
      </div>
    </ul>
    {{getitem}}
  </div>
</template>

<script>
  export default {
    props:['id'],
    data() {
      return {
        item:[]
      }
    },
    computed: {
      getitem () {
        let that = this
        let param={
          real_estate_id: this.id
        }
        that.$get('api/queryRealEstateDetail',param).then(function(res) {
       console.log('返回:',res)
       console.log('tag',res.data.tagList)
       that.item = res.data.tagList

      }, function(res) {
       // failure
      });
      }
    },
    methods: {}
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
