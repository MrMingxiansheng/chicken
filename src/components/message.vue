<template>
  <div class="message">
    <div class="mes" @click="toTopicPage()">
      <div class="box" v-if="msg.interact_type!=='点踩'">
        <img :src="head_url" alt="" class="headImage">
        <span class="nick">{{user_name}}</span>
        给你
        <span class="type">&nbsp;{{msg.interact_type}}</span>
      </div>
      <div v-if="msg.interact_type==='点踩'" class="step">有人给你点踩</div>
      <div class="content" v-if="msg.interact_content">&nbsp;{{content}}</div>
      <div class="images">
        <img v-for="(url,index) in images" :key="index" :src="url">
      </div>
      <div class="time">{{msg.update_time}}</div>
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
    props: ['msg', 'userList'],
    data() {
      return {
        head_url: '',
        user_name: '',
        images: [],
        content: '',
        articleSrc: ''
      }
    },
    onLoad() {
      let that = this
      let allContent, articleArr
      if (that.msg.interact_content) {
        if (that.msg.interact_content.indexOf('images=') === -1) {
          //没有图片
          allContent = that.msg.interact_content
        } else {
          //有图片
          let arr = that.msg.interact_content.split('images=')
          allContent = arr[0]
          that.images = JSON.parse(arr[1])
        }
        if (allContent.indexOf('https://') === -1) {
          //没有连接
          that.content = allContent
        } else {
          //有连接
          let articleArr = allContent.split('https://')
          that.content = articleArr[0]
          that.articleSrc = 'https://' + articleArr[1]
        }
      }
      for (let i in that.userList) {
        if (i === that.msg.user_id) {
          that.head_url = that.userList[i].head_url
          that.user_name = that.userList[i].user_name
          break
        }
      }
      if (that.head_url === '') {
        that.head_url = that.user.head_url
        that.user_name = that.user.user_name
      }
    },
    methods: {
      toTopicPage() {
        let obj = {
          real_estate_name:this.msg.real_estate_name,
          tag_id:this.msg.tag_id
        }
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)
        })
      },
    }
  }

</script>

<style scoped>
  .mes {
    display: flex;
    flex-direction: column;
    margin-top: 20rpx;
    margin-left: 20rpx;
  }

  .headImage {
    border: 1rpx solid #ccc;
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle;
    /*图居中*/
  }

  .box {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }
  .step{
    color: rgb(137, 145, 150);
    font-size: 15px;
    margin-left: 40rpx;
  }

  .content {
    margin-left: 40rpx;
    width: 600rpx;
    color: #000;
    font-size: 17px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .images{
    width: 600rpx;
    margin-left: 50rpx;
  }
  .images img{
    width: 50rpx;
    height: 50rpx;
  }

  .time {
    margin-left: 40rpx;
    color: #ccc;
    font-size: 13px;
  }

</style>
