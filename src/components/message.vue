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
<<<<<<< HEAD
  .build {
    text-align: center;
    margin-top: 20rpx;
  }

  .head {
    border: 1px solid #d0d0d0;
    margin-left: 20rpx;
    margin-top: 20rpx;
    height: 80rpx;
    width: 80rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    /*默认*/
  }

  .box2 {
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
    margin-top: 16rpx;
    font-size: 16px;
  }

  .box3 {
    display: flex;
    flex-direction: column;
  }

  .box4 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .box5 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    position: absolute;
    right: 120rpx;
    color: #888888;
  }

  .name {
    color: #888888;
  }

  .time {
    color: #888888;
  }

  .reply {
    color: #f3cc01;
    position: absolute;
    right: 20rpx;
  }

  .words {
    font-size: 16px;
    margin-top: 20rpx;
    width: 600rpx;
    white-space: normal;
    /*自动换行*/
=======
  img{
    width: 40rpx;
    height: 40rpx;
>>>>>>> 243ba1fcd661f77b4395f19a357b9cb9444bfac3
  }

</style>
