<template>
  <div class="message" v-if="user_name">
    <div class="mes">
      <div class="box">
        <img :src="head_url" alt="" class="headImage">
        <span class="nick">{{user_name}}</span>
        给你
        <span class="type">&nbsp;{{msg.interact_type}}</span>
      </div>
      <div class="content" v-if="msg.interact_content">&nbsp;{{content}}</div>
      <div class="images">
        <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)">
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
        that.$get('api/queryUserDetail', {
          user_id: that.msg.user_id
        }).then(function (res) {
          let user = res.data.user
          that.user_name = user.user_name
          that.head_url = user.head_url
        })
      }
    },
    methods: {
      preview: function (index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
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
    margin-left: 40rpx;
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
