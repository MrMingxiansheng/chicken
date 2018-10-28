<template>
<div :class="{ reply: index==0} " :style="{'background-color': index>0 ? 'white' : '#ffe144'}">
  <div class="topic">
    <div class="avatar">
      <img :src="hideUser.head_url"  v-if="user_type === '匿名' && reply.user_id===owner">
      <img :src="reply.user.head_url"  v-else>
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
        <div class="images" v-if="images">
          <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)">
        </div>
        <div class="time">
          {{reply.update_time}}
        </div>
      </div>
    </div>
    <div class="interact">
      <div class="interact-in" :style="{'margin-left': index>0 ? '40rpx' : '20rpx'}">
        <div class="praise">
          <div class="praise-num">{{reply.interact_status}}</div>
          <img :src="praiseSrc" class="praise-str" @click.stop="clickPraise"/>
          <!-- <span class="praise-str">赞</span> -->
        </div>
        <div class="step">
          <div class="step-num">{{reply.cnum}}</div>
          <img :src="stepSrc" class="step-str" @click.stop="clickStep"/>
          <!-- <span class="step-str">踩</span> -->
        </div>
        <div class="say">
          <img src="/static/images/reply.png" class="say1" @click.stop="clickReply"/>
        </div>
      </div>
    </div>
   </div>
</div>
</template>

<script>
  export default {
    props: ["reply","owner","hideUser","user_type","myDetail","index"],
    data() {
      return {
        content:'',
        images:'',
        articleSrc:'',
        stepLock:true,
        praiseLock:true,
        praiseSrc: '/static/images/zan.png',
        stepSrc:'/static/images/cai.png'
      }
    },
    onLoad(){
      let that = this
      that.praiseStatus()
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
              that.praiseSrc = '/static/images/zan.png'
              todo = '取消赞'
              praiseId = interactList[i].id
              console.log('点赞交互',interactList[i])
              break
            }
          }
          if(todo !== '取消赞'){
            todo = '点赞'
            that.praiseSrc = '/static/images/zan1.png'
          }
        }else{
          //没交互
          todo = '点赞'
          that.praiseSrc = '/static/images/zan1.png'
        }
        if (todo === '点赞') {
          that.praiseSrc = '/static/images/zan1.png'
          that.reply.interact_status = parseInt(that.reply.interact_status) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_type = '点赞'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            that.$sendMessage(JSON.stringify(res.data))
            that.myDetail.interactList.push(res.data)
            that.reSetMyDetail(that.myDetail)
            console.log('点赞返回',res.data)
            that.praiseLock = !that.praiseLock
          })
        }else if (todo === '取消赞') {
          that.praiseSrc = '/static/images/zan.png'
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
              that.stepSrc = '/static/images/cai.png'
              todo = '取消踩'
              console.log('interactList[i]',interactList[i])
              stepId = interactList[i].id
              console.log('for循环,stepid',stepId)
              break
            }
          }
          if(todo !== '取消踩'){
            todo = '点踩'
            that.stepSrc = '/static/images/cai1.png'
          }
        }else{
          //没交互
          todo = '点踩'
          that.stepSrc = '/static/images/cai1.png'
        }
        if (todo === '点踩') {
          that.stepSrc = '/static/images/cai1.png'
          that.reply.cnum = parseInt(that.reply.cnum) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_type = '点踩'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            that.myDetail.interactList.push(res.data)
            that.reSetMyDetail(that.myDetail)
            console.log('点踩返回',res.data)
            that.stepLock = !that.stepLock
          })
        }else if (todo === '取消踩') {
          that.stepSrc = '/static/images/cai.png'
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

      praiseStatus (){
        let that = this
        for(let i=0; i<that.myDetail.interactList.length; i++){
         if(that.myDetail.interactList[i].to_interact_id === that.reply.id && that.myDetail.interactList[i].interact_type === '点赞'){
            that.praiseSrc = '/static/images/zan1.png'
          } 
         if(that.myDetail.interactList[i].to_interact_id === that.reply.id && that.myDetail.interactList[i].interact_type === '点踩'){
           that.stepSrc = '/static/images/cai1.png'
         } 
        }
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
      },

    }//methods下括号
  }

</script>

<style scoped>
  .reply {
    background-color: #ffe144;
    padding: 20rpx;
  }

  .topic{
    display: flex;
    background-color: white;
    padding: 20rpx 20rpx 10rpx 20rpx;
    border-radius: 7px;
  }

  .avatar img {
    width: 80rpx;
    height: 80rpx;
    border-radius:50%;
  }

  .content {
    width: 490rpx;
    line-height: 18px;
    margin-left: 10rpx;
  }

  .content .content-in {
    width: 480rpx;
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
    line-height: 24px
  }
  
  .content-in .images img {
    width: 105rpx;
    height: 105rpx;
    margin-right: 10rpx;
    margin-bottom: 5rpx;
  }

  .words .article{
    color:#f3cc01;
    line-height: 50rpx;
  }

  .content-in .time {
    color: #ccc;
    font-size: 13px;
  }

  .interact {
    width: 125rpx;
  }

  .interact .interact-in {
    height: 160rpx;
    width: 100rpx;
    display: inline-block;
    margin-left: 20rpx;
    font-size: 14px;
  }

  .interact-in .praise {
    height: 60rpx;
    display: flex;
    flex-direction: row;
  }

  .praise .praise-num {
    color: rgb(137, 145, 150);
    text-align: right;
    width: 45rpx;
  }

  .praise .praise-str {
    text-align: left;
    margin-left: 6rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .interact-in .step {
    height: 60rpx;
    display: flex;
    flex-direction: row;
  }

  .step .step-num {
    color: rgb(137, 145, 150);
    text-align: right;
    width: 45rpx;
  }

  .step .step-str {
    text-align: left;
    margin-left: 6rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .interact-in .say {
    text-align: center;
    height: 40rpx;
    margin-left: 36rpx;
  }

  .say1 {
    width: 40rpx;
    height: 40rpx;
  }

</style>
