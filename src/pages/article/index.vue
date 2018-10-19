<template>
  <div>
    <web-view :src="src"></web-view>
  </div>
</template>

<script>
export default {
  data(){
    return{
      src:"https://mp.weixin.qq.com/s/7p7O6vBID_gycKfBPKCI6g"
    }
  },
  onLoad(option){
    console.log('option.src',option.src)
    let that = this
    that.src = option.src
  }
}
</script>

<style>

</style>
