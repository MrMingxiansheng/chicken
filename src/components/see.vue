<template>
  <div class="see">
    <span class="see-build">{{seeBuild}}</span>
    <div class="item">
      <itemx></itemx>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemx from "@/components/itemx"
  export default {
    components: {
      line,
      itemx
    },
    data() {
      return {
        seeBuild: "未来城",
      }
    },
    methods: {}
  };

</script>

<style scoped>
  .see {
    display: flex;
    flex-direction: column;
  }

  .see-build {
    text-align: center;
    margin-top: 20rpx;
  }

  .item {
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 30rpx;
  }

</style>
