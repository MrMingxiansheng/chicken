<template>
  <div class="topic">
    <div class="box">
      <div class="box1">
        <a href="/pages/qwd/main" hover-class="none">
          <div class="bor">
            <div class="border1"></div>
            <span>{{item.owner}}{{item.userType}}</span>
          </div>
        </a>
        <a href="/pages/qwb/main" hover-class="none">
<<<<<<< HEAD
          <span class="title">"{{item.topic}}"</span></a>
        <div class="talk">
          <span class="number">{{num}}讨论</span>
          <span class="send" @click="ClickSend" decode="ensp">&ensp;讨论&ensp;</span>
=======
          <span class="title">"{{topic}}"</span></a>
        <div class="talk">
          <span class="number">{{num}}讨论</span>
          <span class="send" decode="ensp"><a href="#" hover-class="none">&ensp;讨论&ensp;</a></span>
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
        </div>
      </div>
      <div class="box2" v-for="(site,index) in sites" :key="site" v-if="index<=3">
        <a href="/pages/qwb/main" hover-class="none">
        <div class="item">
          <div class="border2"></div>
          <span class="user" decode="ensp">{{item.user}}{{item.userType}}:&ensp;{{item.content}}</span>
        </div>
        </a>
      </div>
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
    props:['item'],
    data() {
      return {
        num: 0,
        sites: [{}],
        money:""
      };
    },
    methods: {
       ClickSend: function() {
         const url = '/pages/qwb/main?money='+this.money
         wx.navigateTo({ url })  
         this.setData({
            focus: false
         })
     },
    }
  };

</script>

<style scoped>
  .bor {
    display: flex;
    flex-direction: row;
  }

  .bor span {
    color: #888888;
    font-size: 16px;
  }

  .title {
    font-size: 25px;
  }

  .border1 {
    border: 1px solid #d0d0d0;
    height: 32rpx;
    width: 32rpx;
    margin-top: 4rpx;
  }

 .border2 {
    border: 1px solid #d0d0d0;
    height: 32rpx;
    width: 32rpx;
    position: relative;
    bottom:4rpx;
  }

  .number {
    color: #888888;
  }

  .send {
    color: #c5a500;
  }

  .talk {
    display: flex;
    flex-direction: row;
    font-size: 15px;
  }

  .item {
    display: flex;
    flex-direction: row;
    font-size:17px;
    align-items: center;
  }

  .box2 { 
    margin-top: 20rpx;
    margin-left: 20rpx;
    margin-bottom: 10rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 20rpx;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    flex: auto;
    width: 100%;
  }

  .user {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 600rpx;
    display: block;
    white-space: nowrap;
    /*过长省略*/
  }

</style>
