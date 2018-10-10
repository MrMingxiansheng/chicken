<template>
  <div class="topic">
    <div class="header">
      <div class="building">{{real_estate_name}}</div>
      <div class="topicTitle">{{tag_name}}</div>
      <div class="topicViews">{{views_num}}浏览</div>
    </div>
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}">
      <div class="content">
        <speak v-for="(obj,index) in interactList" :key="obj.id" :reply="obj" @toReplyName="toReplyName"></speak>
      </div>
    </scroll-view>
    <div class="footer">
      <div class="send_arr">
        <input id="enter" v-model="words" :focus="focusState" @focus="focus" maxlength="200" />
        <div class="send" @click="clickSend">发送</div>
      </div>
      <line />
      <ul>
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
  import word from '@/components/comment'
  import speak from '@/components/reply'
  import line from "@/components/line"
  export default {
    components: {
      word,
      speak,
      line
    },
    data() {
      return {
        focusState: false,
        words: '',
        interactList: '',
        tag_id: '',
        tag_name: '',
        real_estate_name: '',
        to_interact_id: '',
        views_num:''
      }
    },
    computed: {
      scrollHeight() {
        return wx.getSystemInfoSync().windowHeight - 120
      }
    },
    onLoad() {
      this.loadTopicPage()
    },
    methods: {
      loadTopicPage() {
        let that = this
        wx.getStorage({
          key: 'tag_name',
          success: function (res) {
            that.tag_name = res.data
          }
        })
        wx.getStorage({
          key: 'views_num',
          success: function (res) {
            that.views_num = res.data
          }
        })
        wx.getStorage({
          key: 'tag_id',
          success: function (res) {
            that.tag_id = res.data
            let uploadTagId = {
              tag_id: res.data
            }
            that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
              that.interactList = tagDetail.data.interactList
            })
          }
        })
        wx.getStorage({
          key: 'real_estate_id',
          success: function (res) {
            let uploadEstateId = {
              real_estate_id: res.data
            }
            that.$get("api/queryRealEstateDetail", uploadEstateId).then(function (d) {
              that.real_estate_name = d.data.realEstate.real_estate_name
            })
          }
        })
        wx.getStorage({
          key: 'user_id',
          success: function (res) {
            let uploadUserId = {
              user_id: res.data
            }
            that.$get("api/queryUserDetail", uploadUserId).then(function (userInfo) {
              that.topicDes.userInfo = userInfo.data.user
            })
          }
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
                      arr.splice(0,1)
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
                that.loadTopicPage()
              })
            }
          })
        } else {
          console.log('评论为空')
        }
      },
      toReplyName(name, id) {
        this.to_interact_id = id
        this.words = '回复' + name + ':'
        this.focusState = true
      },
      focus() {
        this.focusState = true
      }
    }
  }

</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 40px;
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
    margin-top: 10px;
    flex: auto;
  }

  #enter {
    width: 600rpx;
    height: 35px;
  }

  .send_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 710rpx;
    height: 35px;
    margin-bottom: 10px;
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
    height: 35px;
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
    height: 35px;
    color: #c5a500;
    font-size: 20px;
    text-align: center;
    padding: 0px;
    vertical-align: middle;
    line-height: 25px;
    border: none;
  }

</style>
