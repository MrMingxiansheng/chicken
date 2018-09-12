<template>
  <div class="itema">
    <ul>
      <li @click="onclick">{{ nameSet }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["nameSet"],
    data() {
      return {};
    },
    methods: {
      onclick: function () {
        this.$emit("child", this.nameSet)
      }
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
