<template>
  <div class="message">
    <div class="mes" @click="toTopicPage()" @longpress="removeMsg()">
      <div class="box">
        <img :src="head_url" alt="" class="headImage">
        <span class="nick">{{user_name}}</span>
        给你
        <span class="type">&nbsp;{{msg.interact_type}}</span>
      </div>
      <div class="content" v-if="msg.interact_content">&nbsp;{{content}}</div>
      <div class="images">
        <img v-for="(url,index) in images" :key="index" :src="url">
      </div>
      <div class="time">{{time}}</div>
    </div>
    <line />
  </div>
</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line
    },
    props: ['msg'],
    data() {
      return {
        head_url: '',
        user_name: '',
        images: [],
        content: '',
        articleSrc: '',
        time:'',
        userList:''
      }
    },
    onLoad() {
      let that = this
      let allContent, articleArr
      if (that.msg.interact_content) {
        if (that.msg.interact_content.indexOf('images=') === -1) {
          //没有图片
          allContent = that.msg.interact_content
        } else {
          //有图片
          let arr = that.msg.interact_content.split('images=')
          allContent = arr[0]
          that.images = JSON.parse(arr[1])
        }
        if (allContent.indexOf('https://') === -1) {
          //没有连接
          that.content = allContent
        } else {
          //有连接
          let articleArr = allContent.split('https://')
          that.content = articleArr[0]
          that.articleSrc = 'https://' + articleArr[1]
        }
      }
      wx.getStorage({
        key:'userList',
        success(res){
          for (let i in res.data) {
            if (i === that.msg.user_id) {
              that.head_url = res.data[i].head_url
              that.user_name = res.data[i].user_name
              break
            }
          }
          if (that.head_url === '') {
            that.head_url = that.msg.user.head_url
            that.user_name = that.msg.user.user_name
          }
        }
      })
      that.time = that.changeTime(that.msg.update_time)
    },
    methods: {
      toTopicPage() {
        let obj = {
          real_estate_name:this.msg.real_estate_name,
          tag_id:this.msg.tag_id
        }
        let obj1 = {
          interact_type:this.msg.interact_type,
          id:this.msg.id,
          to_interact_id:this.msg.to_interact_id
        }
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)+'&msg='+JSON.stringify(obj1)
        })
      },

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
      },

      removeMsg(){
        console.log('this.msg',this.msg)
        let that = this
        let temp = {}
        temp.id = that.msg.id
        temp.msg_status = 'DELETE'
        let updateTemp = {
          'db': 'WpInteractModel',
          'model': 'edit',
          'item': JSON.stringify(temp),
          'items': JSON.stringify(temp)
        }
        wx.showModal({
          title: '提示',
          content: '确定要删除消息吗?',
          success(res){
            if(res.confirm){
              wx.showLoading({
                title: '删除中',
                mask: true
              })
              that.$get('api/update', updateTemp).then(function (res) {
                console.log('发送成功res.data',res.data)
                console.log('that.msg.id',that.msg.id)
                that.$emit('removeMsg',that.msg.id)
                // for(let i=0; i<that.msgList.length; i++){
                //   if(that.msgList[i].id === that.msg.id){
                //     that.msgList.splice(i,1)
                //     break
                //   }
                // }
                // wx.hideLoading()
              })
            }
          }
        })
      }

    }//methods
  }

</script>

<style scoped>
  .mes {
    display: flex;
    flex-direction: column;
    margin: 20rpx 0 20rpx 20rpx;
  }

  .headImage {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    vertical-align: middle;
    /*图居中*/
  }

  .box {
    color: rgb(137, 145, 150);
    font-size: 15px;
  }
  .step{
    color: rgb(137, 145, 150);
    font-size: 15px;
    margin-left: 40rpx;
  }

  .nick {
    margin-left: 20rpx;
  }

  .content {
    margin: 20rpx 40rpx;
    width: 600rpx;
    color: #000;
    font-size: 17px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .images {
    width: 600rpx;
    margin-left: 50rpx;
  }

  .images img {
    width: 50rpx;
    height: 50rpx;
  }

  .time {
    margin-top: 5rpx;
    margin-left: 60rpx;
    color: #ccc;
    font-size: 13px;
  }

</style>
