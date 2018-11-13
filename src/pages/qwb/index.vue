<template>
  <div class="topic">
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}" enable-back-to-top="true" 
    :scroll-into-view="toView" @scroll="onScroll" lower-threshold=100
      @scrolltolower="touchBottom">
      <div class="content">
        <speak v-for="(obj,index) in interactList" :key="obj.id" :reply="obj" 
          :owner="tag.user_id" :user_type="user_type"
          @pushMyInteract="pushMyInteract" @delMyInteract="delMyInteract"
          :hideUser="hideUser" :user="user" :index="index" @toReplyName="toReplyName"
          @changeFocus="changeFocus"></speak>
      </div>
      <div class="pass" v-if="parseInt(tag.errNum)>0">已过滤掉{{tag.errNum}}条违规的内容</div>
      <div class="bottomLine" v-if="showBottomLine">----------我是有底线的----------</div>
    </scroll-view>
    <div class="footer" v-if="!del">
      <div v-for="(img,index) in showImages" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <textarea class="text" v-model.lazy="words" maxlength="500" fixed='true'
        placeholder="禁止发有关政治及违法违规的内容" placeholder-style="font-size:14px;"
        auto-height='true' @blur="leave" :focus="focusState" cursor=-1
        @focus="focus" @input="keyInput" />
        <div class="send" @click="sendInteract">发送</div>
      </div>
      <ul>
        <li>
          <button plain="true" class="image" @click="chooseImage()">图片</button>
        </li>
        <li>
          <button plain="true" class="collect" @click.stop="clickCollect">{{collect_status}}</button>
        </li>
        <li>
          <button class="userstatus" plain="true" @click="changeUserStatus">{{user_status}}</button>
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
  export default {
    components: {
      speak,
    },
    data() {
      return {
        scrollHight: '', //滚动高度
        focusState: false, //输入框是否聚焦
        collect_status: '收藏', //收藏状态,是<收藏>还是<已收藏>
        collectId: '', //一条收藏的id,用来取消收藏的时候覆盖
        words: '', //输入框的内容
        images: [], //图片列表,用于发送
        showImages: [],//图片列表,用于发送前的展示
        interactList: [], //交互列表,给reply组件加载评论和回复
        tag_id: '', //当前话题的id,用来刷新评论和回复
        recordList: [],//我的收藏列表,用于收藏功能
        user_type: '', //传给reply,判断题主是不是匿名
        hideUser: '', //传给reply,匿名的头像和昵称
        real_estate_name: '', //楼盘名,收藏后要存到缓存里
        to_interact_id: '', //用来判断是评论还是回复,回复哪条交互
        tag: '', //包含tag_name,views_num,user_id(传给reply,用来判断是不是题主),tag_id(单独提出来了)
        user_status: '匿名',//用于匿名发布的功能
        collectLock: true,//给收藏按钮的点击加的锁,防止太快的点击出错
        user:'',//我的用户信息,操作前要判断有没有登录,没登录不能操作
        toView:'',//用于scroll-view的滚动定位
        del:false,//如果话题被删掉了,从消息点进来就把界面隐藏
        showBottomLine:false,//控制底线的显示和隐藏
        myInteractList:[]  //用来点赞点踩的缓存操作
      }
    },

    onLoad(option) {
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      let that = this
      //计算滚动区域的高度
      that.size()
      //加载页面
      that.loadTopicPage(option)
      //初始化收藏状态
      that.collectStatus()
      //缓存中取出我的信息,没有这个缓存就不能互动
      wx.getStorage({
        key:'user',
        success(res){
          that.user = res.data
        }
      })
      //缓存中取出我的交互列表,用于点赞点踩的判断
      wx.getStorage({
        key:'myInteractList',
        success(res){
          that.myInteractList= []
          //防止一次性赋值数据太大,循环push
          for(let i=0; i<res.data.length; i++){
            that.myInteractList.push(res.data[i])
          }
        }
      })
    },

    onUnload() {
      //离开页面的时候把状态还原
      this.words = ''
      this.tag = ''
      this.focusState = false
      this.interactList = []
      this.recordList = []
      this.collect_status = '收藏'
      this.images = []
      this.showImages = []
      this.user_status = '匿名'
      this.del = false
      this.showBottomLine = false
      this.toView = ''
      wx.removeStorage({
        key:'restInteract',
        success(){
          console.log('restInteract缓存删除成功')
        }
      })
    },

    methods: {
      //加载话题页面
      loadTopicPage(option) {
        let that = this
        let tag = JSON.parse(option.tag)
        that.tag_id = tag.tag_id
        that.real_estate_name = tag.real_estate_name
        let uploadTagId = {
          tag_id: tag.tag_id
        }
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          if(tagDetail.data.tag.tag_status === 'DELETE'){
            //话题是被删掉的,不给展示
            that.del = true
            wx.showToast({
              title: '该话题已被删除！',
              icon: 'none',
              mask: true,
              duration: 1500
            })
            return;
          }
          let data = tagDetail.data
          that.tag = data.tag
          that.user_type = data.interactList[0].user_type || ''
          that.hideUser = data.interactList[0].user
          //首次渲染15条,剩余放缓存,下拉触底再拿出来
          if(data.interactList.length>15){
            for(let i=0; i<15; i++){
              that.interactList.push(data.interactList.splice(0,1)[0])
            }
            that.$setStorage('restInteract',data.interactList)
          }else{
            that.interactList = data.interactList
          }
          let msg = option.msg
          if(msg){
            //是从消息跳转过来的,设置toview自动滚动
            let parseMsg = JSON.parse(msg)
            if(parseMsg.interact_type === '回复'){
              that.toView = 'interact' + parseMsg.id
            }else{
              that.toView = 'interact' + parseMsg.to_interact_id
            }
          }
          that.$nextTick(function(){
            wx.hideLoading()
          })
          //在navigationBar设置话题名和浏览量
          let views_num;
          if(that.tag.views_num>10000000){
            views_num = that.tag.views_num -10000000;
          }else{
            views_num = that.tag.views_num;
          }
          wx.setNavigationBarTitle({
            title: '#'+that.tag.tag_name+'('+views_num+')',
          })
          that.$nextTick(function () {
            wx.hideLoading()
          })
        }).catch(function(){
          wx.hideLoading()
          that.del = true
          wx.showToast({
            title: '该话题已被删除！',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        })
      },

      //发完交互后更新页面
      reloadTopicPage() {
        let that = this
        let uploadTagId = {
          tag_id: that.tag_id
        }
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          that.interactList = []
          that.showBottomLine=false
          let data = tagDetail.data
          if(data.interactList.length>15){
            for(let i=0; i<15; i++){
              that.interactList.push(data.interactList.splice(0,1)[0])
            }
            that.$setStorage('restInteract',data.interactList)
          }else{
            that.interactList = data.interactList
          }
          that.$nextTick(function(){
            wx.hideLoading()
          })
        }).catch(function (err) {
          that.del = true
          wx.showToast({
            title: '该话题已被删除！',
            icon: 'none',
            mask: true,
            duration: 1500
          })
        })
      },

      //发送交互
      sendInteract(){
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
        //由于v-model.lazy,这里要定时器
        let timer = setTimeout(function(){
        if (that.words) {
          let interact = {}
          //判断是回复还是评论
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
              //不以'回复'开头,是评论
              interact.interact_type = '评论'
              if (that.showImages.length === 0) {
                interact.interact_content = that.words
              } else {
                interact.interact_content = that.words + 'images=' + JSON.stringify(that.images)
              }
            }
          } else {
            //没有冒号,是评论
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
          if(that.user.id === that.tag.user_id && that.user_type === '匿名'){
            interact.user_type = '匿名'
          }
          interact.tag_id = that.tag_id
          interact.user_id = that.user.id
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
            that.$sendMessage(JSON.stringify(obj.data))
            that.words = ''
            that.showImages = []
            that.images = []
            that.user_status = '匿名'
            that.toView = 'interact'+obj.data.id
            clearTimeout(timer)
            that.reloadTopicPage()
          })
          that.$nextTick(function(){
            that.focusState = false
          })
        } else {
          wx.showToast({
            title: '评论内容为空！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        },200)
      },
      
      //点击收藏
      clickCollect() {
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
        if (!that.collectLock) {
          return;
        }
        that.collectLock = !that.collectLock
        let record = {}
        if (that.collect_status === '收藏') {
          that.collect_status = '已收藏'
          record.record_type = '收藏记录'
          record.user_id = that.user.id
          record.tag_id = that.tag_id
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
          that.$get('api/update', uploadRecord).then(function (res) {
            //加上楼盘名
            res.data.realEstate = {
              real_estate_name: that.real_estate_name
            }
            res.data.tag = that.tag //为了在我的页面收藏里面有话题名
            that.collectId = res.data.id
            that.recordList.reverse()
            that.recordList.push(res.data)
            that.recordList.reverse()
            that.$reSetStorage('recordList',that.recordList)
            that.collectLock = !that.collectLock
          })
        } else if (that.collect_status === '已收藏') {
          that.collect_status = '收藏'
          record.record_type = '取消收藏'
          record.id = that.collectId
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
          that.$get('api/update', uploadRecord).then(function (res) {
            for (let i = 0; i < that.recordList.length; i++) {
              if (that.recordList[i].tag_id === that.tag_id) {
                that.recordList.splice(i, 1)
                break
              }
            }
            that.$reSetStorage('recordList',that.recordList)
            that.collectLock = !that.collectLock
          }).catch(function(){
            console.log('网络错误,收藏失败')
          })
        }
      },

      //子组件点击回复后调用的自定义事件
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
        let that = this
        wx.getSystemInfo({
          success(res) {
            let px_to_rpx = 750 / res.windowWidth
            let height = res.windowHeight * px_to_rpx
            let statusBarHeight = res.statusBarHeight * px_to_rpx
            that.scrollHight = height - statusBarHeight - 115
          }
        })
      },

      //初始化收藏状态
      collectStatus() {
        let that = this
        wx.getStorage({
          key: 'recordList',
          success: function (res) {
            let recordList = res.data
            if (recordList.length > 0) {
              for (let i = 0; i < recordList.length; i++) {
                that.recordList.push(recordList[i])
                if (recordList[i].tag_id === that.tag_id) {
                  that.collectId = recordList[i].id
                  that.collect_status = '已收藏'
                }
              }
            }
          }
        })
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


      //删除图片
      removeImage(index) {
        this.focusState = false
        this.images.splice(index, 1)
        this.showImages.splice(index, 1)
      },
      preview (index) {
        this.focusState = false
        wx.previewImage({
          current: this.showImages[index], // 当前显示图片的http链接
          urls: this.showImages // 需要预览的图片http链接列表
        })
      },


      //改变匿名状态
      changeUserStatus() {
        this.focusState = false
        let that = this
        if (this.user_status === '匿名') {
          this.user_status = '已匿名'
        } else if (this.user_status === '已匿名') {
          this.user_status = '匿名'
        }
      },

      changeFocus(){
        this.focusState = false
      },
      pushMyInteract(data){
        let that = this
        that.myInteractList.push(data)
        that.$reSetStorage('myInteractList', that.myInteractList)
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

      //滚动区域触底
      touchBottom(){
        let that = this
        wx.getStorage({
          key:'restInteract',
          success(res){
            if(res.data.length>15){
              for(let i=0; i<15; i++){
                that.interactList.push(res.data.splice(0,1)[0])
              }
              that.$reSetStorage('restInteract',res.data)
            }else{
              for(let i=0; i<res.data.length; i++){
                that.interactList.push(res.data[i])
              }
              wx.removeStorage({
                key:'restInteract',
                success(){
                  console.log('restInteract缓存删除成功')
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

      onScroll(){
        this.toView = ''
      },

      leave(){
        this.focusState = false
      }

    }, //methods下括号

    onShareAppMessage (res) {
      let that = this
      let obj = {
        real_estate_name:that.real_estate_name,
        tag_id:that.tag_id
      }
      return {
        title: '大家都在这讨论买房的事,快来看看吧',
        path: '/pages/index/main?tag='+JSON.stringify(obj),
        success(){
          console.log('转发成功')
        }
      }
      
    }

  }

</script>

<style scoped>
  
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

  .bottomLine{
    color: #ccc;
    font-size: 14px;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
  }
  
  .pass{
    color: #ccc;
    font-size: 14px;
    text-align: center;
    margin-top: 10rpx;
    height: 40rpx;
    line-height: 40rpx;
  }

</style>
