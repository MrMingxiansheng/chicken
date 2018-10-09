<template>
  <div class="topic">

    <div class="header">
      <div class="building">{{real_estate_name}}</div>
      <div class="topicTitle">{{tag_name}}</div>
      <div class="topicViews">浏览</div>
    </div>

    <div class="content">
      <speak :reply="topicDes"></speak>
      <speak v-for="obj in topic.replys" :key="obj" :reply="obj"></speak>
    </div>

    <div class="footer">
      <div v-for="(img,index) in images" :key="img" v-if="index<6" class="box-img">
        <img :src="img" class="big" @click="preview">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div class="send_arr">
        <input id="enter" v-model="words" maxlength="200" />
        <div class="send" @click="clickSend">发送</div>
      </div>
      <line />
      <ul>
        <!-- <li>
          <button plain="true" class="picture" @click="upLoadImage">图片</button>
        </li> -->
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
        words:'',
        topic: {
          // topicTitle: '高架太吵',
          // building: '梧桐郡',
          // topicViews: 8888,
          // topicContent: {
          //   nickName: '咸菜',
          //   avatarUrl: '/static/images/sg1.jpg',
          //   commentWords: '绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦',
          //   commentImages: [
          //     '/static/images/huanfu1.jpg',
          //     '/static/images/huanfu2.jpg',
          //     '/static/images/huanfu3.jpg',
          //     '/static/images/huanfu4.jpg',
          //     '/static/images/huanfu5.jpg'
          //   ],
          //   time: '100',
          //   praise: 8,
          //   step: 8
          // },
          // comments: [{
          //     nickName: '人工智能',
          //     avatarUrl: '/static/images/sg4.jpg',
          //     commentWords: '说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！',
          //     commentImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '101',
          //     praise: 2,
          //     step: 0
          //   },
          //   {
          //     nickName: '鸡哥',
          //     avatarUrl: '/static/images/sg2.jpg',
          //     commentWords: '有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！',
          //     commentImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '103',
          //     praise: 0,
          //     step: 6
          //   },
          //   {
          //     nickName: '程咬金',
          //     avatarUrl: '/static/images/sg3.jpg',
          //     commentWords: '有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。',
          //     commentImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '104',
          //     praise: 3,
          //     step: 3
          //   }
          // ],
          // replys: [{
          //     sendNickName: '咸菜',
          //     sendAvatarUrl: '/static/images/sg1.jpg',
          //     rogerNickName: '人工智能',
          //     rogerAvatarUrl: '/static/images/sg4.jpg',
          //     replyWords: 'we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！',
          //     replyImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '102',
          //     praise: 4,
          //     step: 4
          //   },
          //   {
          //     sendNickName: '鸡哥',
          //     sendAvatarUrl: '/static/images/sg2.jpg',
          //     rogerNickName: '人工智能',
          //     rogerAvatarUrl: '/static/images/sg4.jpg',
          //     replyWords: '就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多',
          //     replyImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '105',
          //     praise: 0,
          //     step: 5
          //   },
          //   {
          //     sendNickName: '程咬金',
          //     sendAvatarUrl: '/static/images/sg3.jpg',
          //     rogerNickName: '鸡哥',
          //     rogerAvatarUrl: '/static/images/sg2.jpg',
          //     replyWords: '文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~',
          //     replyImages: [
          //       '/static/images/huanfu1.jpg',
          //       '/static/images/huanfu2.jpg',
          //       '/static/images/huanfu3.jpg',
          //       '/static/images/huanfu4.jpg',
          //       '/static/images/huanfu5.jpg'
          //     ],
          //     time: '106',
          //     praise: 9,
          //     step: 7
          //   }
          // ]
        },
        topicDes:{
          userInfo:{
            user_name:'',
            head_url:''
          },
          toUserInfo:{
            user_name:'',
            head_url:''
          },
          interactInfo:{
            interact_content:'',
            update_time:'',
            interact_status:''
          }
        },
        tag_id:'',
        tag_name: '',
        // real_estate_id: '',
        real_estate_name: ''
      }
    },
    onShow() {
      let that = this
      wx.getStorage({
        key: 'tag_name',
        success: function (res) {
          that.tag_name = res.data
        }
      })
      wx.getStorage({
        key:'tag_id',
        success:function(res){
          that.tag_id = res.data
          let uploadTagId = {
            tag_id: res.data
          }
          that.$get("api/queryTagDetail", uploadTagId).then(function (tagDetail) {
            console.log(tagDetail.data)
            let interactList = tagDetail.data.interactList
            for(let i=0;i<interactList.length;i++){
              let oneInteract = interactList[i]
              console.log(oneInteract)
            }
            // that.topicDes.interactInfo = tagDetail.data.interactList[0]
          }) 
        }
      })
      wx.getStorage({
        key: 'real_estate_id',
        success: function (res) {
          // that.real_estate_id = res.data
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
          that.$get("api/queryUserDetail",uploadUserId).then(function(userInfo){
            that.topicDes.userInfo = userInfo.data.user
          })
        }
      })
     

    },
    methods: {
      clickSend(){
        let that = this
        if(that.words){
          wx.getStorage({
            key:'key',
            success:function(res){
              let interact = {}
              interact.interact_content = that.words
              interact.tag_id = that.tag_id
              interact.user_id = res.data.id
              interact.interact_type = '评论'
              interact.interact_status = '0'
              let updateInteract = {
                'db': 'WpInteractModel',
                'model': 'edit',
                'item': JSON.stringify(interact),
                'items': JSON.stringify(interact)
              }
              that.$get('api/update', updateInteract).then(function(obj){
                console.log(obj)
                that.words = ''
              })
            }
          })
        }
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
