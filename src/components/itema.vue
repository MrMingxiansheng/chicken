<template>
  <div class="itema">
    <ul>
      <li @click="onclick">{{ name }}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: ["name"],
    data() {
      return {};
    },
    methods: {
      onclick: function () {
        this.$emit("child", this.name)
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
    width: 120px;
    color: #c5a500;
  }

</style>
