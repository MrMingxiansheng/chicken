<template>
<<<<<<< HEAD
  <div class="topic">
    <div class="header">
      <div class="building">{{real_estate_name}}</div>
      <div class="topicTitle">{{tag_name}}</div>
      <div class="topicViews">{{views_num}}浏览</div>
=======
  <div>
    <div class="loupan">
      <div class="build-left">{{real_estate_name}}</div>
      <div class="topic-center">{{tag_name}}</div>
      <div class="browse-right">{{views_num}}浏览</div>
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
    </div>
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}">
      <div class="content">
        <speak v-for="obj in interactList" :key="obj.id" :reply="obj" :owner="user_id" :user_type="user_type" :hideUser="hideUser" @toReplyName="toReplyName"></speak>
      </div>
    </scroll-view>
    <div class="footer">
      <div class="send_arr">
        <input id="enter" v-model="words" :focus="focusState" @input="keyInput" :cursor="cursor" @focus="focus"
          maxlength="200" />
        <div class="send" @click="clickSend">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="collect" @click="clickCollect">{{collect_status}}</button>
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
        scrollHight: '',
        focusState: false,
        collect_status:'',
        collectId:'',
        words: '',
        interactList: '',
        tag_id: '',
        tag_name: '',
        user_id:'',
        my_user_id:'',
        user_type:'',
        hideUser:'',
        real_estate_name: '',
        to_interact_id: '',
        views_num: '',
        cursor: -1
      }
    },

    onLoad(option) {
      this.size()
      this.loadTopicPage(option)
      this.collectStatus()
    },

    onUnload() {
      this.words = ''
      this.focusState = false
      this.tag_name = ''
      this.views_num = ''
      this.user_id = ''
      this.real_estate_name = ''
      this.interactList = ''
      this.user_type = ''
      this.hideUser = ''
      this.collect_status = ''
    },
    methods: {
      loadTopicPage(option) {
        let that = this
        let tag = JSON.parse(option.tag)
        that.tag_name = tag.tag_name //拿到话题的标题
        that.views_num = tag.views_num //拿到话题的浏览量
        that.user_id = tag.user_id //拿到发话题的人的id,用来判断是不是题主
        that.tag_id = tag.id
        let uploadEstateId = {
          real_estate_id: tag.real_estate_id
        }
        that.$get("api/queryRealEstateDetail", uploadEstateId).then(function (d) {
          that.real_estate_name = d.data.realEstate.real_estate_name //通过楼盘id拿到楼盘名
        })
        let uploadTagId = {
          tag_id: tag.id
        }
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          that.interactList = tagDetail.data.interactList //通过话题id拿到该话题的交互列表
          that.user_type = that.interactList[0].user_type || ''
          that.hideUser = that.interactList[0].user
        })
      },
      reloadTopicPage(){
        let that = this
        let uploadTagId = {
          tag_id: this.tag_id
        }
        that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
          that.interactList = tagDetail.data.interactList //通过话题id拿到该话题的交互列表
          that.user_type = that.interactList[0].user_type || ''
          that.hideUser = that.interactList[0].user
        }).catch(function(err){
          console.log(err)
        })
      },
      clickSend() {
        let that = this
        if (that.words) {
          wx.getStorage({
            key: 'key',
            success: function (res) {
              let interact = {}
              if (that.words.indexOf(':') !== -1) {
                let arr = that.words.split(':')
                if (arr[0].indexOf('回复') === 0) {
                  if (arr[1]) {
                    if (that.to_interact_id) {
                      interact.interact_type = '回复'
                      interact.to_interact_id = that.to_interact_id
                      arr.splice(0, 1)
                      interact.interact_content = arr.join(':')
                    } else {
                      console.log('找不到回复的对象')
                      return
                    }
                  } else {
                    console.log('回复为空')
                    return
                  }
                } else {
                  interact.interact_type = '评论'
                  interact.interact_content = that.words
                }
              } else {
                interact.interact_type = '评论'
                interact.interact_content = that.words
              }
              interact.tag_id = that.tag_id
              interact.user_id = res.data.id
              interact.interact_status = '0'
              let updateInteract = {
                'db': 'WpInteractModel',
                'model': 'edit',
                'item': JSON.stringify(interact),
                'items': JSON.stringify(interact)
              }
              that.$get('api/update', updateInteract).then(function (obj) {
                that.words = ''
                that.reloadTopicPage()
                console.log('到底了')
              })
            }
          })
        } else {
          console.log('评论为空')
        }
      },
      clickCollect(){
        console.log('点击收藏按钮')
        let that = this
        let record = {}
        if(that.collect_status === '收藏'){
          console.log('开始收藏')
          record.record_type = '收藏记录'
          record.user_id = that.my_user_id
          record.tag_id = that.tag_id
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
          that.$get('api/update',uploadRecord).then(function(res){
            that.collect_status = '已收藏'
            that.collectId = res.data.id
            console.log('收藏成功')
          })
        }else if(that.collect_status === '已收藏'){
          console.log('开始取消收藏')
          record.record_type = '取消收藏'
          record.id = that.collectId
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
          that.$get('api/update',uploadRecord).then(function(res){
            that.collect_status = '收藏'
            console.log('取消收藏成功')
          })
        }
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
        let windowWidth = wx.getSystemInfoSync().windowWidth
        let windowHeight = wx.getSystemInfoSync().windowHeight
        let statusBarHeight = wx.getSystemInfoSync().statusBarHeight
        let rWindowWidth = 750
        let px_to_rpx = rWindowWidth / windowWidth
        let rWindowHeight = windowHeight * px_to_rpx
        let rStatusBarHeight = statusBarHeight * px_to_rpx
        this.scrollHight = rWindowHeight - rStatusBarHeight - 240
      },
      collectStatus(){
        let that = this
        wx.getStorage({
          key:'key',
          success:function(res){
            that.my_user_id = res.data.id
            that.$get('api/queryUserDetail',{user_id:res.data.id}).then(function(obj){
              let recordList = obj.data.recordList
              if(recordList.length === 0){
                console.log('1')
                that.collect_status = '收藏'
              }else{
                console.log('2')
                let arr = recordList.filter(function(ele){
                  return ele.tag_id === that.tag_id && ele.record_type === '收藏记录'
=======
        scrollHeight: '',
        tag_name: '',
        real_estate_name: '',
        views_num: '',
        words: '',
        dataList: [{
            user: "姓名",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名1",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名2",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名3",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名4",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "5",
            userType: "(销售)",
            time: "昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
        ],
        images: [],
        collectStatus: true,
        recordId:''
      };
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '来蒙多这儿',
        path: '/pages/qwb/main',
        imageUrl: ''
      }
    },
    onLoad: async function () {
        let that = this
        let isLogin = await this.$isLogin()
        if (!isLogin) {
          //handle error
          return
        }
        wx.getStorage({
          key: 'tag_name',
          success: function (res) {
            that.tag_name = res.data
          }
        })
        wx.getStorage({
          key: 'real_estate_name',
          success: function (res) {
            that.real_estate_name = res.data
          }
        })
        wx.getStorage({
          key: 'tag_id',
          success: function (res) {
            let id = {
              tag_id: res.data
            }
            that.$get('api/queryTagDetail', id).then(function (res) {
              that.views_num = res.data.tag.views_num
            })
            let record = {}
            record.tag_id = res.data
            record.user_id = isLogin
            record.record_type = '浏览记录'
            let updataRecord = {
              'db': 'WpRecordModel',
              'model': 'edit',
              'item': JSON.stringify(record),
              'items': JSON.stringify(record)
            }
            that.$get('api/update', updataRecord)
            //判断是否收藏
            let isLoginCollect = {}
            let isLoginCollectId = {
              user_id: isLogin
            }
            isLoginCollect.tag_id = res.data
            isLoginCollect.user_id = isLogin
            that.$get('api/queryUserDetail', isLoginCollectId).then(function (res) {
              for (let i = 0; i < res.data.recordList.length; i++) {
                console.log('遍历',res.data.recordList)
                if (res.data.recordList[i].record_type === '收藏记录' && isLoginCollect.tag_id === res.data.recordList[i].tag_id){
                  that.collectStatus = false
                  that.recordId = res.data.recordList[i].id
                  console.log('收藏记录id',that.recordId)
                } else {
                }
                if (res.data.recordList[i].record_type === '收藏记录' && that.recordId === res.data.recordList[i].id) {                
                  that.collectStatus = false
                  console.log('状态', that.collectStatus)
                  break //调出循环
                }
              }
            })
          }
        })
      },
      onReady() {
        console.log("ScrollViewHeight")
        this.ScrollViewHeight()
      },
      methods: {
        ClickSend: function () {
          let that = this
          let temp = {}
          temp.interact_content = this.words
          let param = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(temp),
            'items': JSON.stringify(temp)
          }
          if (this.words.length == 0) { //交互提示  
            return;
          }
          that.$get('api/update', param)
          console.log("发送")
        },
        ClickCollect: async function () {
            let that = this
            that.collectStatus = !that.collectStatus
            //交互反馈
            if (that.collectStatus == false) { //收藏
              wx.showToast({
                title: "收藏成功",
                icon: 'success',
                mask: true,
                duration: 1000
              })
            } else {
              wx.showToast({ //取消收藏
                title: "收藏取消",
                icon: 'success',
                mask: true,
                duration: 1000
              })
            }
            let collect = {}
            let deletCollect = {}
            let isLogin = await this.$isLogin()
            if (!isLogin) {
              //handle error
              return
            }
            wx.getStorage({
              key: 'tag_id',
              success: function (res) {
                collect.tag_id = res.data
                collect.user_id = isLogin
                collect.record_type = '收藏记录'
                let updataCollect = {
                  'db': 'WpRecordModel',
                  'model': 'edit',
                  'item': JSON.stringify(collect),
                  'items': JSON.stringify(collect)
                }
                deletCollect.id = that.recordId
                console.log('取消收藏id',deletCollect.id)
                deletCollect.record_type = '取消收藏'
                let updataDeletCollect = {
                  'db': 'WpRecordModel',
                  'model': 'edit',
                  'item': JSON.stringify(deletCollect),
                  'items': JSON.stringify(deletCollect)
                }
                if (that.collectStatus == false) {
                  that.$get('api/update', updataCollect).then(function (res) {
                  console.log('收藏成功',res)
                  that.recordId = res.data.id
                  // wx.setStorage({
                  //   key: 'recordId',
                  //   data: res.data.id,
                  //   success: function (res) {
                  //   }
                  // })
                  console.log('成功',that.recordId)
                  })
                } else {
                  that.$get('api/update', updataDeletCollect)
                  console.log('取消收藏成功')
                }
              }
            })
          },
          childSay: function (enter) {
            this.words = enter
          },
          ScrollViewHeight() {
            let that = this
            let windowHeight = wx.getSystemInfoSync().windowHeight
            let scrollHeight = windowHeight - 130
            that.scrollHeight = scrollHeight
            //读取机型全屏高度，减去固定高度获得scroll高度
          },
          upLoadImage() {
            let that = this;
            wx.chooseImage({
              count: 6, //最多可以选择的图片总数 
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有 
              success: function (res) {
                let paths = res.tempFilePaths
                wx.showToast({
                  title: '正在上传...',
                  icon: 'loading',
                  mask: true,
                  duration: 500
                })
                for (let i = 0; i < paths.length; i++) {
                  if (that.images.length < 6) {
                    that.images.push(paths[i])
                  } else {
                    wx.showModal({
                      title: '温馨提示',
                      content: '最多可上传六张照片',
                      showCancel: false,
                    })
                  }
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
                })
                if(arr.length === 0){
                  console.log('3')
                  that.collect_status = '收藏'
                }else{
                  that.collectId = arr[0].id
                  console.log('4')
                  that.collect_status = '已收藏'
                }
              }
<<<<<<< HEAD
            })
          }
        })
      }



    },
    
=======
            })
          },
          preview: function () {
            //图片预览
            wx.previewImage({
              current: '', // 当前显示图片的http链接
              urls: this.images // 需要预览的图片http链接列表
            })
          },
          removeImage(index) {
            this.images.splice(index, 1) //删除
          },

      }
>>>>>>> 957438c3fca124ee9a98c487b76ea95ff21d62c4
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
    font-size: 22px;
  }

  .building {
    position: fixed;
    text-align: left;
    color: #888888;
    font-size: 17px;
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
    color: #c5a500;
    position: relative;
    top: 14rpx;
    left: 20rpx;
  }

  .collect {
    width: 120rpx;
    height: 70rpx;
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 25px;
    border: none;
  }

  .share {
    width: 120rpx;
    height: 70rpx;
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 25px;
    border: none;
  }

</style>
