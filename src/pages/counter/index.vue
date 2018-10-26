<template>
  <div>
    <div class="home">
      <div class="home-center">{{real.real_estate_name}}</div>
      <div class="browse-right">{{real.views_num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}" class="item">
        <div class="box">
          <topic v-for="site in dataList" :item="site" :key="site.id" :myDetail="myDetail" :real_estate_name="real.real_estate_name"></topic>
        </div>
    </scroll-view>
    <canvas canvas-id='attendCanvasId' class='myCanvas'></canvas>
    <div class="footer">
      <div v-for="(img,index) in showImages" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview(index)">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
<<<<<<< HEAD
        <input id="enter" v-model.lazy="words" maxlength="200" 
        placeholder="在此发话题,前8个字重点显示"
=======
        <input id="enter"
        v-model.lazy="words"
        maxlength="200" 
        placeholder="  在此发话题,前8个字重点显示"
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        placeholder-style="font-size: 14px"
        />
        <div class="send" @click="sendTopic()">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="image" @click="upLoadImage()">图片</button>
        </li>
        <li>
          <button plain="true" class="userstatus" @click="changeUserStatus()">{{user_status}}</button>
        </li>
        <li>
          <button open-type="share" class="share" plain="true" @click="ClickShare">分享</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import topic from "@/components/topic"
  export default {
    components: {
      line,
      topic
    }, // 数据
    data() {
      return {
        scrollHight: "",
        dataList: [],
        words:'',
        images:[],
        showImages:[],
        localImage:'',
        user_status:'匿名',
        myDetail:'',
        real:''                 //楼盘列表中的一项
      }
    },

    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '来程咬金这儿',
        path: '/pages/counter/main',
        imageUrl: ''
      }
    },
    onLoad(option) {
      wx.showLoading({
        title:'加载中',
        mask:true
      })
      let that = this
      that.ScrollViewHeight()
      that.real = JSON.parse(option.real)
      that.$get('api/queryRealEstateDetail',{real_estate_id:that.real.id}).then(function(res){
        that.dataList = res.data.tagList
        wx.hideLoading()
<<<<<<< HEAD
=======
      })
      wx.getStorage({
        key:'myDetail',
        success(res){
          that.myDetail = res.data
        }
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
      })
      that.myDetail = wx.getStorageSync('myDetail')
    },
    onUnload() {
      this.real = ''
      this.dataList = []
      this.user_status = '匿名'
      this.words = ''
      this.localImage = ''
      this.images = []
      this.showImages = []
    },
   
    methods: {
      //计算滚动高度
      ScrollViewHeight() {
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
          success(res){
            let px_to_rpx = 750 / res.windowWidth
            let height = res.windowHeight*px_to_rpx
            let statusBarHeight = res.statusBarHeight*px_to_rpx
            that.scrollHight = height - statusBarHeight - 230
          }
        })
