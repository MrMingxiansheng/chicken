<template>
  <div class="topic" v-if="item.tag_name">
    <div class="box">
          <div class="title" @click="ClickTag(item)">{{item.tag_name}}</div>
      <div class="box1">
          <div class="bor" @click="ClickTag(item)">
            <div class="border">
              <img :src="item.interact.user.head_url" class="avatarUrl" />
            </div>
            <span decode="ensp">&ensp;{{item.interact.user.user_name}}&ensp;发布</span>
          </div>
        <div class="talk">
          <span class="views_num" @click="ClickTag(item)">{{item.length}}讨论</span>
          <div class="step" @click="clickStep">
          <span class="step-num">{{item.cnum}}</span>
          <span class="step-str">踩</span>
        </div>
        </div>
      </div>
      <div class="box2" v-if="item.interact.interact_content">
            <div class="words" @click="ClickTag(item)">{{content}}</div>
        <div class="images">
          <img v-for="(url,index) in images" :key="index" :src="url" @click="preview(index)" class="img">
        </div>
      </div>
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
    props: ['item'],
    data() {
      return {
        content:'',
        images:''
      };
    },
    onLoad (){
      console.log('uu',this.item)
      if(this.item.interact.interact_content.indexOf('images=')===-1){
        this.content = this.item.interact.interact_content
      }else{
        let arr = this.item.interact.interact_content.split('images=')
        this.content = arr[0]
        console.log('arr',arr)
        this.images = JSON.parse(arr[1])
      }
    },
    methods: {
      ClickTag: function (item) {
        let obj = {
          tag_name:item.tag_name,
          views_num:item.views_num,
          user_id:item.user_id,
          real_estate_id:item.real_estate_id,
          id:item.id
        }
        console.log('obj',obj)
        wx.navigateTo({
          url:'/pages/qwb/main?tag='+JSON.stringify(obj)
        })
      },
      preview: function (index) {
        //图片预览
        wx.previewImage({
          current: this.images[index], // 当前显示图片的http链接
          urls: this.images // 需要预览的图片http链接列表
        })
      },
      clickStep() {
        console.log('点了一下踩')
        let that = this
        wx.getStorage({
          key: 'key',
          success: function (res) {
            let myUserId = res.data.id
            let to_interact_id = that.item.interact.id
            let tag_id = that.item.interact.tag_id
            let interact = {}
            let todo = ''
            that.$get("api/queryUserDetail", {
              user_id: myUserId
            }).then(function (res) {
              let interactList = res.data.interactList
              let arr = interactList.filter(function (ele) {
                return ele.to_interact_id === to_interact_id
              })
              let arr1 = arr.filter(function (e) {
                return e.interact_type === '点踩'
              })
              if (arr.length > 0) {
                if (arr1.length > 0) {
                  todo = '取消踩'
                } else {
                  todo = '点踩'
                }
              } else {
                todo = '点踩'
              }
              if (todo === '点踩') {
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.interact_type = '点踩'
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.item.cnum = parseInt(that.item.cnum) + 1
                })
              } else if (todo === '取消踩') {
                interact.id = arr1[0].id
                interact.interact_type = '取消踩'
                interact.tag_id = tag_id
                interact.user_id = myUserId
                interact.to_interact_id = to_interact_id
                interact.interact_status = '0'
                let updateInteract = {
                  'db': 'WpInteractModel',
                  'model': 'edit',
                  'item': JSON.stringify(interact),
                  'items': JSON.stringify(interact)
                }
                that.$get('api/update', updateInteract).then(function () {
                  that.item.cnum = parseInt(that.item.cnum) - 1
                })
              }
            })
          }
        })
      },
    }
  };

</script>

<style scoped>
  .bor {
    display: flex;
    flex-direction: row;
    font-size: 15px;
    color: rgb(137, 145, 150);
  }

  .title {
    text-align: center;
    font-size: 20px;
  }

  .avatarUrl {
    height: 40rpx;
    width: 40rpx;
    vertical-align:middle;
    margin-bottom:4rpx;
  }

  .talk {
    display: flex;
    flex-direction: row;
    font-size: 13px;
  }

  .views_num{
    color: rgb(137, 145, 150);
  }

  .step-num{
    color: rgb(137, 145, 150);
  }

  .step{
    height: 50rpx;
    width: 100rpx;
    border: 1px solid rgb(219, 219, 219);
    box-sizing: border-box;
    line-height: 50rpx;
    text-align: center;
    margin-right:10rpx;
  }

  .views_num{
    line-height: 50rpx;
    text-align: center;
    margin-right:10rpx;
  }

  .users {
    display: flex;
    flex-direction: row;
    font-size: 17px;
    align-items: center;
  }

 .img {
    width: 60rpx;
    height: 60rpx;
    margin-right: 10rpx;
    margin-bottom: 10rpx;
    vertical-align:middle;
  }

  .box2 {
    font-size: 17px;
    margin-left: 75rpx;
    margin-bottom: 10rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    margin-left: 20rpx;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin-top: 5rpx;
    flex: auto;
    width: 100%;
  }

  .user {
    color: rgb(137, 145, 150);
    text-overflow: ellipsis;
    overflow: hidden;
    width: 200rpx;
    display: block;
    white-space: nowrap;
    /*过长省略*/
  }

  .words {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 600rpx;
    display: block;
    white-space: nowrap;
  }

</style>
