<template>
  <div class="topic">
    <div class="header">
      <!-- <div class="building">{{real_estate_name}}</div> -->
<<<<<<< HEAD
      <div class="topicTitle" decode="ensp">#&ensp;{{tag.tag_name}}</div>
      <div class="topicViews">{{views_num}}浏览</div>
=======
      <div class="topicTitle"># {{tag.tag_name}}</div>
      <div class="topicViews">{{tag.views_num}}浏览</div>
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
    </div>
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}">
      <div class="content">
        <speak v-for="obj in interactList" :key="obj.id" :reply="obj" :owner="tag.user_id" :user_type="user_type"
          :hideUser="hideUser" :myDetail="myDetail" @toReplyName="toReplyName"></speak>
      </div>
    </scroll-view>
    <canvas canvas-id='attendCanvasId' class='myCanvas'></canvas>
    <div class="footer">
      <div v-for="(img,index) in showImages" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview">
        <img src="/static/images/chacha.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
<<<<<<< HEAD
        <input id="enter" v-model.lazy="words" :focus="focusState" @input="keyInput" :cursor="cursor" @focus="focus" 
          maxlength="200" />
        <div class="send" @click="clickSend">发送</div>
=======
        <input id="enter" v-model.lazy="words" :focus="focusState" @focus="focus" @input="keyInput" @blur="leave()" maxlength="200" />
        <div class="send" @click="timeOut()">发送</div>
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="image" @click="upLoadImage">图片</button>
        </li>
        <li>
          <button plain="true" class="collect" @click.stop="clickCollect">{{collect_status}}</button>
        </li>
        <li>
          <button class="userstatus" plain="true" @click="changeUserStatus()">{{user_status}}</button>
        </li>
        <li>
          <button open-type="share" class="share" plain="true" @click="ClickShare">分享</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import speak from '@/components/reply'
  import line from "@/components/line"
  export default {
    components: {
      speak,
      line
    },
    data() {
      return {
<<<<<<< HEAD
        scrollHight: '',        //滚动高度
        focusState: false,      //输入框是否聚焦
        collect_status:'',      //收藏状态,是<收藏>还是<已收藏>
        collectId:'',           //一条收藏的id,用来取消收藏的时候覆盖
        words: '',              //输入框的内容
        images:[],              //图片列表
        localImages:[],
        interactList: '',       //交互列表,给reply组件加载评论和回复
        tag_id: '',             //当前话题的id,用来刷新评论和回复
        views_num:'',           //当前话题的浏览量
        myDetail:'',            //我的recordList,msgList,tagList,user
        user_type:'',           //传给reply,判断是不是匿名
        hideUser:'',            //传给reply,匿名的头像和昵称
        real_estate_name: '',   //楼盘名
        to_interact_id: '',     //用来判断是评论还是回复,回复哪条交互
        cursor: -1,             //光标位置
        tag:'',                 //包含tag_name,views_num,user_id(传给reply,用来判断是不是题主),tag_id(单独提出来了)
        user_status:'匿名',
        collectLock:true
=======
        scrollHight: '', //滚动高度
        focusState: false, //输入框是否聚焦
        collect_status: '', //收藏状态,是<收藏>还是<已收藏>
        collectId: '', //一条收藏的id,用来取消收藏的时候覆盖
        words: '', //输入框的内容
        images: [], //图片列表
        localImage: '',
        showImages: [],
        interactList: '', //交互列表,给reply组件加载评论和回复
        tag_id: '', //当前话题的id,用来刷新评论和回复
        myDetail: '', //我的recordList,msgList,tagList,user
        user_type: '', //传给reply,判断是不是匿名
        hideUser: '', //传给reply,匿名的头像和昵称
        real_estate_name: '', //楼盘名
        to_interact_id: '', //用来判断是评论还是回复,回复哪条交互
        tag: '', //包含tag_name,views_num,user_id(传给reply,用来判断是不是题主),tag_id(单独提出来了)
        user_status: '匿名',
        collectLock: true
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
      }
    },

    onLoad(option) {
      wx.showLoading({
<<<<<<< HEAD
        title:'加载中',
        mask:true
=======
        title: '加载中',
        mask: true
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
      })
      this.size()
      this.loadTopicPage(option)
      this.collectStatus()
    },

    onUnload() {
      this.words = ''
      this.focusState = false
      this.real_estate_name = ''
      this.interactList = ''
      this.views_num = ''
      this.user_type = ''
      this.hideUser = ''
      this.collect_status = ''
      this.images = []
      this.localImage = ''
      this.showImages = []
      this.user_status = '匿名'
    },

    methods: {
      loadTopicPage(option) {
        let that = this
        let tag = JSON.parse(option.tag)
        that.tag = tag
        that.tag_id = tag.id
        that.real_estate_name = tag.real_estate_name
<<<<<<< HEAD
=======
        if(option.interactList){
          console.log('有交互列表')
          return;
        }
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        let uploadTagId = {
          tag_id: tag.id
        }
        console.log('外面')
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          console.log('里面')
          that.interactList = tagDetail.data.interactList //通过话题id拿到该话题的交互列表
          that.views_num = tagDetail.data.tag.views_num
          that.user_type = that.interactList[0].user_type || ''
          that.hideUser = that.interactList[0].user
<<<<<<< HEAD
          wx.hideLoading()
=======
          that.$nextTick(function(){
            wx.hideLoading()
          })
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        })
      },
      reloadTopicPage() {
        let that = this
        let uploadTagId = {
          tag_id: this.tag_id
        }
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          that.interactList = tagDetail.data.interactList //通过话题id拿到该话题的交互列表
          that.user_type = that.interactList[0].user_type || ''
          that.hideUser = that.interactList[0].user
        }).catch(function (err) {
          console.log(err)
        })
      },
      timeOut(){
        this.focusState = false
        let that = this
<<<<<<< HEAD
        that.focusState = false
=======
        let timer = setTimeout(function(){
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        if (that.words) {
          let interact = {}
          if (that.words.indexOf(':') !== -1) {
            let arr = that.words.split(':')
            if (arr[0].indexOf('回复') === 0) {
              if (arr[1]) {
                if (that.to_interact_id) {
                  interact.interact_type = '回复'
                  interact.to_interact_id = that.to_interact_id
                  arr.splice(0, 1)
                  if (that.showImages.length === 0) {
                    interact.interact_content = arr.join(':')
                  } else {
                    interact.interact_content = arr.join(':') + 'images=' + JSON.stringify(that.images)
                  }
                } else {
                  wx.showToast({
                    title: '找不到回复对象！',
                    icon: 'none',
                    mask: true,
                    duration: 1000
                  })
                  return;
                }
              } else {
                wx.showToast({
                  title: '回复内容为空！',
                  icon: 'none',
                  mask: true,
                  duration: 1000
                })
                return;
              }
            } else {
              interact.interact_type = '评论'
              if (that.showImages.length === 0) {
                interact.interact_content = that.words
              } else {
                interact.interact_content = that.words + 'images=' + JSON.stringify(that.images)
              }
<<<<<<< HEAD
              wx.showLoading({
                title:'发送中',
                mask:true
              })
              that.$get('api/update', updateInteract).then(function (obj) {
                wx.hideLoading()
                that.words = ''
                that.images = []
                that.localImages = []
                that.user_status = '匿名'
                that.reloadTopicPage()
              })
              that.$nextTick(function(){
                that.focusState = false
              })
=======
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
            }
          } else {
            interact.interact_type = '评论'
            if (that.showImages.length === 0) {
              interact.interact_content = that.words
            } else {
              interact.interact_content = that.words + 'images=' + JSON.stringify(that.images)
            }
          }
          if (that.user_status === '已匿名') {
            interact.user_type = '匿名'
          }
          interact.tag_id = that.tag_id
          interact.user_id = that.myDetail.user.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          wx.showLoading({
            title: '发送中',
            mask: true
          })
          that.$get('api/update', updateInteract).then(function (obj) {
            that.$sendMessage(JSON.stringify(obj.data))
            that.words = ''
            that.showImages = []
            that.images = []
            that.localImage = ''
            that.user_status = '匿名'
            clearTimeout(timer)
            that.reloadTopicPage()
            wx.hideLoading()
          })
          // that.$nextTick(function(){
          //   that.focusState = false
          // })
        } else {
          wx.showToast({
            title: '评论内容为空！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        },100)
      },
<<<<<<< HEAD
      clickCollect(){
        let that = this
        if(!that.collectLock){
=======
      
      clickCollect() {
        this.focusState = false
        let that = this
        if (!that.collectLock) {
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
          return;
        }
        that.collectLock = !that.collectLock
        let record = {}
<<<<<<< HEAD
        if(that.collect_status === '收藏'){
=======
        if (that.collect_status === '收藏') {
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
          that.collect_status = '已收藏'
          record.record_type = '收藏记录'
          record.user_id = that.myDetail.user.id
          record.tag_id = that.tag_id
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
<<<<<<< HEAD
          that.$get('api/update',uploadRecord).then(function(res){
            res.data.tag = that.tag
            res.data.realEstate = {real_estate_name:that.real_estate_name}
=======
          that.$get('api/update', uploadRecord).then(function (res) {
            res.data.tag = that.tag
            res.data.realEstate = {
              real_estate_name: that.real_estate_name
            }
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
            that.collectId = res.data.id
            that.myDetail.recordList.reverse()
            that.myDetail.recordList.push(res.data)
            that.myDetail.recordList.reverse()
            that.reSetMyDetail(that.myDetail)
            that.collectLock = !that.collectLock
          })
<<<<<<< HEAD
        }else if(that.collect_status === '已收藏'){
=======
        } else if (that.collect_status === '已收藏') {
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
          that.collect_status = '收藏'
          record.record_type = '取消收藏'
          record.id = that.collectId
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
<<<<<<< HEAD
          that.$get('api/update',uploadRecord).then(function(res){
            for(let i=0; i<that.myDetail.recordList.length; i++){
              if(that.myDetail.recordList[i].tag_id===that.tag_id){
=======
          that.$get('api/update', uploadRecord).then(function (res) {
            for (let i = 0; i < that.myDetail.recordList.length; i++) {
              if (that.myDetail.recordList[i].tag_id === that.tag_id) {
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
                that.myDetail.recordList.splice(i, 1)
                break
              }
            }
            that.reSetMyDetail(that.myDetail)
            that.collectLock = !that.collectLock
          })
        }
        // that.$nextTick(function(){
        //   that.focusState = false
        // })
      },

      toReplyName(name, id) {
        this.to_interact_id = id
        this.words = '回复' + name + ':'
        this.focusState = true
      },

      focus() {
        this.focusState = true
      },

      keyInput(event) {
        let value = event.mp.detail.value
        let pos = event.mp.detail.cursor
        let arr = value.split(':')
        if (arr.length === 1 && arr[0].indexOf('回复') === 0) {
          this.words = value.slice(pos)
        }
      },

      size() {
<<<<<<< HEAD
        let windowWidth = wx.getSystemInfoSync().windowWidth
        let windowHeight = wx.getSystemInfoSync().windowHeight
        let statusBarHeight = wx.getSystemInfoSync().statusBarHeight
        let rWindowWidth = 750
        let px_to_rpx = rWindowWidth / windowWidth
        let rWindowHeight = windowHeight * px_to_rpx
        let rStatusBarHeight = statusBarHeight * px_to_rpx
        this.scrollHight = rWindowHeight - rStatusBarHeight - 230
=======
        let that = this
        wx.getSystemInfo({
          success(res) {
            let px_to_rpx = 750 / res.windowWidth
            let height = res.windowHeight * px_to_rpx
            let statusBarHeight = res.statusBarHeight * px_to_rpx
            that.scrollHight = height - statusBarHeight - 230
          }
        })
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
      },
      collectStatus() {
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success: function (res) {
            that.myDetail = res.data
            let recordList = res.data.recordList
            if (recordList.length === 0) {
              that.collect_status = '收藏'
            } else {
              for (let i = 0; i < recordList.length; i++) {
                if (recordList[i].tag_id === that.tag_id) {
                  that.collectId = recordList[i].id
                  that.collect_status = '已收藏'
                  break
                }
              }
              if (that.collect_status === '') {
                that.collect_status = '收藏'
              }
            }
          }
        })
      },

      //上传图片
<<<<<<< HEAD
       upLoadImage() {
=======
      upLoadImage() {
        this.focusState = false
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        let that = this
        let num = 6 - that.showImages.length
        if (num > 0) {
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
              wx.showLoading({
                title: '正在上传图片',
                mask: true
              })
<<<<<<< HEAD
              that.getCanvasImg(0, 0, res.tempFilePaths) //进行压缩
              for(let i in res.tempFilePaths){
                that.localImages.push(res.tempFilePaths[i])
              }
=======
              that.getCanvasImg(res.tempFilePaths[0]) //进行压缩
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
            }
          })
        } else {
          wx.showToast({
            title: '最多6张图片！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
      },
<<<<<<< HEAD
      getCanvasImg: function (index,failNum, tempFilePaths){
        let that = this;
        if (index < tempFilePaths.length){
          const ctx = wx.createCanvasContext('attendCanvasId');
          wx.getImageInfo({
            src:tempFilePaths[index],
            success(res){
              let picH = res.height
              let picW = res.width
              let d = picH/picW
              if(picW>250){
                picW = 250+parseInt((picW-250)/10)
                picH = parseInt(picW*d)
              }
              ctx.drawImage(tempFilePaths[index], 0, 0, picW, picH);
              ctx.draw(true, function () {
                index = index + 1;//上传成功的数量，上传成功则加1
                wx.canvasToTempFilePath({
                  width:picW,
                  height:picH,
                  fileType:'jpg',
                  canvasId: 'attendCanvasId',
                  success: function (res) {
                    that.uploadCanvasImg(res.tempFilePath);
                    that.getCanvasImg(index,failNum,tempFilePaths);
                  }, 
                  fail: function (e) {
                    failNum += 1;//失败数量，可以用来提示用户
                    that.getCanvasImg(inedx,failNum,tempFilePaths);
                  }
                });
              });
            }
          })
        }
      },
      uploadCanvasImg: function (canvasImg){
=======
      getCanvasImg: function (tempFilePath) {
        let that = this;

        const ctx = wx.createCanvasContext('attendCanvasId');
        wx.getImageInfo({
          src: tempFilePath,
          success(res) {
            let picH = res.height
            let picW = res.width
            let d = picH / picW
            if (picW > 300) {
              picW = 300
              picH = parseInt(300 * d)
            }
            ctx.drawImage(tempFilePath, 0, 0, picW, picH);
            ctx.draw(true, function () {
              wx.canvasToTempFilePath({
                width: picW,
                height: picH,
                fileType: 'jpg',
                canvasId: 'attendCanvasId',
                success: function (res) {
                  that.localImage = res.tempFilePath
                  that.uploadCanvasImg(res.tempFilePath);
                  let url = res.tempFilePath.replace('http://tmp/',
                    'https://www.xaoji.com/upload/image/')
                  that.images.push(url)
                }
              });
            });
          }
        })

      },
      uploadCanvasImg: function (canvasImg) {
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        let that = this;
        wx.uploadFile({
          url: 'https://www.xaoji.com/api/uploadImage',
          filePath: canvasImg,
          name: 'pic',
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
<<<<<<< HEAD
            let url = 'https://www.xaoji.com'+JSON.parse(res.data).url
            that.images.push(url)
            if(that.images.length === that.localImages.length){
              wx.hideLoading()
            }
=======
            wx.hideLoading({
              success() {
                that.showImages.push(that.localImage)
              }
            })

            // }
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
          }
        })
      },
      //-上传图片


      //删除图片
      removeImage(index) {
<<<<<<< HEAD
        this.images.splice(index, 1)
        this.localImages.splice(index, 1)
      },
      
      reSetMyDetail(data){
        wx.setStorage({
          key:'myDetail',
          data:data,
=======
        this.focusState = false
        this.images.splice(index, 1)
        this.showImages.splice(index, 1)
      },
      preview: function (index) {
        this.focusState = false
        wx.previewImage({
          current: this.showImages[index], // 当前显示图片的http链接
          urls: this.showImages // 需要预览的图片http链接列表
        })
      },

      reSetMyDetail(data) {
        wx.setStorage({
          key: 'myDetail',
          data: data,
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        })
      },

      //改变匿名状态
<<<<<<< HEAD
      changeUserStatus(){
=======
      changeUserStatus() {
        this.focusState = false
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        let that = this
        if (this.user_status === '匿名') {
          this.user_status = '已匿名'
        } else if (this.user_status === '已匿名') {
          this.user_status = '匿名'
        }
      },
      leave(){
        
      }


    } //methods下括号

  }

</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
    border-bottom: 1px solid #ddd;
  }

  .topicTitle {
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }

  .building {
    position: fixed;
    text-align: left;
    color: #888888;
    font-size: 15px;
    left: 20rpx;
  }

  .topicViews {
    position: fixed;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 15px;
    right: 20rpx;
  }

  .footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    /*置底*/
  }

  .footer ul {
    display: flex;
    flex-direction: row;
  }

  .footer li {
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  #enter {
    width: 600rpx;
    height: 70rpx;
  }

  .send_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 710rpx;
    height: 70rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .send {
    color: #f3cc01;
    position: relative;
    top: 14rpx;
    left: 20rpx;
  }

  .collect,
  .share,
  .image,
  .userstatus {
    width: 120rpx;
    height: 70rpx;
    color: #f3cc01;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 25px;
    border: none;
  }

  .box-img {
    position: relative;
    display: inline-block;
    width: 115rpx;
    height: 115rpx;
    margin-right: 10rpx;
  }

  .box-img .min {
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: 0;
    right: 0;
  }

  .box-img .big {
    width: 115rpx;
    height: 115rpx;
  }

  .myCanvas {
    width: 2000px;
    height: 2000px;
    position: absolute;
    left: -3000px;
  }

</style>
