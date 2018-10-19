<template>
  <div class="all">
    <div class="loupan">
      <div class="topic-center">发布小话题</div>
    </div>
    <line />
    <div :style="{height:scrollHeight+'px'}" class="scroll">
      <input id="title" v-model="words" type="text" placeholder="小话题标题（限8个字内,讨论或问题皆可）" placeholder-style="font-size: 15px" maxlength="8" />
      <textarea cols="5" class="title1" placeholder="加点小话题的描述,限200个字内（可不填）" maxlength="200" placeholder-style="font-size: 15px" v-model="des"></textarea>
      <div class="box">
        <div v-for="(img,index) in localImages" :key="index" v-if="index<6" class="box-img">
          <img :src="img" class="big" @click="preview(index)">
          <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
        </div>
        <div id="plus" v-if="localImages.length<6&&localImages.length>0">
          <img src="/static/images/jiahao.png" @click="upLoadImage" />
        </div>
        <div id="plus1" v-if="localImages.length===0">
          <img src="/static/images/jiahao.png" @click="upLoadImage" />
          <span>图片(可不选)</span>
        </div>
      </div>
    </div>
    <canvas canvas-id='attendCanvasId' class='myCanvas'></canvas>
    <div class="item1">
      <span>提示：可以匿名发小话题</span>
      <line />
      <ul>
        <li>
          <button class="AnonymousPublish" plain="true" @click="ClickAnonymous">匿名发</button>
        </li>
        <li>
          <button class="publish" plain="true" @click="ClickPublish">发布</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import line from "@/components/line"
  export default {
    components: {
      line
    },
    data() {
      return {
        scrollHeight: "",
        build: "未来城",
        words: "",
        des: '',
        tag:'',
        images: [],
        localImages:[],
        uploadTasks:[]
      }
    },
    onLoad() {
      let that = this
      wx.getStorage({
        key: 'real_estate_name', //楼盘名字
        success: function (res) {
          that.build = res.data
        }
      })
    },
    
    onReady() {
      this.ScrollViewHeight()
    },
    computed: {},
    methods: {
      //childsay
      childSay: function (title) {
        this.words = title
      },
      //-childsay

      //ClickPublish
      ClickPublish: async function () { //上传数据
        let that = this
        let isLogin = await this.$isLogin()
        console.log('888888', isLogin)
        if (!isLogin) {
          //handle error
          return
        }
        if (that.words.length === 0) { //交互提示
          wx.showToast({
            title: '小话题不能为空！',
            icon: 'loading',
            mask: true,
            duration: 1000
          })
          return;
        }
        let temp = {}
        temp.tag_name = that.words
        wx.getStorage({
          key: 'real_estate_id',
          success: function (res) {
            console.log(res)
            temp.real_estate_id = res.data
            temp.user_id = isLogin
            temp.views_num = '0'
            let param = {
              'db': 'WpTagModel',
              'model': 'edit',
              'item': JSON.stringify(temp),
              'items': JSON.stringify(temp)
            }
            that.$get('api/update', param).then(function (res) {
              that.tag = res.data
              let interact = {}
              if (that.des) {
                if(that.images.length===0){
                  interact.interact_content = that.des
                }else{
                  interact.interact_content = that.des+'images='+JSON.stringify(that.images)
                }
              } else {
                if(that.images.length===0){
                  interact.interact_content = '"' + that.words + '"'
                }else{
                  interact.interact_content = '"' + that.words + '"'+'images='+JSON.stringify(that.images)
                }
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
                  that.des = ''
                  that.images = []
                  wx.redirectTo({
                    url:'/pages/qwb/main?tag='+JSON.stringify(that.tag)
                  })
                })
              })
            })
          }
        })
      },
      //-ClickPublish

      //ClickAnonymous
      ClickAnonymous: async function () { //上传数据
        let that = this
        let isLogin = await this.$isLogin()
        console.log('888888', isLogin)
        if (!isLogin) {
          //handle error
          return
        }
        if (that.words.length === 0) { //交互提示
          wx.showToast({
            title: '小话题不能为空！',
            icon: 'loading',
            mask: true,
            duration: 1000
          })
          return;
        }
        let temp = {}
        temp.tag_name = that.words
        wx.getStorage({
          key: 'real_estate_id',
          success: function (res) {
            console.log(res)
            temp.real_estate_id = res.data
            temp.user_id = isLogin
            temp.views_num = '0'
            let param = {
              'db': 'WpTagModel',
              'model': 'edit',
              'item': JSON.stringify(temp),
              'items': JSON.stringify(temp)
            }
            that.$get('api/update', param).then(function (res) {
              that.tag = res.data
              let interact = {}
              if (that.des) {
                interact.interact_content = that.des
              } else {
                interact.interact_content = '"' + that.words + '"'
              }
              interact.tag_id = res.data.id
              interact.user_id = res.data.user_id
              interact.interact_type = '评论'
              interact.interact_status = '0'
              interact.user_type = '匿名'
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
                  console.log('话题描述发布成功')
                  wx.navigateTo({
                    url:'/pages/qwb/main?tag='+JSON.stringify(that.tag)
                  })
                })
              })
            })
          }
        })
      },
      //-ClickAnonymous

      //ScrollViewHeight
      ScrollViewHeight() {
        let that = this
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let scrollHeight = windowHeight - 100;
        that.scrollHeight = scrollHeight;
        //读取机型全屏高度，减去固定高度获得scroll高度
      },
      //-ScrollViewHeight

      //upLoadImage
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
      },

      //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
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
      },
      //-upLoadImage

      preview: function (index) {
        //图片预览
        wx.previewImage({
          current: this.localImages[index], // 当前显示图片的http链接
          urls: this.localImages // 需要预览的图片http链接列表
        })
      },
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
    }//methods
  }
