<template>
  <div class="message">
    <img :src="head_url" alt="">
    <span class="nick">{{user_name}}</span>
    给你
    <span class="type">&nbsp;{{msg.interact_type}}</span>
    <span class="content" v-if="msg.interact_content">&nbsp;{{msg.interact_content}}</span>
  </div>
</template>

<script>
  export default {
    components: {

    },
    props:['msg'],
    data() {
      return {
        head_url:'',
        user_name:''
      }
    },
    onLoad(){
      let that = this
      that.$get('api/queryUserDetail',{user_id:that.msg.user_id}).then(function(res){
        that.head_url = res.data.user.head_url
        that.user_name = res.data.user.user_name
      })
    },
    methods: {}
  }

</script>

<style scoped>
  img{
    width: 40rpx;
    height: 40rpx;
  }

</style>
