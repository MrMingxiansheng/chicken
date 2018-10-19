<template>
  <div class="reply">
    <div class="avatar">
      <img :src="hideUser.head_url"  v-if="user_type === '匿名' && reply.user_id===owner" @click="test">
      <img :src="reply.user.head_url"  v-else @click="test">
    </div>
    <div class="content">
      <div class="content-in">
        <div v-if="user_type === '匿名' " class="user">
          <span v-if="reply.user_id===owner">{{hideUser.user_name}}(题主)</span>
          <span v-else>{{reply.user.user_name}}</span>
          <span v-if="reply.interact_type==='回复'">&nbsp;&nbsp;回复&nbsp;&nbsp;
            <span v-if="reply.to_interact.user_id===owner">{{hideUser.user_name}}(题主)</span>
            <span v-else>{{reply.to_interact.user.user_name}}</span>
          </span>
        </div>
        <div v-if="user_type !== '匿名' " class="user">
          <span>{{reply.user.user_name}}<span v-if="reply.user_id===owner">(题主)</span></span>
          <span v-if="reply.interact_type==='回复'">&nbsp;&nbsp;回复&nbsp;&nbsp;{{reply.to_interact.user.user_name}}<span v-if="reply.to_interact.user_id===owner">(题主)</span></span>
        </div>
        <div class="words">
          <span>{{content}}</span>
          <div class="article" @click="toArticlePage" v-if="articleSrc">文章链接</div>
        </div>
        <div class="images">
          <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)">
        </div>
        <div class="time">
          {{reply.update_time}}
        </div>
      </div>
    </div>
    <div class="interact">
      <div class="interact-in">
        <div class="step" @click="clickStep">
          <span class="step-num">{{reply.cnum}}</span>
          <span class="step-str">踩</span>
        </div>
        <div class="praise" @click="clickPraise">
          <span class="praise-num">{{reply.interact_status}}</span>
          <span class="praise-str">赞</span>
        </div>
        <div class="say" @click="clickReply">
          回复
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["reply","owner","hideUser","user_type","myDetail"],
    data() {
      return {
        content:'',
        images:'',
        articleSrc:'',
        stepLock:true,
        praiseLock:true,
      }
    },
    onLoad(){
      let that = this
      let allContent,articleArr
      if(this.reply.interact_content.indexOf('images=')===-1){
        //没有图片
        allContent = this.reply.interact_content
      }else{
        //有图片
        let arr = this.reply.interact_content.split('images=')
        allContent = arr[0]
        this.images = JSON.parse(arr[1])
      }
      if(allContent.indexOf('https://')===-1){
        //没有连接
        this.content = allContent
      }else{
        //有连接
        let articleArr = allContent.split('https://')
        this.content = articleArr[0]
        this.articleSrc = 'https://' + articleArr[1]
      }
    },
    methods: {
      clickReply() {
        this.$emit('toReplyName', this.reply.user.user_name, this.reply.id)
      },
      clickPraise() {
        console.log('点了一下赞')
        let that = this
        if(!that.praiseLock){
          return
        }
        that.praiseLock = !that.praiseLock
        let interact = {} 
        let todo = ''
        let praiseId = ''
        let interactList = that.myDetail.interactList
        if(interactList.length > 0){
          //有交互
          for(let i=0; i<interactList.length; i++){
            if(interactList[i].to_interact_id === that.reply.id && interactList[i].interact_type === '点赞'){
              //已经有点赞,要取消赞
              todo = '取消赞'
              praiseId = interactList[i].id
              break
            }
          }
          if(todo !== '取消赞'){
            todo = '点赞'
          }
        }else{
          //没交互
          todo = '点赞'
        }
        if (todo === '点赞') {
          that.reply.interact_status = parseInt(that.reply.interact_status) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_type = '点赞'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          that.myDetail.interactList.push(interact)
          that.reSetMyDetail(that.myDetail)
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('点赞返回',res.data)
            that.praiseLock = !that.praiseLock
          })
        }else if (todo === '取消赞') {
          that.reply.interact_status = parseInt(that.reply.interact_status) - 1
          for(let i=0; i<that.myDetail.interactList.length; i++){
            if(that.myDetail.interactList[i].id===praiseId){
              that.myDetail.interactList.splice(i,1)
              break
            }
          }
          that.reSetMyDetail(that.myDetail)
          interact.id = praiseId
          interact.interact_type = '取消赞'
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('取消赞返回',res.data)
            that.praiseLock = !that.praiseLock
          })
        }
      },
      clickStep() {
        console.log('点了一下踩')
        let that = this
        if(!that.stepLock){
          return
        }
        that.stepLock = !that.stepLock
        let interact = {} 
        let todo = ''
        let stepId = ''
        let interactList = that.myDetail.interactList
        if(interactList.length > 0){
          //有交互
          for(let i=0; i<interactList.length; i++){
            if(interactList[i].to_interact_id === that.reply.id && interactList[i].interact_type === '点踩'){
              //已经有点踩,要取消踩
              todo = '取消踩'
              stepId = interactList[i].id
              break
            }
          }
          if(todo !== '取消踩'){
            todo = '点踩'
          }
        }else{
          //没交互
          todo = '点踩'
        }
        if (todo === '点踩') {
          that.reply.cnum = parseInt(that.reply.cnum) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_type = '点踩'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          that.myDetail.interactList.push(interact)
          that.reSetMyDetail(that.myDetail)
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('点踩返回',res.data)
            that.stepLock = !that.stepLock
          })
        }else if (todo === '取消踩') {
          that.reply.cnum = parseInt(that.reply.cnum) - 1
          for(let i=0; i<that.myDetail.interactList.length; i++){
            if(that.myDetail.interactList[i].id===stepId){
              that.myDetail.interactList.splice(i,1)
              break
            }
          }
          that.reSetMyDetail(that.myDetail)
          interact.id = stepId
          interact.interact_type = '取消踩'
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('取消踩返回',res.data)
            that.stepLock = !that.stepLock
          })
        }
      },
      test(){
        let that = this
        console.log('点击')
        that.$get('api/queryTagDetail',{tag_id: that.reply.tag_id}).then(function(res){
          console.log('交互列表',res.data.interactList)
        })
      },
      preview: function (index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
        })
      },

      toArticlePage(){
        let that = this
        wx.navigateTo({
          url: '/pages/article/main?src='+that.articleSrc
        })
      },

      reSetMyDetail(data){
        wx.setStorage({
          key:'myDetail',
          data:data,
          success(){
            console.log('myDetail缓存设置成功')
          }
        })
      }

    }//methods下括号
  }

