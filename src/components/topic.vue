<template>
  <div class="topic" v-if="item.tag_name">
    <div class="box">
      <a href="/pages/qwb/main" hover-class="none">
          <div class="title">{{item.tag_name}}</div></a>
      <div class="box1">
        <a href="/pages/qwd/main" hover-class="none">
          <div class="bor">
            <div class="border1">
              <img :src="item.head_url" class="avatarUrl" />
            </div>
            <span>{{item.user_name}}(题主)发布</span>
          </div>
        </a>  
        <div class="talk">
          <span class="number">{{item.views_num}}讨论</span>
          <span class="send" @click="ClickSend" decode="ensp">&ensp;讨论&ensp;</span>
        </div>
      </div>
      <div class="box2">
        <a href="/pages/qwb/main" hover-class="none">
          <div class="users">
            <div class="border2">
              <img :src="item.head_url" class="avatarUrl" v-if="item.interact"/>
            </div>
            <span class="user" decode="ensp" v-if="item.interact">{{item.user_name}}:&ensp;{{item.interact.interact_content}}</span>
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
    props: ['item'],
    data() {
      return {
        
      };
    },
    onLoad (){

    },
    methods: {
      ClickSend: function () {
        const url = '/pages/qwb/main?'
        wx.navigateTo({
          url
        })
        this.focusState = true
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
    text-align: center;
    font-size: 20px;
  }

  .avatarUrl {
    height: 32rpx;
    width: 32rpx;
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

  .users {
    display: flex;
    flex-direction: row;
    font-size: 17px;
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
