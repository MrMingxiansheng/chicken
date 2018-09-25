<template>
  <div class="itemr">
    <ul>
      <div v-for="(site,index) in sites" :key="site" v-if="index<6">
        <a href="/pages/qwb/main">
          <li>{{ site.name }}</li>
        </a>
      </div>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {

    },
    data() {
      return {
        sites: [{
            name: '小鸡评测'
          },
          {
            name: '价格'
          },
          {
            name: '距离杭州杭州'
          },
          {
            name: '价格杭州杭州'
          },
          {
            name: '距离'
          },

        ],
        computed: {},
        methods: {}
      }
    }
  }

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
