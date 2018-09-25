<template>
  <div>
    <div>
      <page></page>
    </div>
    <div id="result">搜索结果</div>
    <line />
    <div class="Hot">
      <hot v-for="site in sites" :key="site"></hot>
    </div>
  </div>
</template>


<script>
  import line from "@/components/line"
  import hot from "@/components/hot"
  import page from "@/components/page"
  export default {
    components: {
      line,
      hot,
      page
    },
    data() {
      return {
        sites: [""]
      };
    },

    methods: {

    }
  };

</script>

<style scoped>
  #result {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
