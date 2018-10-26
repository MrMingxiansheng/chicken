<template>
  <div>
    <div class="shadow"></div>
  </div>
</template>


<script>
  import line from "@/components/line";
  export default {
    components: {
      line
    },
    data() {
      return {
        card: "个人名片",
        name: "姓名",
        identity: "(销售)",
        build: "未来悦",
        praise: "25",
        step: "3",
      };
    },

    methods: {

    }
  };

</script>

<style scoped>
  .shadow{
    width:200rpx;
    height:200rpx;
   box-shadow: #666 0px 0px 10px;
   background: #EEFF99;
}


</style>
