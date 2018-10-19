<template>
  <div class="topic">
    <div class="header">
      <div class="building">{{real_estate_name}}</div>
      <div class="topicTitle">{{tag_name}}</div>
      <div class="topicViews">{{views_num}}浏览</div>
    </div>
    <scroll-view scroll-y="true" :style="{height:scrollHight+'rpx'}">
      <div class="content">
        <speak v-for="obj in interactList" :key="obj.id" :reply="obj" :owner="user_id" :user_type="user_type" :hideUser="hideUser"
          @toReplyName="toReplyName"></speak>
      </div>
    </scroll-view>
    <div class="footer">
      <div v-for="(img,index) in images" :key="index" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <input id="enter" v-model="words" :focus="focusState" @input="keyInput" :cursor="cursor" @focus="focus"
          maxlength="200" />
        <div class="send" @click="clickSend">发送</div>
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
        scrollHight: '',
        focusState: false,
        collect_status: '',
        collectId: '',
        words: '',
        images: [],
        interactList: '',
        tag_id: '',
        tag_name: '',
        user_id: '',
        my_user_id: '',
        myDetail: '',
        user_type: '',
        hideUser: '',
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
      this.images = []
    },

    methods: {
      loadTopicPage(option) {
        console.log('开始加载话题页面')
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
                      if (that.images.length === 0) {
                        interact.interact_content = arr.join(':')
                      } else {
                        interact.interact_content = arr.join(':') + 'images=' + JSON.stringify(that.images)
                      }
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
                  if (that.images.length === 0) {
                    interact.interact_content = that.words
                  } else {
                    interact.interact_content = that.words + 'images=' + JSON.stringify(that.images)
                  }
                }
              } else {
                interact.interact_type = '评论'
                if (that.images.length === 0) {
                  interact.interact_content = that.words
                } else {
                  interact.interact_content = that.words + 'images=' + JSON.stringify(that.images)
                }
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
                that.images = []
                that.reloadTopicPage()
                console.log('到底了')
              })
              that.$nextTick(function () {
                that.focusState = false
              })
            }
          })
        } else {
          console.log('评论为空')
        }
      },

      clickCollect() {
        console.log('点击收藏按钮')
        let that = this
        let record = {}
        if (that.collect_status === '收藏') {
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
          that.$get('api/update', uploadRecord).then(function (res) {
            that.collect_status = '已收藏'
            that.collectId = res.data.id
            that.myDetail.recordList.reverse()
            that.myDetail.recordList.push(res.data)
            that.myDetail.recordList.reverse()
            wx.setStorage({
              key: 'myDetail',
              data: that.myDetail
            })
            console.log('收藏成功')
          })
        } else if (that.collect_status === '已收藏') {
          console.log('开始取消收藏')
          record.record_type = '取消收藏'
          record.id = that.collectId
          let uploadRecord = {
            'db': 'WpRecordModel',
            'model': 'edit',
            'item': JSON.stringify(record),
            'items': JSON.stringify(record)
          }
          that.$get('api/update', uploadRecord).then(function (res) {
            that.collect_status = '收藏'
            for (let i = 0; i < that.myDetail.recordList.length; i++) {
              if (that.myDetail.recordList[i].tag_id === that.tag_id) {
                that.myDetail.recordList.splice(i, 1)
                break
              }
            }
            wx.setStorage({
              key: 'myDetail',
              data: that.myDetail
            })
            console.log('取消收藏成功')
          })
        }
        that.$nextTick(function () {
          that.focusState = false
        })
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

      collectStatus() {
        let that = this
        wx.getStorage({
          key: 'myDetail',
          success(res) {
            that.myDetail = res.data
            that.my_user_id = res.data.user.id
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

      upLoadImage() {
        let that = this
        wx.chooseImage({
          count: 6, //最多可以选择的图片总数 
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 
          sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有 
          success(res) {
            const tempFilePaths = res.tempFilePaths
            for (let i = 0; i < tempFilePaths.length; i++) {
              wx.uploadFile({
                url: 'http://www.xaoji.com:3000/api/uploadImage',
                filePath: tempFilePaths[i],
                name: 'pic',
                header: {
                  'content-type': 'multipart/form-data'
                },
                success(res) {
                  console.log('传图成功', res)
                  let url = 'http://www.xaoji.com:3000' + JSON.parse(res.data).url
                  console.log('url', url)
                  that.images.push(url)
                  console.log('that.images', that.images)
                  // const data = res.data
                },
                fail(err) {
                  console.log('传图失败', err)
                }
              })
            }

          }
        })
      },

      removeImage(index) {
        this.images.splice(index, 1)
      },

    },

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
    color: #c5a500;
    position: relative;
    top: 14rpx;
    left: 20rpx;
  }

  .collect,
  .share,
  .image {
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

</style>
