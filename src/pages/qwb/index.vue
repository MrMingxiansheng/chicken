<template>
  <div>
    <div class="loupan">
      <div class="build-left">{{build}}</div>
      <div class="topic-center">{{topic}}</div>
      <div class="browse-right">{{num}}浏览</div>
    </div>
    <line />
    <scroll-view scroll-y="true" :style="{height:scrollHeight+'px'}" class="listsite">
      <aite v-for="site in dataList" :item="site" :key="site" @child="childSay"></aite>
    </scroll-view>
    <div class="item">
      <div class="send_arr">
        <input id="enter" :value="words" focus="focus" maxlength="200"/>
        <div class="send" @click="ClickSend">发送</div>
      </div>
      <line />
      <ul>
        <li>
          <button plain="true" class="picture" @click="uploadPhoto">图片</button>
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
      // console.log("ScrollViewHeight")
      this.ScrollViewHeight()
    },
    
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
        let windowHeight = wx.getSystemInfoSync().windowHeight;
        let scrollHeight = windowHeight -130;
        this.scrollHeight = scrollHeight;
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
      }
      
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
    left: 20rpx;
  }

  .browse-right{
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

  #enter {
    width: 600rpx;
    height:70rpx;
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

  .send{
    color: #c5a500;
    position: relative;
    top:14rpx;
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
