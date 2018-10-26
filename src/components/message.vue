<template>
  <div class="message">
    <div class="mes">
    <div class="box">
    <img :src="head_url" alt="">
    <span class="nick">{{user_name}}</span>
    给你
    <span class="type">&nbsp;{{interact_type}}</span>
    </div>
    <div class="content" v-if="interact_content">&nbsp;{{interact_content}}</div>
    <div class="time">{{time}}</div>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line
    },
    props:['msg'],
    data() {
      return {
        head_url:'',
        user_name:'',
        interact_type:'',
        interact_content:'',
        time:''
      }
    },
    onLoad(){
    },
    methods: {}
  }

</script>

<style scoped>
  .mes {
    display: flex;
    flex-direction: column;
    margin-top:20rpx;
    margin-left:20rpx;
  }

  img {
    border: 1rpx solid #ccc;
    width: 40rpx;
    height: 40rpx;
    vertical-align:middle; /*图居中*/
  }

  .box {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }

  .content {
    margin-left:40rpx;
    width:600rpx;
    color: #000;
    font-size: 17px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .time {
    margin-left:40rpx;
    color: #ccc;
    font-size: 13px;
  }

</style>
