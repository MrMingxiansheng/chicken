<template>
  <div class="author" v-if="item.interact.user.head_url">
    <div class="header">
      <div class="left">
        <img class="avatarUrl" :src="item.interact.user.head_url" />
        <div class="user">
          <div class="nickName">&ensp;{{item.interact.user.user_name}}</div>
          <div class="identity" v-if="item.interact.user.user_type"><span :class="{ idName: item.interact.user.user_type }">{{item.interact.user.user_type}}</span></div>
          <span class="send">&ensp;发布&ensp;</span>
          <div class="top" v-if="item.views_num>10000000"><span class="getToP">置顶</span></div>
        </div>
      </div>
      <div class="right">
        <div class="comment">{{item.comment_num}}讨论</div>
        <div class="step" @click.stop="clickStep">
          <span class="step-num">{{stepNum}}</span>
          <img class="step-img" :src="stepSrc" />
        </div>
      </div>
    </div>
    <div class="footer" v-if="item.interact.interact_content">
      <text class="words">{{content}}</text>
      <div class="article" @click.stop="toArticlePage" v-if="articleSrc">文章链接</div>
      <div class="images">
        <img class="img" v-for="(url,index) in images" :key="index" :src="url" @click.stop="preview(index)">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'real_estate_name', 'user'],
    data() {
      return {
        content: '',
        images: '',
        articleSrc: '',
        stepLock: true,
        stepId:'',
        baseCnum:'',
        baseSrc:'/static/images/cai.png',
        stepSrc:'/static/images/cai.png',
      };
    },
    onLoad() {
      let that = this
      that.baseCnum = that.item.interact.cnum
      wx.getStorage({
        key:'myInteractList',
        success(res){
          for(let i=0; i<res.data.length; i++){
            if (res.data[i].to_interact_id === that.item.interact.id && res.data[i].interact_type ===
              '点踩') {
              that.baseSrc = '/static/images/cai1.png'
              that.stepSrc = '/static/images/cai1.png'
              that.stepId = res.data[i].id
              break
            }

          }
        }
      })
      let allContent, articleArr
      if (this.item.interact.interact_content.indexOf('images=') === -1) {
        //没有图片
        allContent = this.item.interact.interact_content
      } else {
        //有图片
        let arr = this.item.interact.interact_content.split('images=')
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
    onShow(){
      let that = this
       wx.getStorage({
        key:'myInteractList',
        success(res){
          that.stepSrc = '/static/images/cai.png'
          for(let i=0; i<res.data.length; i++){
            if (res.data[i].to_interact_id === that.item.interact.id && res.data[i].interact_type ===
              '点踩') {
              that.stepSrc = '/static/images/cai1.png'
              that.stepId = res.data[i].id
              break
            }
          }
        }
      })
    },
    computed:{
      stepNum(){
        let that = this
        let num = that.baseCnum
        if(that.baseSrc==='/static/images/cai.png'){
          if(that.stepSrc !== that.baseSrc){
            //没踩变踩
            num = num + 1
          }
        }else{
          if(that.stepSrc !== that.baseSrc){
            //踩变取消
            num = num - 1
          }
        }
        return num
      }
    },
    
    methods: {
      preview (index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
        })
      },

      clickStep() {
        console.log('点了一下踩')
        let that = this
        if (!that.stepLock) {
          return
        }
        if (!that.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        that.stepLock = !that.stepLock
        let interact = {}
        if (that.stepSrc.indexOf('cai1') === -1) {
          that.stepSrc = '/static/images/cai1.png'
          interact.tag_id = that.item.interact.tag_id
          interact.user_id = that.user.id
          interact.interact_type = '点踩'
          interact.user_type = '匿名'
          interact.to_interact_id = that.item.interact.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            that.stepId = res.data.id
            that.$sendMessage(JSON.stringify(res.data))
            that.$emit('pushMyInteract',res.data)
            console.log('点踩返回', res.data)
            that.stepLock = !that.stepLock
          })
        } else {
          that.stepSrc = '/static/images/cai.png'
          that.$emit('delMyInteract',that.stepId)
          interact.id = that.stepId
          interact.interact_type = '取消踩'
          interact.tag_id = that.item.interact.tag_id
          interact.user_id = that.user.id
          interact.to_interact_id = that.item.interact.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('取消踩返回', res.data)
            that.stepLock = !that.stepLock
          })
        }
      },

      toArticlePage() {
        let that = this
        wx.navigateTo({
          url: '/pages/article/main?src=' + that.articleSrc
        })
      }
      
    } //methods
  };

</script>

<style scoped>
  .header{
    overflow: hidden;
    color: rgb(137, 145, 150);
    height: 60rpx;
  }

  .left{
    float: left;
    display: flex;
    align-items: center;
    height: 60rpx;
    margin-left: 20rpx;
  }
  
  .header .avatarUrl {
    height: 40rpx;
    width: 40rpx;
    border-radius: 50%;
  }
  
  .header .user{
    display: flex;
    align-items: flex-end;
    font-size: 15px;
    height: 60rpx;
  }

  .header .user .top {
    text-align: center;
    line-height: 60rpx;
  }

  .header .user .top .getToP {
    font-size: 12px;
    color: red;
    border: thin solid; 
    box-sizing: border-box;
    border-radius: 3px;
    height: 25rpx;
    padding: 0 5rpx;
  }

  .header .user .nickName {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 10em;
    white-space: nowrap;
    line-height: 60rpx;
  }

  .header .user .identity {
    text-align: center;
    line-height: 60rpx;
  }

  .header .user .identity .idName {
    font-size: 12px;
    color: #f3cc01;
    border: thin solid; 
    box-sizing: border-box;
    border-radius: 3px;
    height: 25rpx;
    padding: 0 5rpx;
  }

  .header .user .send {
    line-height: 60rpx;
  }

  .header .right {
    font-size: 13px;
    float: right;
    display: flex;
    align-items: center;
    height: 60rpx;
    margin-top: -2rpx;
  }

  .header .step {
    height: 50rpx;
    width: 100rpx;
    line-height: 50rpx;
    text-align: center;
    display: inline-block;
  }

  .header .step .step-img {
    width: 40rpx;
    height: 40rpx;
    vertical-align: -10rpx;
  }

  .footer{
    font-size: 15px;
    margin-left: 75rpx;
    width: 600rpx;
  }
  
  .words {
    font-weight: 700;
    word-break: break-all;
    display: -webkit-box; /*text行数限制*/
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .article {
    color: #f3cc01;
    line-height: 50rpx;
  }

  .img {
    width: 120rpx;
    height: 120rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    vertical-align: middle;
  }

  .images{
    margin-top: 5rpx;
  }


</style>