</script>

<style scoped>
  .loupan {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
  }

  .topic-center {
    position: fixed;
    width: 100%;
    text-align: center;
    font-size: 22px;
  }

  .build-left {
    position: fixed;
    text-align: left;
    color: #888888;
    font-size: 17px;
    left: 20rpx;
  }

  .scroll {
    overflow: auto;
  }

  #title {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top: 40rpx;
    height: 100rpx;
    width: 700rpx;
    padding-left: 20rpx;
  }

  p {
    margin-top: 20rpx;
    margin-left: 20rpx;
  }

  .item {
    list-style: none;
    margin-left: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .title1 {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top: 40rpx;
    height: 200rpx;
    width: 700rpx;
    padding-left: 20rpx;
  }

  .box {
    width: 660rpx;
    margin: 20rpx auto;
  }

  .box img {
    vertical-align: middle;
  }

  .box div {
    display: inline-block;
    width: 200rpx;
    height: 200rpx;
    margin: 10rpx;
  }

  .box .box-img {
    position: relative;
  }
  

  .box .box-img .min {
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 0;
    right: 0;
  }

  .box .box-img .big {
    width: 200rpx;
    height: 200rpx;
  }

  
  #plus {
    padding: 50rpx;
    box-sizing: border-box;
  }

  #plus img,
  #plus1 img {
    width: 100rpx;
    height: 100rpx;
  }

  #plus1 {
    margin-left: 230rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
 

  #plus1 span {
    font-size: 15px;
    color: rgb(137, 145, 150);
  }
 

  .item1 {
    width: 100%;
    position: fixed;
    bottom: 0;
    /*置底*/
  }

  .item1 ul {
    display: flex;
    flex-direction: row;
  }

  .item1 li {
    color: #c5a500;
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  .item1 span {
    font-size: 15px;
    color: rgb(137, 145, 150);
  }

  .publish {
    width: 120rpx;
    height: 70rpx;
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 50rpx;
    border: none;
  }

  .AnonymousPublish {
    width: 120rpx;
    height: 70rpx;
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 50rpx;
    border: none;
  }
  
  .myCanvas{
    width: 2000px;
    height: 2000px;
    position: absolute;
    left: -3000px;
  }
</style>
