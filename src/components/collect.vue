<template>
  <div class="collect">
    <span class="collect-build">{{CollectBuild}}</span>
    <div class="item">
      <itemr></itemr>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemr from "@/components/itemr"
  export default {
    components: {
      line,
      itemr
    },

    data() {
      return {
        CollectBuild: "缦云芳",
      }
    },
    methods: {}
  };

</script>

<style scoped>
  .collect {
    display: flex;
    flex-direction: column;
  }

  .collect-build {
    text-align: center;
    margin-top: 10px;
  }

  .item {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 15px;
  }

</style>