</script>

<style scoped>
  .reply {
    display: flex;
    margin: 20rpx 0;
  }

  .avatar {
    width: 125rpx;
    text-align: center;
  }

  .avatar img {
    width: 80rpx;
    height: 80rpx;
  }

  .content {
    width: 490rpx;

    line-height: 18px;
  }

  .content .content-in {
    width: 460rpx;
  }

  .content-in .user {
    color: rgb(137, 145, 150);
    font-size: 15px;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis;/*文字隐藏后添加省略号*/
    white-space: nowrap;/*强制不换行*/
  }

  .content-in .words {
    word-wrap:break-word; 
    word-break:normal; 
    color: #000;
    margin: 20rpx 0;
    font-size: 17px;
  }

  .words .article{
    color:#f3cc01;
    line-height: 50rpx;
  }
  
  .content-in .images img {
    width: 105rpx;
    height: 105rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
  }

  .content-in .time {
    color: rgb(137, 145, 150);
    font-size: 13px;
  }

  .interact {
    width: 125rpx;
  }

  .interact .interact-in {
    height: 180rpx;
    width: 100rpx;
    border: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    margin-left: 15rpx;
    font-size: 14px;
    line-height: 60rpx;
  }

  .interact-in span {
    display: inline-block;
    height: 100%;
    width: 45rpx;
  }

  .interact-in .step {
    border-bottom: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    height: 60rpx;
  }

  .step .step-num {
    color: #ccc;
    text-align: right;
  }

  .step .step-str {
    text-align: left;
    margin-left: 4rpx;
  }

  .interact-in .praise {
    border-bottom: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    height: 60rpx;
  }

  .praise .praise-num {
    color: #ccc;
    text-align: right;
  }

  .praise .praise-str {
    text-align: left;
    margin-left: 4rpx;
  }

  .interact-in .say {
    box-sizing: border-box;
    height: 60rpx;
    text-align: center;
  }

</style>
