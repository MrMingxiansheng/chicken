<template>
  <div class="topic" v-if="item.tag_name">
    <div class="box">
          <div class="title" @click="ClickTag(item)" decode="ensp">#&ensp;{{item.tag_name}}</div>
      <div class="box2" v-if="item.interact.interact_content">
            <div class="words" @click="ClickTag(item)" v-if="content.length >= 8">{{content}}</div>
            <div class="article" @click="toArticlePage" v-if="articleSrc">文章链接</div>
        <div class="images">
          <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)" class="img">
        </div>
      </div>
      <div class="box1">
          <div class="bor" @click="ClickTag(item)">
            <div class="border">
              <img :src="item.interact.user.head_url" class="avatarUrl" />
            </div>
            <span decode="ensp">&ensp;{{item.interact.user.user_name}}&ensp;发布</span>
          </div>
        <div class="talk">
          <span class="views_num" @click="ClickTag(item)">{{length}}讨论</span>
        <div class="step" @click="clickStep">
          <span class="step-num">{{item.interact.cnum}}</span>
          <img :src="stepSrc" class="step-str"/>
          <!-- <span class="step-str">踩</span> -->
        </div>
        </div>
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
    props: ['item','myDetail','real_estate_name'],
    data() {
      return {
        content:'',
        images:'',
        articleSrc:'',
        stepLock:true,
        length:'',
        stepSrc:'/static/images/cai.png'
      };
    },
    onLoad (){
      let that = this
      that.praiseStatus()
      let allContent,articleArr
      if(this.item.interact.interact_content.indexOf('images=')===-1){
        //没有图片
        allContent = this.item.interact.interact_content
      }else{
        //有图片
        let arr = this.item.interact.interact_content.split('images=')
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
      that.$get('api/queryTagDetail',{tag_id:that.item.id}).then(function(res){
        that.length = res.data.interactList.length
      })
    },
    methods: {
      ClickTag: function (item) {
        let that = this
        let obj = {
          tag_name:item.tag_name,
          views_num:item.views_num,
          user_id:item.user_id,
          real_estate_name:this.real_estate_name,
          id:item.id
        }
        console.log('obj',obj)
        //+'interactList='+JSON.stringify(that.interactList)
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)
        })
      },
      preview: function (index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
        })
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
            if(interactList[i].to_interact_id === that.item.interact.id && interactList[i].interact_type === '点踩'){
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
          that.item.interact.cnum = parseInt(that.item.interact.cnum) + 1
          interact.tag_id = that.item.interact.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_type = '点踩'
          interact.to_interact_id = that.item.interact.id
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
          that.item.interact.cnum = parseInt(that.item.interact.cnum) - 1
          for(let i=0; i<that.myDetail.interactList.length; i++){
            if(that.myDetail.interactList[i].id===stepId){
              that.myDetail.interactList.splice(i,1)
              break
            }
          }
          that.reSetMyDetail(that.myDetail)
          interact.id = stepId
          interact.interact_type = '取消踩'
          interact.tag_id = that.item.interact.tag_id
          interact.user_id = that.myDetail.user.id
          interact.to_interact_id = that.item.interact.id
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
       praiseStatus (){
        let that = this
        for(let i=0; i<that.myDetail.interactList.length; i++){
         if(that.myDetail.interactList[i].to_interact_id === that.item.interact.id && that.myDetail.interactList[i].interact_type === '点踩'){
           console.log('')
           that.stepSrc = '/static/images/cai1.png'
         } 
        }
       }
    }
  };

</script>

<style scoped>
  .bor {
    display: flex;
    flex-direction: row;
    font-size: 15px;
    color: rgb(137, 145, 150);
  }

  .title {
    margin-left:70rpx;
    font-size: 18px;
    margin-top:10rpx;
    margin-bottom:10rpx;
    font-weight:700;/*字体加粗*/
  }

  .avatarUrl {
    height: 40rpx;
    width: 40rpx;
    vertical-align:middle;
    margin-bottom:4rpx;
    border-radius:50%;
  }

  .talk {
    display: flex;
    flex-direction: row;
    font-size: 13px;
    margin-bottom: 10rpx;
  }

  .views_num{
    color: rgb(137, 145, 150);
  }

  .step-num{
    color: rgb(137, 145, 150);
  }

  .step-str{
    width: 40rpx;
    height: 40rpx;
    vertical-align: middle; /*图片垂直居中*/
  }

  .step{
    height: 50rpx;
    width: 100rpx;
    /* border: 1px solid rgb(219, 219, 219);
    box-sizing: border-box; */
    line-height: 50rpx;
    text-align: center;
    margin-right: 10rpx;
  }

  .views_num{
    line-height: 50rpx;
    text-align: center;
    margin-right: 10rpx;
  }

  .users {
    display: flex;
    flex-direction: row;
    font-size: 17px;
    align-items: center;
  }

 .img {
    width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    vertical-align:middle;
  }

  .box2 {
    font-size: 15px;
    margin-left: 75rpx;
    margin-bottom: 10rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-left: 20rpx;
    margin-bottom:5rpx;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 5rpx;
    flex: auto;
    width: 100%;
  }

  .user {
    color: rgb(137, 145, 150);
    text-overflow: ellipsis;
    overflow: hidden;
    width: 200rpx;
    display: block;
    white-space: nowrap;
    /*过长省略*/
  }

  .words {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 600rpx;
    display: block;
    white-space: nowrap;
  }

  .article{
    color:#f3cc01;
    line-height: 50rpx;
  }

</style>
