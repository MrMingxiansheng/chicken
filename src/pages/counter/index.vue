<template>
  <div>
    <div class="home">
      <div class="home-center">{{real_estate_name}}</div>
      <div class="browse-right">{{views_num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'rpx'}" class="item">
        <div class="box">
          <topic v-for="(site,index) in dataList" :item="site" :key="index"></topic>
        </div>
    </scroll-view>
    <canvas canvas-id='attendCanvasId' class='myCanvas'></canvas>
    <div class="footer">
      <div v-for="(img,index) in localImages" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview(index)">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <input id="enter" v-model="words" :focus="focusState" @focus="focus" maxlength="200" />
        <div class="send" @click="sendTopic">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="image" @click="upLoadImage">图片</button>
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
  import itemx from "@/components/itemx"
  import topic from "@/components/topic"
  export default {
    components: {
      line,
      itemx,
      topic
    }, // 数据
    data() {
      return {
        scrollHeight: "",
        views_num: "",
        real_estate_name: "",
        real_estate_id:'',
        dataList: [],
        words:'',
        images:[],
        localImages:[],
        focusState:false,
        uploadTasks:[],
        user_status:'匿名'
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
    onLoad() {
      let that = this
      that.ScrollViewHeight()
      wx.getStorage({
        key: 'real_estate_name', //楼盘名字
        success: function (res) {
          that.real_estate_name = res.data
          console.log('楼盘',that.real_estate_name)
        }
      })
      wx.getStorage({
        key: 'real_estate_id', //楼盘ID
        success: function (res) { 
        that.real_estate_id = res.data
        let param={
             real_estate_id: res.data
           };  
            that.$get('api/queryRealEstateDetail',param).then(function (res){
              that.views_num = res.data.realEstate.views_num
              for (let i=0;i<res.data.tagList.length;i++){ 
              that.dataList = res.data.tagList
                   let second_tag_id={
                  tag_id: that.dataList[i].id
                }
                that.$get('api/queryTagDetail',second_tag_id).then(function (res){
                  that.dataList[i].length = res.data.interactList.length
                  that.dataList[i].cnum = res.data.interactList[0].cnum
                  console.log('num',that.dataList[0].cnum)
                    let temp = JSON.parse(JSON.stringify(that.dataList))
                      that.dataList = []
                      that.dataList = temp
                        console.log('楼盘',that.dataList) 
                }) 
              }
              })
           }      
      })
    },
    onUnload() {
      this.real_estate_name = ''
      this.views_num = ''
      this.dataList = []
      this.focusState = false
      this.user_status = '匿名'
    },
    onPullDownRefresh: function(){

    },
    computed: {},
    methods: {
      //计算滚动高度
      ScrollViewHeight() {
        let that = this
        let windowWidth = wx.getSystemInfoSync().windowWidth;
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let rwindowWidth = 750
        let px_to_rpx = rwindowWidth / windowWidth
        let rWindowHeight = windowHeight * px_to_rpx
        that.scrollHeight = rWindowHeight - 270;
        //读取机型全屏高度，减去固定高度获得scroll高度
      },
      
      //发送话题
      sendTopic () {
        let that = this
        let topicTitle = {} //话题标题
        let topicDes = {} //话题内容
        let my_user_id = wx.getStorageSync('key').id || ''
        if(!my_user_id){
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
        if(that.words.indexOf('https://')!==-1){
          //有网址
          let wordsArr = that.words.split('https://')
          let words = wordsArr[0]
          if(words.indexOf(' ')!==-1){
            //有空格
            let trimWords = words.trim()
            let noSpaceArr = trimWords.split(' ')
            if(noSpaceArr[0].length<=8){
              //8个字内
              topicTitle.tag_name = noSpaceArr[0]
            }else{
              //超过8个字
              topicTitle.tag_name = noSpaceArr[0].slice(0,7)
            }
          }else{
            //没有空格
            if(words.length<=8){
              //8个字内
              topicTitle.tag_name = words
            }else{
              //超过8个字
              topicTitle.tag_name = words.slice(0,7)
            }
          }
        }else{
          //没有网址
          if(that.words.indexOf(' ')!==-1){
            //有空格
            let trimWords = that.words.trim()
            let noSpaceArr = trimWords.split(' ')
            if(noSpaceArr[0].length<=8){
              //8个字内
              topicTitle.tag_name = noSpaceArr[0]
            }else{
              //超过8个字
              topicTitle.tag_name = noSpaceArr[0].slice(0,7)
            }
          }else{
            //没有空格
            if(that.words.length<=8){
              //8个字内
              topicTitle.tag_name = that.words
            }else{
              //超过8个字
             topicTitle.tag_name = that.words.slice(0,7)
            }
          }
        }
        topicTitle.real_estate_id = that.real_estate_id
        topicTitle.user_id = my_user_id
        topicTitle.views_num = '0'
        let param = {
          'db': 'WpTagModel',
          'model': 'edit',
          'item': JSON.stringify(topicTitle),
          'items': JSON.stringify(topicTitle)
        }
        wx.showToast({
          title: '发送中',
          icon: 'loading',
          mask: true,
          duration: 2500
        })
        that.$get('api/update', param).then(function (res) {
          that.tag = res.data //跳转页面用
          console.log('that.tag',that.tag)
          let interact = {}
          if(that.localImages.length!==0){
            //有图片
            if(that.localImages.length === that.images.length){
              //可以直接发送
              interact.interact_content = that.words+'images='+JSON.stringify(that.images)
            }else{
              //等图片地址返回再发送
              wx.showToast({
                title: '图片上传中',
                icon: 'loading',
                mask: true,
                duration: 3000
              })
              return;
            }
          }else{
            //没有图片
            interact.interact_content = that.words
          }
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
              that.words = ''
              that.images = []
              that.localImages = []
              wx.redirectTo({
                url:'/pages/qwb/main?tag='+JSON.stringify(that.tag)
              })

                
            })
          })
        })
        that.$nextTick(function(){
          that.focusState = false
        })
        
      },
      //-发送话题

      //上传图片
      upLoadImage() {
        let that = this
        let num = 6 - that.localImages.length
        if(num>0){
          wx.chooseImage({
            count: num,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
              that.getCanvasImg(0, 0, res.tempFilePaths) //进行压缩
              wx.showLoading({
                title:'正在上传图片',
                mask:true
              })
              let timer = setTimeout(function(){
                wx.hideLoading({
                  success(){
                    clearTimeout(timer)
                    for(let i in res.tempFilePaths){
                      that.localImages.push(res.tempFilePaths[i])
                    }
                  }
                })
              },3000)
            }
          })
        }
        that.$nextTick(function(){
          that.focusState = false
        })
      },
      getCanvasImg: function (index,failNum, tempFilePaths){
        console.log('2')
        let that = this;
        if (index < tempFilePaths.length){
          const ctx = wx.createCanvasContext('attendCanvasId');
          wx.getImageInfo({
            src:tempFilePaths[index],
            success(res){
              let picH = res.height
              let picW = res.width
              ctx.drawImage(tempFilePaths[index], 0, 0, 150, 150*picH/picW);
              ctx.draw(true, function () {
                index = index + 1;//上传成功的数量，上传成功则加1
                wx.canvasToTempFilePath({
                  width:150,
                  height:150*picH/picW,
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
        that.$nextTick(function(){
          that.focusState = false
        })
      },
      uploadCanvasImg: function (canvasImg){
        let that = this;
        let uploadTask = wx.uploadFile({
          url: 'http://www.xaoji.com:3000/api/uploadImage',
          filePath: canvasImg,
          name: 'pic',
          header:{
            'content-type':'multipart/form-data'
          },
          success: function (res) {
            console.log('res',res)
            console.log('JSON.parse(res.data)',JSON.parse(res.data))
            let url = 'http://www.xaoji.com:3000'+JSON.parse(res.data).url
            that.images.push(url)
            // console.log(that.images)
          }
        })
        that.uploadTasks.push(uploadTask)
        that.$nextTick(function(){
          that.focusState = false
        })
      },
      //-上传图片

      //图片预览
      preview: function (index) {
        wx.previewImage({
          current: this.localImages[index], // 当前显示图片的http链接
          urls: this.localImages // 需要预览的图片http链接列表
        })
      },

      //删除图片
      removeImage(index) {
        let that = this
        if(that.images[index]){
          that.images.splice(index, 1)
          that.localImages.splice(index, 1)
          that.uploadTasks.splice(index, 1)
        }else{
          console.log('else')
          that.uploadTasks[index].abort()
          that.localImages.splice(index, 1)
          that.uploadTasks.splice(index, 1)
        }
      },

      //输入框聚焦
      focus(){
        this.focusState = true
      },
      //输入框失去焦点
      leave(){
        this.focusState = false
      },

      changeUserStatus(){
        let that = this
        if(this.user_status === '匿名'){
          this.user_status = '已匿名'
        }else if(this.user_status === '已匿名'){
          this.user_status = '匿名'
        }
        this.focusState = false
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

  .myCanvas{
    width: 2000px;
    height: 2000px;
    position: absolute;
    left: -3000px;
  }

</style>