>>>>>>> f283c01e40d1a67c34ceb2b6085693c8f27e0fe6
        //读取机型全屏高度，减去固定高度获得scroll高度
      },
      
      //发送话题
      sendTopic () {
        let that = this
        let topicTitle = {} //话题标题
        let interact = {}
        if(!that.myDetail.user.id){
          //没有读取到我的id
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        if (that.words.length === 0) {
          //输入框为空
          wx.showToast({
            title: '输入为空！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        if(that.images.length!==0){
          //有图片
          interact.interact_content = that.words.trim()+'images='+JSON.stringify(that.images)
        }else{
          //没有图片
          interact.interact_content = that.words.trim()
        }
        if(that.words.indexOf('https://')!==-1){
          //有网址
          let wordsArr = that.words.split('https://')
          let words = wordsArr[0]
          let trimWords = words.trim()
          if(trimWords.length===0){
            wx.showToast({
              title: '内容为空！',
              icon: 'none',
              mask: true,
              duration: 1000
            })
            return;
          }else if(trimWords.length<=8){
            //8个字内
            topicTitle.tag_name = trimWords.replace(/\s*/g,"")
          }else{
            //超过8个字
            topicTitle.tag_name = trimWords.slice(0,7).replace(/\s*/g,"")
          }
        }else{
          //没有网址
          let trimWords = that.words.trim()
          if(trimWords.length===0){
            wx.showToast({
              title: '内容为空！',
              icon: 'none',
              mask: true,
              duration: 1000
            })
            return;
          }else if(trimWords.length<=8){
            //8个字内
            topicTitle.tag_name = trimWords.replace(/\s*/g,"")
          }else{
            //超过8个字
            topicTitle.tag_name = trimWords.slice(0,7).replace(/\s*/g,"")
          }
        }
        topicTitle.real_estate_id = that.real.id
        topicTitle.user_id = that.myDetail.user.id
        topicTitle.views_num = '0'
        let param = {
          'db': 'WpTagModel',
          'model': 'edit',
          'item': JSON.stringify(topicTitle),
          'items': JSON.stringify(topicTitle)
        }
        wx.showLoading({
          title:'发送中',
          mask:true
        })
        that.$get('api/update', param).then(function (res) {
          console.log('发送标题成功')
          res.data.realEstate = {real_estate_name:that.real.real_estate_name}
          res.data.real_estate_name = that.real.real_estate_name
          that.tag = res.data //跳转页面用
          that.myDetail.tagList.reverse()
          that.myDetail.tagList.push(res.data)
          that.myDetail.tagList.reverse()
          that.reSetMyDetail(that.myDetail)
          if(that.user_status === '已匿名'){
            interact.user_type = '匿名'
          }
          interact.tag_id = res.data.id
          interact.user_id = res.data.user_id
          interact.interact_type = '评论'
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('发送描述成功',res.data)
            let interactId = {
              id: res.data.tag_id,
              tag_content_id: res.data.id
            }
            let updateInteractId = {
              'db': 'WpTagModel',
              'model': 'edit',
              'item': JSON.stringify(interactId),
              'items': JSON.stringify(interactId)
            }
            that.$get('api/update', updateInteractId).then(function () {
              console.log('绑定交互成功',res.data)
              wx.hideLoading()
              wx.redirectTo({
                url:'/pages/qwb/main?tag='+JSON.stringify(that.tag)
              })
            })
          })
        })
      },
      //-发送话题

      //上传图片
      upLoadImage() {
        let that = this
        let num = 6 - that.showImages.length
        if(num>0){
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
              wx.showLoading({
                title:'正在上传图片',
                mask:true
              })
              that.getCanvasImg(res.tempFilePaths[0]) //进行压缩
            }
          })
        }else{
          wx.showToast({
            title: '最多6张图片！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
      },
      getCanvasImg: function (tempFilePath){
        let that = this;
        
          const ctx = wx.createCanvasContext('attendCanvasId');
          wx.getImageInfo({
            src:tempFilePath,
            success(res){
              let picH = res.height
              let picW = res.width
              let d = picH/picW
              if(picW>300){
                picW = 300
                picH = parseInt(300*d)
              }
              ctx.drawImage(tempFilePath, 0, 0, picW, picH);
              ctx.draw(true, function () {
                wx.canvasToTempFilePath({
                  width:picW,
                  height:picH,
                  fileType:'jpg',
                  canvasId: 'attendCanvasId',
                  success: function (res) {
                    that.localImage = res.tempFilePath
                    that.uploadCanvasImg(res.tempFilePath);
                    let url = res.tempFilePath.replace('http://tmp/','https://www.xaoji.com/upload/image/')
                    that.images.push(url)
                  }
                });
              });
            }
          })
        
      },
      uploadCanvasImg: function (canvasImg){
        let that = this;
        wx.uploadFile({
          url: 'https://www.xaoji.com/api/uploadImage',
          filePath: canvasImg,
          name: 'pic',
          header:{
            'content-type':'multipart/form-data'
          },
          success: function (res) {
            wx.hideLoading({
              success(){
                that.showImages.push(that.localImage)
              }
            })
            
            // }
          }
        })
      },
      //-上传图片

      //图片预览
      preview: function (index) {
        wx.previewImage({
          current: this.showImages[index], // 当前显示图片的http链接
          urls: this.showImages // 需要预览的图片http链接列表
        })
      },

      //删除图片
      removeImage(index) {
        this.images.splice(index, 1)
        this.showImages.splice(index, 1)
      },

      changeUserStatus(){
        let that = this
        if(this.user_status === '匿名'){
          this.user_status = '已匿名'
        }else if(this.user_status === '已匿名'){
          this.user_status = '匿名'
        }
      },

      reSetMyDetail(data){
        wx.setStorage({
          key:'myDetail',
          data:data,
        })
      },

      reLoadRealEstatePage(){
        let that = this
        that.$get('api/queryRealEstateDetail',{real_estate_id:that.real.id}).then(function(res){
          that.dataList = res.data.tagList
        })
      }

     


    }//methods的下括号
  }

</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
  }

  .home-center {
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 22px;
  }

  .browse-right {
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

  .userstatus,.share,.image{
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
    width: 125rpx;
    height: 125rpx;
  }

  .box-img .min {
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: 0;
    right: 0;
  }

  .box-img .big {
    width: 125rpx;
    height: 125rpx;
  }

  .myCanvas{
    width: 2000px;
    height: 2000px;
    position: absolute;
    left: -3000px;
  }

</style>
