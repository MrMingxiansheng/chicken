<template>
  <div class="counter">
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}" class="scroll" :scroll-into-view="toView" @scroll="onScroll"
      enable-back-to-top="true" lower-threshold=100 @scrolltolower="touchBottom" v-if="!showEmpty">
      <div class="box">
        <topic v-for="site in dataList" :item="site" :key="site.id" :real_estate_name="real_estate_name" :user="user"
          @delMyInteract="delMyInteract" @pushMyInteract="pushMyInteract" animation="animation"></topic>
      </div>
      <div class="pass" v-if="errNum>0">已过滤掉{{errNum}}条违规的内容</div>
      <div class="bottomLine" v-if="showBottomLine">----------我是有底线的----------</div>
    </scroll-view>
    <div class="noTag" v-if="showEmpty">还未发布任何话题</div>
    <div class="footer">
      <div v-for="(img,index) in showImages" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview(index)">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <textarea class="text" v-model.lazy="words" maxlength="500" fixed='true' :placeholder="warn?'禁止发有关政治及违法违规的内容':'在此发话题,前10个字重点显示'"
          @focus="changeWarn()" @blur="changeBackWarn()" cursor=-1 placeholder-style="font-size:14px;" auto-height='true' />
        <div class="send" @click="sendTopic()">发送</div>
      </div>
      <ul>
        <li>
          <button plain="true" class="image" @click="chooseImage()">图片</button>
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
  import topic from "@/components/topic"
  export default {
    components: {
      topic
    }, // 数据
    data() {
      return {
        real_estate_name:'',
        real_estate_id:'',
        scrollHight: "",
        dataList: [],
        words: '',
        images: [],
        showImages: [],
        user_status: '匿名',
        user:'',
        myTagList:[],
        holder:true,
        warn:false,
        myInteractList:[],
        errNum:0,
        tag_id:'',   //用于违规话题删除
        toView:'',
        showBottomLine:false,
        showEmpty:false
      }
    },

    onShareAppMessage (res) {
      let that = this
      return {
        title: '大家都在这讨论买房的事,快来看看吧',
        path: '/pages/index/main?realEstateId='+that.real_estate_id,
        success(){
          console.log('转发成功')
        }
      }
    },
    onLoad(option) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let that = this
      that.real_estate_id = option.realEstateId
      that.ScrollViewHeight()
      that.$get('api/queryRealEstateDetail', {
        real_estate_id: option.realEstateId
      }).then(function (res) {
        that.errNum = parseInt(res.data.realEstate.errNum)
        that.real_estate_name = res.data.realEstate.real_estate_name
        wx.setNavigationBarTitle({
          title:res.data.realEstate.real_estate_name+'('+res.data.realEstate.views_num+')',
        })
        let arr = res.data.tagList || []
        if(arr.length===0){
          that.showEmpty = true
        }
        if(arr.length>15){
          for(let i=0; i<15; i++){
            that.dataList.push(arr.splice(0,1)[0])
          }
          that.$setStorage('restTagList',arr)
        }else{
          that.dataList = arr
        }
        that.$nextTick(function () {
          wx.hideLoading()
        })
      })
      wx.getStorage({
        key: 'user',
        success(res) {
          that.user = res.data
        }
      })
      wx.getStorage({
        key: 'myTagList',
        success(res) {
          that.myTagList = []
          for(let i=0; i<res.data.length; i++){
            that.myTagList.push(res.data[i])
          }
        }
      })
      wx.getStorage({
        key:'myInteractList',
        success(res){
          that.myInteractList= []
          for(let i=0; i<res.data.length; i++){
            that.myInteractList.push(res.data[i])
          }
        }
      })
      
    },
    
    onUnload() {
      this.real_estate_name=''
      this.real_estate_id=''
      this.dataList = []
      this.user_status = '匿名'
      this.words = ''
      this.images = []
      this.showImages = []
      this.toView = ''
      this.showBottomLine = false
      this.errNum = 0
      this.showEmpty = false
    },

    methods: {
      //计算滚动高度
      ScrollViewHeight() {
        let that = this
        wx.getSystemInfo({
          success(res) {
            let px_to_rpx = 750 / res.windowWidth
            let height = res.windowHeight * px_to_rpx
            let statusBarHeight = res.statusBarHeight * px_to_rpx
            that.scrollHight = height - statusBarHeight - 125
          }
        })
        //读取机型全屏高度，减去固定高度获得scroll高度
      },

      //发送话题
      sendTopic() {
        let that = this
        if (!that.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        if (that.real_estate_id === '589364'){
           wx.getStorage({
              key: 'user',
              success(res){
               if (res.data.user_type !== '小鸡楼市'){
                  wx.showToast({
                  title: '没有权限!',
                  icon: 'none',
                  mask: true,
                  duration: 1000
                })
              }else {
                that.timer()
              }
              }
           })
        return;
        }
        that.timer()
      },
      //-发送话题
      
      timer () {
        let that = this
        let timer = setTimeout(function () {
          let topicTitle = {} //话题标题
          let interact = {}
          let myTagList = that.myTagList
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
          if (that.images.length !== 0) {
            //有图片
            interact.interact_content = that.words.trim() + 'images=' + JSON.stringify(that.images)
          } else {
            //没有图片
            interact.interact_content = that.words.trim()
          }
          if (that.words.indexOf('https://') !== -1) {
            //有网址
            let wordsArr = that.words.split('https://')
            let words = wordsArr[0]
            let trimWords = words.trim()
            if (trimWords.length === 0) {
              wx.showToast({
                title: '内容为空！',
                icon: 'none',
                mask: true,
                duration: 1000
              })
              return;
            } else if (trimWords.length <= 10) {
              //10个字内
              topicTitle.tag_name = trimWords.replace(/\s*/g, "")
            } else {
              //超过10个字
              topicTitle.tag_name = trimWords.slice(0, 10).replace(/\s*/g, "")
            }
          } else {
            //没有网址
            let trimWords = that.words.trim()
            if (trimWords.length === 0) {
              wx.showToast({
                title: '内容为空！',
                icon: 'none',
                mask: true,
                duration: 1000
              })
              return;
            } else if (trimWords.length <= 10) {
              //10个字内
              topicTitle.tag_name = trimWords.replace(/\s*/g, "")
            } else {
              //超过10个字
              topicTitle.tag_name = trimWords.slice(0, 10).replace(/\s*/g, "")
            }
          }
          topicTitle.real_estate_id = that.real_estate_id
          topicTitle.user_id = that.user.id
          topicTitle.views_num = '0'
          let param = {
            'db': 'WpTagModel',
            'model': 'edit',
            'item': JSON.stringify(topicTitle),
            'items': JSON.stringify(topicTitle)
          }
          wx.showLoading({
            title: '发送中',
            mask: true
          })
          that.$get('api/update', param).then(function (obj) {
            if(!obj.success){
              wx.hideLoading()
              wx.showToast({
                title: '含违规内容,请重新编辑后发送',
                icon: 'none',
                mask: true,
                duration: 2000
              })
              return;
            }
            console.log('发送标题成功')
            if (that.user_status === '已匿名') {
              interact.user_type = '匿名'
            }
            interact.tag_id = obj.data.id
            interact.user_id = obj.data.user_id
            interact.interact_type = '评论'
            interact.interact_status = '0'
            let updateInteract = {
              'db': 'WpInteractModel',
              'model': 'edit',
              'item': JSON.stringify(interact),
              'items': JSON.stringify(interact)
            }
            that.$get('api/update', updateInteract).then(function (res) {
              if(!res.success){
                let temp = {}
                temp.id = interact.tag_id
                temp.tag_status = 'DELETE'
                let updateTemp = {
                  'db': 'WpTagModel',
                  'model': 'edit',
                  'item': JSON.stringify(temp),
                  'items': JSON.stringify(temp)
                }
                that.$get('api/update', updateTemp).then(function(){
                  console.log('违规话题删除成功')
                })
                wx.hideLoading()
                wx.showToast({
                  title: '含违规内容,请重新编辑后发送',
                  icon: 'none',
                  mask: true,
                  duration: 2000
                })
                return;
              }
              console.log('发送描述成功', res.data)
              obj.data.realEstate = {
                real_estate_name: that.real_estate_name
              }
              myTagList.reverse()
              myTagList.push(obj.data)
              myTagList.reverse()
              that.$reSetStorage('myTagList', myTagList)
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
                console.log('绑定交互成功', res.data)
                clearTimeout(timer)
                that.user_status = '匿名'
                that.words = ''
                that.images = []
                that.showImages = []
                that.$get('api/queryRealEstateDetail', {
                  real_estate_id: that.real_estate_id
                }).then(function (res) {
                  that.dataList = []
                  that.showBottomLine=false
                  that.showEmpty = false
                  if(res.data.tagList.length>15){
                    for(let i=0; i<15; i++){
                      that.dataList.push(res.data.tagList.splice(0,1)[0])
                    }
                    that.$setStorage('restTagList',res.data.tagList)
                  }else{
                    that.dataList = res.data.tagList
                  }
                  that.toView = 'tag'+obj.data.id
                  wx.hideLoading()
                })
              })
            })
          })
        }, 200)
      },
      
      //上传图片
      chooseImage() {
        this.focusState = false
        let that = this
        if (!that.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        let num = 6 - that.showImages.length
        if (num > 0) {
          wx.chooseImage({
            count: num,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function (res) {
              wx.showLoading({
                title: '正在上传图片',
                mask: true
              })
              that.compressImage(res.tempFilePaths)
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
      compressImage(imgPaths){
        let that = this
        if(imgPaths.length > 0){
          wx.compressImage({
            src:imgPaths.splice(0,1)[0],
            quality:50,
            success(obj){
              wx.uploadFile({
                url: 'https://www.xaoji.com:3001/api/uploadImage',
                filePath: obj.tempFilePath,
                name: 'pic',
                header: {
                  'content-type': 'multipart/form-data'
                },
                success: function (res) {
                  that.images.push('https://www.xaoji.com:3001'+JSON.parse(res.data).url)
                  that.showImages.push(obj.tempFilePath)
                  that.compressImage(imgPaths)
                },
                fail(res){
                  console.log('error',res)
                  that.compressImage(imgPaths)
                }
              })
            }
          })
        }else{
          wx.hideLoading({})
        }
      },
      //-上传图片

      //图片预览
      preview (index) {
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

      changeUserStatus() {
        let that = this
        if (this.user_status === '匿名') {
          this.user_status = '已匿名'
        } else if (this.user_status === '已匿名') {
          this.user_status = '匿名'
        }
      },

     
      reLoadRealEstatePage() {
        let that = this
        that.$get('api/queryRealEstateDetail', {
          real_estate_id: that.real_estate_id
        }).then(function (res) {
          that.dataList = res.data.tagList
          wx.hideLoading()
        })
      },

      changeWarn(){
        this.warn = true
      },
      changeBackWarn(){
        this.warn = false
      },

      onScroll(e){
        this.toView = ''
      },

      touchBottom(){
        let that = this
        wx.getStorage({
          key:'restTagList',
          success(res){
            if(res.data.length>15){
              for(let i=0; i<15; i++){
                that.dataList.push(res.data.splice(0,1)[0])
              }
              that.$reSetStorage('restTagList',res.data)
            }else{
              for(let i=0; i<res.data.length; i++){
                that.dataList.push(res.data[i])
              }
              wx.removeStorage({
                key:'restTagList',
                success(){
                  console.log('restTagList缓存删除成功')
                }
              })
            }
          },
          fail(){
            console.log('没有更多数据')
            that.showBottomLine = true
          }
        })
      },

      delMyInteract(id){
        let that = this
        for (let i = 0; i < that.myInteractList.length; i++) {
          if (that.myInteractList[i].id === id) {
            that.myInteractList.splice(i, 1)
            break
          }
        }
        that.$reSetStorage('myInteractList', that.myInteractList)
      },
      pushMyInteract(data){
        let that = this
        that.myInteractList.push(data)
        that.$reSetStorage('myInteractList', that.myInteractList)
      }


    } //methods的下括号
  }

</script>

<style scoped>

  .scroll {
    margin-top: 10rpx;
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
    font-weight:700;/*字体加粗*/
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  
  .text {
    width: 550rpx;
    max-height: 5em;
    margin: auto 20rpx;
    font-size:14px;
  }

  .send_arr {
    display: flex;
    flex-direction: row;
    border-radius: 7px;
    border: 1px solid #d0d0d0;
    width: 710rpx;
    min-height: 70rpx;
    margin-left: 20rpx;
    background-color: #fff;
  }

  .send {
    color: #f3cc01;
    font-weight:700;/*字体加粗*/
    height: 70rpx;
    line-height: 70rpx;
    position: absolute;
    left: 630rpx;
    bottom: 90rpx;
  }

  .userstatus,
  .share,
  .image {
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
    width: 111rpx;
    height: 111rpx;
    margin-left: 12rpx;
  }

  .box-img .min {
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: -30rpx;
    right: 0;
  }

  .box-img .big {
    width: 111rpx;
    height: 111rpx;
  }

  .pass{
    color: #ccc;
    font-size: 14px;
    text-align: center;
    margin-top: 10rpx;
    height: 40rpx;
    line-height: 40rpx;
  }

  .bottomLine{
    color: #ccc;
    font-size: 14px;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
  }

  .noTag{
    text-align: center;
    color: rgb(229, 229, 229);
    font-size: 25px;
    margin-top: 400rpx;
  }

</style>
