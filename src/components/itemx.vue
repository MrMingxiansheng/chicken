<template>
  <div class="itemx">
    <ul>
      <div v-for="(site,index) in sites" :key="site" v-if="index<9">
        <a href="/pages/qwb/main">
          <li>{{ site.name }}</li>
        </a>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sites: [{
            name: '高铁高铁高铁'
          },
          {
            name: '价格'
          },
          {
            name: '小鸡小鸡'
          },
          {
            name: '价格'
          },
          {
            name: '价格杭州'
          },
          {
            name: '价格杭州杭州'
          },
          {
            name: '价格'
          }
        ]
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
