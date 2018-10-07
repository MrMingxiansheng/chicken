<template>
  <div class="topic">

    <div class="header">
      <div class="building">{{topic.building}}</div>
      <div class="topicTitle">{{topic.topicTitle}}</div>
      <div class="topicViews">{{topic.topicViews}}浏览</div>
    </div>

    <div class="content">
      <word :comment="topic.topicContent"></word>
      <word v-for="val in topic.comments" :key="val" :comment="val"></word>
      <speak v-for="obj in topic.replys" :key="obj" :reply="obj"></speak>
    </div>

    <div class="footer">

    </div>
  </div>
</template>

<script>
  import word from '@/components/comment'
  import speak from '@/components/reply'
  export default {
    components: {
      word,
      speak
    },
    data() {
      return {
        topic: {
          topicTitle: '高架太吵',
          building: '梧桐郡',
          topicViews: 8888,
          topicContent: {
            nickName: '咸菜',
            avatarUrl: '/static/images/sg1.jpg',
            commentWords: '绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦绕城高速和天目山路的声音太大啦',
            commentImages: [
              '/static/images/huanfu1.jpg',
              '/static/images/huanfu2.jpg',
              '/static/images/huanfu3.jpg',
              '/static/images/huanfu4.jpg',
              '/static/images/huanfu5.jpg'
            ],
            time: '100',
            praise: 8,
            step: 8
          },
          comments: [{
              nickName: '人工智能',
              avatarUrl: '/static/images/sg4.jpg',
              commentWords: '说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！说的很对，就是这样！',
              commentImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '101',
              praise: 2,
              step: 0
            },
            {
              nickName: '鸡哥',
              avatarUrl: '/static/images/sg2.jpg',
              commentWords: '有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！有吗？我这里很安静啊！',
              commentImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '103',
              praise: 0,
              step: 6
            },
            {
              nickName: '程咬金',
              avatarUrl: '/static/images/sg3.jpg',
              commentWords: '有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。有的住就不错啦，有点吵很正常。',
              commentImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '104',
              praise: 3,
              step: 3
            }
          ],
          replys: [{
              sendNickName: '咸菜',
              sendAvatarUrl: '/static/images/sg1.jpg',
              rogerNickName: '人工智能',
              rogerAvatarUrl: '/static/images/sg4.jpg',
              replyWords: 'we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！we are 伐木累！',
              replyImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '102',
              praise: 4,
              step: 4
            },
            {
              sendNickName: '鸡哥',
              sendAvatarUrl: '/static/images/sg2.jpg',
              rogerNickName: '人工智能',
              rogerAvatarUrl: '/static/images/sg4.jpg',
              replyWords: '就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多+就你话多',
              replyImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '105',
              praise: 0,
              step: 5
            },
            {
              sendNickName: '程咬金',
              sendAvatarUrl: '/static/images/sg3.jpg',
              rogerNickName: '鸡哥',
              rogerAvatarUrl: '/static/images/sg2.jpg',
              replyWords: '文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~文明发言~',
              replyImages: [
                '/static/images/huanfu1.jpg',
                '/static/images/huanfu2.jpg',
                '/static/images/huanfu3.jpg',
                '/static/images/huanfu4.jpg',
                '/static/images/huanfu5.jpg'
              ],
              time: '106',
              praise: 9,
              step: 7
            }
          ]
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

</style>
