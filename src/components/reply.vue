<template>
  <div :class="{ reply: index==0} " :style="{'background-color': index>0 ? 'white' : '#ffe144'}" :id="'interact'+reply.id" v-if="reply.user.head_url">
    <div class="topic" :style="{'padding': index>0 ? '20rpx 20rpx 30rpx' : '20rpx'}">
      <div class="avatar">
        <img :src="reply.user.head_url">
      </div>
      <div class="content" :style="{'width': index>0 ? '560rpx' : '520rpx'}">
        <div class="content-in" :style="{'width': index>0 ? '540rpx' : '500rpx'}">
          <div class="user">
            <div class="userName">{{reply.user.user_name}}<span class="userName" v-if="reply.user_id===owner">(题主)</span></div>
            <div class="identity" v-if="reply.user.user_type"><span :class="{ idName: reply.user.user_type }">{{reply.user.user_type}}</span></div>
          </div>
          <div class="words">
            <div class="userName" v-if="reply.interact_type==='回复'">回复&nbsp;&nbsp;{{reply.to_interact.user.user_name}}&nbsp;:<text>{{content}}</text></div>
            <text v-else>{{content}}</text>
            <div class="article" @click="toArticlePage" v-if="articleSrc">文章链接</div>
          </div>
          <div class="images" v-if="images">
            <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)">
          </div>
          <div class="time">
            {{time}}
          </div>
        </div>
      </div>
      <div class="interact">
        <div class="interact-in">
          <div class="praise" @click="clickPraise">
            <div class="praise-num">{{reply.interact_status}}</div>
            <img :src="praiseSrc" class="praise-str" />
          </div>
          <div class="step" @click="clickStep">
            <div class="step-num">{{reply.cnum}}</div>
            <img :src="stepSrc" class="step-str" />
          </div>
          <div class="say" @click="clickReply">
            回复
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["reply", "owner", "hideUser", "user_type", "user", "index"],
    data() {
      return {
        content: '',  //交互的文字内容
        images: '',  //交互的图片
        articleSrc: '',  //交互的链接
        stepLock: true,  //点赞点踩的锁,防止恶意速点
        praiseLock: true,  //点赞点踩的锁,防止恶意速点
        praiseSrc: '/static/images/zan.png',  //点赞点踩图标,默认未点灰色状态
        stepSrc: '/static/images/cai.png',  //点赞点踩图标,默认未点灰色状态
        stepId:'',  //点赞点踩id,用于取消覆盖
        praiseId:'',  //点赞点踩id,用于取消覆盖
        time:'',  //格式化后的时间
      }
    },
    onLoad() {
      let that = this
      //初始化点赞点踩状态
      that.praiseAndStepStatus()
      //处理交互内容
      that.changeContent()
      //格式化时间
      that.time = that.changeTime(that.reply.update_time)
    },
    methods: {
      //处理交互内容,把图片和文章链接抽出来
      changeContent(){
        let allContent, articleArr
        if (this.reply.interact_content.indexOf('images=') === -1) {
          //没有图片
          allContent = this.reply.interact_content
        } else {
          //有图片
          let arr = this.reply.interact_content.split('images=')
          allContent = arr[0]
          this.images = JSON.parse(arr[1])
        }
        if (allContent.indexOf('https://') === -1) {
          //没有连接
          this.content = allContent
        } else {
          //有连接
          let articleArr = allContent.split('https://')
          this.content = articleArr[0]
          this.articleSrc = 'https://' + articleArr[1]
        }
      },

      //点击回复
      clickReply() {
        console.log('clickreply')
        if (!this.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        this.$emit('toReplyName', this.reply.user.user_name, this.reply.id)
      },

      //点赞
      clickPraise() {
        console.log('点了一下赞')
        this.$emit('changeFocus')
        if (!this.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        let that = this
        if (!that.praiseLock) {
          return
        }
        that.praiseLock = !that.praiseLock
        let interact = {}
        let praiseId = that.praiseId
        if (that.praiseSrc.indexOf('zan1') === -1) {
          that.praiseSrc = '/static/images/zan1.png'
          that.reply.interact_status = parseInt(that.reply.interact_status) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.user.id
          interact.interact_type = '点赞'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            that.praiseId = res.data.id
            that.$sendMessage(JSON.stringify(res.data))
            // interactList.push(res.data)
            // that.$reSetStorage('myInteractList', interactList)
            that.$emit('pushMyInteract',res.data)
            console.log('点赞返回', res.data)
            that.praiseLock = !that.praiseLock
          })
        } else {
          that.praiseSrc = '/static/images/zan.png'
          that.reply.interact_status = parseInt(that.reply.interact_status) - 1
          // for (let i = 0; i < interactList.length; i++) {
          //   if (interactList[i].id === praiseId) {
          //     interactList.splice(i, 1)
          //     break
          //   }
          // }
          // that.$reSetStorage('myInteractList', interactList)
          that.$emit('delMyInteract',praiseId)
          interact.id = praiseId
          interact.interact_type = '取消赞'
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.user.id
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('取消赞返回', res.data)
            that.praiseLock = !that.praiseLock
          })
        }
      },

      //点踩
      clickStep() {
        console.log('点了一下踩')
        this.$emit('changeFocus')
        if (!this.user.id) {
          wx.showToast({
            title: '请先登录！',
            icon: 'none',
            mask: true,
            duration: 1000
          })
          return;
        }
        let that = this
        if (!that.stepLock) {
          return
        }
        that.stepLock = !that.stepLock
        let interact = {}
        let stepId = that.stepId
        let interactList = that.interactList
        if (that.stepSrc.indexOf('cai1') === -1) {
          that.stepSrc = '/static/images/cai1.png'
          that.reply.cnum = parseInt(that.reply.cnum) + 1
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.user.id
          interact.interact_type = '点踩'
          interact.user_type = '匿名'
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            that.stepId = res.data.id
            that.$sendMessage(JSON.stringify(res.data))
            // interactList.push(res.data)
            // that.$reSetStorage('myInteractList', interactList)
            that.$emit('pushMyInteract',res.data)
            console.log('点踩返回', res.data)
            that.stepLock = !that.stepLock
          })
        } else {
          that.stepSrc = '/static/images/cai.png'
          that.reply.cnum = parseInt(that.reply.cnum) - 1
          // for (let i = 0; i < interactList.length; i++) {
          //   if (interactList[i].id === stepId) {
          //     console.log('interactList[i].id',interactList[i].id)
          //     interactList.splice(i, 1)
          //     break
          //   }
          // }
          // that.$reSetStorage('myInteractList', interactList)
          that.$emit('delMyInteract',stepId)
          interact.id = stepId
          interact.interact_type = '取消踩'
          interact.tag_id = that.reply.tag_id
          interact.user_id = that.user.id
          interact.to_interact_id = that.reply.id
          interact.interact_status = '0'
          let updateInteract = {
            'db': 'WpInteractModel',
            'model': 'edit',
            'item': JSON.stringify(interact),
            'items': JSON.stringify(interact)
          }
          that.$get('api/update', updateInteract).then(function (res) {
            console.log('取消踩返回', res.data)
            that.stepLock = !that.stepLock
          })
        }
      },

      //初始化点赞点踩状态
      praiseAndStepStatus() {
        let that = this
        wx.getStorage({
          key:'myInteractList',
          success(res){
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].to_interact_id === that.reply.id && res.data[i].interact_type === '点赞') {
                that.praiseId = res.data[i].id
                that.praiseSrc = '/static/images/zan1.png'
              }
              if (res.data[i].to_interact_id === that.reply.id && res.data[i].interact_type === '点踩') {
                that.stepId = res.data[i].id
                that.stepSrc = '/static/images/cai1.png'
              }
            }
          }
        })
        
      },

      //图片预览
      preview(index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
        })
      },

      //跳转到文章页面
      toArticlePage() {
        let that = this
        wx.navigateTo({
          url: '/pages/article/main?src=' + that.articleSrc
        })
      },

      //格式化时间
      changeTime(date){
        let past = new Date(date)
        let now = new Date()
        let pastYear = past.getFullYear()
        let pastMonth = past.getMonth()
        let pastDate = past.getDate()
        let pastDay = past.getDay()
        let nowYear = now.getFullYear()
        let nowMonth = now.getMonth()
        let nowDate = now.getDate()
        let nowDay = now.getDay()
        if(pastYear===nowYear){
          //今年
          if(pastMonth===nowMonth){
            //当月
            if(pastDate===nowDate){
              //今天
              let hour = past.getHours()
              let minute = past.getMinutes()
              return ('0'+hour).substr(-2)+':'+('0'+minute).substr(-2);
            }else{
              //昨天或更早
              if(nowDate-pastDate===1){
                //昨天
                return '昨天';
              }else{
                if(nowDay>=3){
                  //可能显示星期
                  if(nowDate-pastDate<nowDay){
                    return this.showWeek(pastDay);
                  }else{
                    return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                  }
                }else if(nowDay===0){
                  //可能显示星期
                  if(nowDate-pastDate<7){
                    return this.showWeek(pastDay);
                  }else{
                    return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                  }
                }else{
                  //不显示星期
                  return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                }
              }
            }
          }else{
            //不是当月
            if(pastMonth-nowMonth===-1){
              //上个月
              if(nowDate===1){
                //今天是1号,可能是昨天
                if(nowYear%4===0){
                  //闰年
                  if(pastMonth===1){
                    //28天
                    if(pastDate===28){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+28-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+28-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }else if(pastMonth===0||pastMonth===2||pastMonth===4||pastMonth===6||pastMonth===7||pastMonth===9){
                    //31天
                    if(pastDate===31){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+31-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+31-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }else{
                    //30天
                    if(pastDate===30){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+30-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+30-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }
                }else{
                  //平年
                  if(pastMonth===1){
                    //29天
                    if(pastDate===29){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+29-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+29-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }else if(pastMonth===0||pastMonth===2||pastMonth===4||pastMonth===6||pastMonth===7||pastMonth===9){
                    //31天
                    if(pastDate===31){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+31-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+31-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }else{
                    //30天
                    if(pastDate===30){
                      return '昨天'
                    }else{
                      //不是昨天,判断是不是本周
                      if(nowDay>=3){
                        //可能显示星期
                        if(nowDate+30-pastDate<nowDay){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else if(nowDay===0){
                        //可能显示星期
                        if(nowDate+30-pastDate<7){
                          return this.showWeek(pastDay);
                        }else{
                          return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                        }
                      }else{
                        //不显示星期
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }
                  }
                }
              }else{
                //今天不是1号,不可能是昨天,判断是不是本周
                if(nowYear%4===0){
                  //闰年
                  if(pastMonth===1){
                    //28天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+28-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+28-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }else if(pastMonth===0||pastMonth===2||pastMonth===4||pastMonth===6||pastMonth===7||pastMonth===9){
                    //31天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+31-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+31-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }else{
                    //30天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+30-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+30-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }
                }else{
                  //平年
                  if(pastMonth===1){
                    //29天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+29-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+29-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }else if(pastMonth===0||pastMonth===2||pastMonth===4||pastMonth===6||pastMonth===7||pastMonth===9){
                    //31天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+31-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+31-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }else{
                    //30天
                    if(nowDay>=3){
                      //可能显示星期
                      if(nowDate+30-pastDate<nowDay){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else if(nowDay===0){
                      //可能显示星期
                      if(nowDate+30-pastDate<7){
                        return this.showWeek(pastDay);
                      }else{
                        return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                      }
                    }else{
                      //不显示星期
                      return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                    }
                  }
                }
              }
            }else{
              //更早
              return ('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
            }
          }
        }else{
          //去年或更早
          if(nowYear-pastYear===1){
            //去年
            if(nowMonth===0&&nowdate===1&&pastMonth===11&&pastDate===31){
              //昨天
              return '昨天';
            }else{
              //不是昨天,判断是不是本周
              if(nowMonth===0&&pastMonth===11){
                //可能是本周
                if(nowDay>=3){
                  //可能显示星期
                  if(nowDate+31-pastDate<nowDay){
                    return this.showWeek(pastDay);
                  }else{
                    return pastYear+'年'+('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                  }
                }else if(nowDay===0){
                  //可能显示星期
                  if(nowDate+31-pastDate<7){
                    return this.showWeek(pastDay);
                  }else{
                    return pastYear+'年'+('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                  }
                }else{
                  //不显示星期
                  return pastYear+'年'+('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
                }
              }else{
                //不可能是本周
                return pastYear+'年'+('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
              }
            }
          }else{
            //前年或更早
            return pastYear+'年'+('0'+(pastMonth+1)).substr(-2)+'月'+('0'+pastDate).substr(-2)+'日';
          }
        }
      },
      showWeek(num){
        if(num===1){
          return '星期一';
        }else if(num===2){
          return '星期二';
        }else if(num===3){
          return '星期三';
        }else if(num===4){
          return '星期四';
        }else if(num===5){
          return '星期五';
        }
      }

    } //methods下括号
  }

</script>

<style scoped>
  .reply {
    background-color: #ffe144;
    padding: 20rpx;
  }

  .topic {
    display: flex;
    background-color: white;
    padding: 20rpx;
    border-radius: 7px;
  }

  .avatar img {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
  }

  .content {
    width: 520rpx;
    line-height: 18px;
    margin-left: 10rpx;
  }

  .content .content-in {
    width: 500rpx;
  }

  .content-in .user {
    display: flex;
    align-items: flex-end;
  }

  .content-in .user .userName {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }

  .content-in .user .identity {
    text-align: center;
  }

  .content-in .user .identity .idName {
    font-size: 12px;
    color: #f3cc01;
    border: thin solid; 
    box-sizing: border-box;
    border-radius: 3px;
    padding: 0 5rpx;
  }

  .content-in .words {
    word-break: break-all;
    color: #000;
    margin: 20rpx 0;
    font-size: 15px;
    line-height: 24px;
  }

  .content-in .images img {
    width: 115rpx;
    height: 115rpx;
    margin-right: 10rpx;
    margin-bottom: 5rpx;
  }

  .words .article {
    color: #f3cc01;
    line-height: 50rpx;
  }

  .content-in .time {
    color: #ccc;
    font-size: 13px;
  }

  .interact {
    width: 125rpx;
  }

  .interact .interact-in {
    height: 160rpx;
    width: 80rpx;
    display: inline-block;
    font-size: 14px;
  }

  .interact-in .praise {
    height: 40rpx;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
  }

  .praise .praise-num {
    color: rgb(137, 145, 150);
    text-align: right;
    width: 45rpx;
    line-height: 40rpx;
  }

  .praise .praise-str {
    text-align: left;
    vertical-align: middle;
    margin-left: 6rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .interact-in .step {
    height: 40rpx;
    display: flex;
    flex-direction: row;
    margin-bottom: 20rpx;
  }

  .step .step-num {
    color: rgb(137, 145, 150);
    text-align: right;
    width: 45rpx;
    line-height: 40rpx;
  }

  .step .step-str {
    text-align: left;
    vertical-align: middle;
    margin-left: 6rpx;
    width: 40rpx;
    height: 40rpx;
  }

  .interact-in .say {
    height: 40rpx;
    margin-left: 26rpx;
    font-size: 13px;
    color: rgb(137, 145, 150);
  }

  .say1 {
    width: 40rpx;
    height: 40rpx;
  }

</style>
