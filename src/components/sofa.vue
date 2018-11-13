<template>
  <div class="sofa">
    <div class="comment">
      <div class="nickName">{{item.user.user_name}}</div>:<div class="content">{{content}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    data() {
      return {
        content: '',
      };
    },
    onLoad() {
      let that = this
      let allContent, articleArr
      if (this.item.interact_content.indexOf('images=') === -1) {
        //没有图片
        allContent = this.item.interact_content
      } else {
        //有图片
        let arr = this.item.interact_content.split('images=')
        allContent = arr[0]
        this.images = JSON.parse(arr[1])
      }
      if (allContent.indexOf('https://') === -1) {
        //没有连接
        this.content = allContent
      } else {
        //有连接
        let articleArr = allContent.split('https://')
        this.content = articleArr[0]
        this.articleSrc = 'https://' + articleArr[1]
      }
    },
    methods: {
     
    } //methods
  };

</script>

<style scoped>
  .sofa{
    margin-top: 20rpx;
    font-size: 15px;
    width: 650rpx;
    margin-left: 75rpx;
    color: rgb(137, 145, 150);
  }

  .comment{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 600rpx;
    line-height: 15px;
  }

  .content{
    color: #000;
    display: inline-block;
    /* text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; */
    vertical-align: top;
  }

  .nickName{
    max-width: 200rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    vertical-align: top;
  }

</style>
