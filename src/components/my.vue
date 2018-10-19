<template>
  <div class="my">
    <span class="my-topic">{{mytopic}}</span>
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
        mytopic: "未来城",
      }
    },
    methods: {}
  };

</script>

<style scoped>
  .my {
    display: flex;
    flex-direction: column;
  }

  .my-topic {
    text-align: center;
    margin-top: 20rpx;
  }

  .item {
    margin-top: 10rpx;
    margin-bottom: 10rpx;
    margin-left: 30rpx;
  }

</style>
