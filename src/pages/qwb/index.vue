<template>
  <div>
    <div class="loupan">
      <div class="build-left">{{real_estate_name}}</div>
      <div class="topic-center">{{tag_name}}</div>
      <div class="browse-right">{{views_num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" class="listsite">
      <aite v-for="site in dataList" :item="site" :key="site" @child="childSay"></aite>
    </scroll-view>
    <div class="item">
      <div v-for="(img,index) in images" :key="img" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <input id="enter" v-model="words" maxlength="200" />
        <div class="send" @click="ClickSend">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="picture" @click="upLoadImage">图片</button>
        </li>
        <li>
          <button plain="true" class="collect" v-if="collectStatus" @click="ClickCollect">收藏</button>
          <button plain="true" class="collect" v-else @click="ClickCollect">已收藏</button>
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
  import aite from "@/components/aite"
  export default {
    components: {
      line,
      aite
    },
    data() {
      return {
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
                })
              }
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

  .browse-right {
    position: fixed;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 15px;
    right: 20rpx;
  }

  .item {
    width: 100%;
    position: fixed;
    bottom: 0;
    /*置底*/
  }

  .item ul {
    display: flex;
    flex-direction: row;
  }

  .item li {
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  .box-img {
    position: relative;
    display: inline-block;
  }

  .box-img img {
    width: 100rpx;
    height: 100rpx;
    margin-left: 20rpx;
  }

  .box-img .min {
    width: 30rpx;
    height: 30rpx;
    position: absolute;
    top: 0;
    right: 0;
  }

  .box-img .big {
    width: 100rpx;
    height: 100rpx;
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

  .picture {
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

  .collect {
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

  .share {
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

</style>
