<template>
  <div>
    <div class="loupan">
      <div class="build-left">{{build}}</div>
      <div class="topic-center">{{topic}}</div>
      <div class="browse-right">{{num}}浏览</div>
    </div>
    <line />
<<<<<<< HEAD
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" class="listsite">
      <aite v-for="site in dataList" :item="site" :key="site" @child="childSay"></aite>
    </scroll-view>
    <div class="item">
      <div class="send_arr">
        <input id="enter" :value="words" focus="focus" maxlength="200"/>
=======
    <div class="box1" v-for="site in sites" :key="site">
      <a href="/pages/qwd/main" hover-class="none">
        <div class="head"></div>
      </a>
      <div class="box2">
        <div class="box3">
          <p class="name">{{name}}{{identity1}}{{identity2}}</p>
          <div class="words">{{words}}</div>
        </div>
        <div class="box4">
            <p class="time">{{time}}</p>
            <div class="box5">
            <div class="praise-num">{{num1}}</div>
            <div class="praise" @click.stop="ClickPraise">赞</div>
            <div class="step-num" decode="ensp">&ensp;{{num2}}</div>
            <div class="step" @click.stop="ClickStep">踩</div>
            </div>
            <p class="reply" @click="ClickReply">回复</p>
          </div>
      </div>
    </div>
    <div>
      <aite></aite>
    </div>
    <div class="item">
      <div class="send_arr">
        <input class="enter" maxlength="200"/>
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
        <div class="send" @click="ClickSend">发送</div>
      </div>
      <line />
      <ul>
        <li>
<<<<<<< HEAD
          <button plain="true" class="picture" @click="uploadPhoto">图片</button>
=======
          <button plain="true" class="picture">图片</button>
        </li>
        <li>
          <button plain="true" class="video">视频</button>
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
        </li>
        <li>
          <button plain="true" class="collect" @click="ClickCollect">收藏</button>
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
        scrollHeight:"",
        topic: "坟景",
        build: "未来城",
<<<<<<< HEAD
        num:"1000",
        words:"",
        focus:false,
        dataList: 
        [
          {
            user: "姓名",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名1",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名2",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名3",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "姓名4",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
          {
            user: "5",
            userType: "(销售)",
            time:"昨天",
            content: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
          },
        ],
        productInfo: "图片"
=======
        name: "姓名",
        identity1: "(销售)",
        identity2: "(题主)",
        time:"昨天",
        words: "看不到十大客户读书森林防火双离合分那就回复您开户奥拉夫",
        num1: 0,
        num2: 0,
        
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
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
    
    onReady (){
      console.log("ScrollViewHeight")
      this.ScrollViewHeight()
    },
    onLoad: function(options) {
          console.log(options.money);
        },
    /*created (){
          this.focusState()
      },*/
    methods: {
      ClickSend: async function(){
          this.temp = {};
          temp.user = this.user;
          temp.userType = this.userType;
          temp.time = this.time;
          temp.content = this.content;
          let res = await this.$post('',this.temp);
          JSON.parse(temp);
      },
      /*  ref="focusState"
      focusState:function(){
          this.$refs.focusState.focus()
      },*/
      childSay: function (enter) {
          this.words = enter
      },
    ScrollViewHeight() {
     let that = this
     let windowHeight = wx.getSystemInfoSync().windowHeight;
     let scrollHeight = windowHeight -130;
     that.scrollHeight = scrollHeight;
     //读取机型全屏高度，减去固定高度获得scroll高度
    },
    upLoadImage () {
        let _this = this;
        wx.chooseImage({
          count:6,//最多可以选择的图片总数 
          sizeType: ['compressed'],// 可以指定是原图还是压缩图，默认二者都有 
          sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有 
          success: function(res){
            let paths=res.tempFilePaths
            wx.showToast({  
             title: '正在上传...',  
             icon: 'loading',  
             mask: true,  
             duration: 1000  
            })  
            for(let i=0;i<paths.length;i++){
              _this.images.push(paths[i])
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
      removeImage(index){
        this.images.splice(index,1)
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
    width:100%;
    text-align: center;
    font-size:22px;
  }

  .build-left {
    position: fixed;
    text-align: left;
    color: #888888;
    font-size: 17px;
<<<<<<< HEAD
    left: 20rpx;
  }

  .browse-right{
    position: fixed;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 15px;
    right: 20rpx;
=======
    right: 20rpx;
  }

  .head {
    border: 1px solid #d0d0d0;
    margin-left: 20rpx;
    margin-top: 20rpx;
    height: 80rpx;
    width: 80rpx;
  }

  .box1 {
    display: flex;
    flex-direction: row;
    margin-top:20rpx;
  }

  .box2 {
    display: flex;
    flex-direction: column;
    margin-left: 10rpx;
    margin-top: 16rpx;
    font-size: 16px;
  }

  .box3 {
    display: flex;
    flex-direction: column;
  }

  .name{
    color:#888888;
  }

  .time{
    color:#888888;
  }

  .box4 {
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .box5{
    display: flex;
    flex-direction: row;
    align-items: baseline;
    position: absolute;
    right: 120rpx;
  }

  .reply {
    color: #c5a500;
    position: absolute;
    right: 20rpx;
  }

  .words {
    font-size: 16px;
    margin-top: 20rpx;
    width: 600rpx;
    white-space: normal;
    /*自动换行*/
  }

  .praise {
    color: #c5a500;
  }

  .praise-num{
    color:#888888;
  }

  .step {
    color: #c5a500;
  }

  .step-num{
    color:#888888;
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
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
<<<<<<< HEAD
    flex: auto;
  }

  #enter {
    width: 600rpx;
    height:70rpx;
=======
 
    flex: auto;
  }

  .enter {
    width: 600rpx;
    height:100rpx;
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
  }

  .send_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 710rpx;
<<<<<<< HEAD
    height: 70rpx;
=======
    height: 100rpx;
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .send{
    color: #c5a500;
    position: relative;
<<<<<<< HEAD
    top:14rpx;
=======
    top:24rpx;
>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
    left:20rpx;
  }

  .picture{
    width:120rpx;
    height:70rpx;
    color:#c5a500;
    font-size:20px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    line-height:50rpx;
    border:none;
  }

<<<<<<< HEAD
=======
  .video{
    width:120rpx;
    height:70rpx;
    color:#c5a500;
    font-size:20px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    line-height:50rpx;
    border:none;
  }

>>>>>>> d190400a3f878bbba14797c395d85f57fc2ba1ea
  .collect{
    width:120rpx;
    height:70rpx;
    color:#c5a500;
    font-size:20px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    line-height:50rpx;
    border:none;
  }

  .share{
    width:120rpx;
    height:70rpx;
    color:#c5a500;
    font-size:20px;
    text-align:center;
    padding:0px;
    vertical-align:middle ;
    line-height:50rpx;
    border:none;
  }

</style>
