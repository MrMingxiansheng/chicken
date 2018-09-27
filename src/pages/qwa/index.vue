<template>
  <div class="all">
    <div class="loupan">
      <div class="build-left">{{build}}</div>
      <div class="topic-center">发布小话题</div>
    </div>
    <line />
    <div :style="{height:scrollHeight+'px'}" class="scroll">
    <input id="title" :value="words" type="text" placeholder="写个小话题（6个字内）" maxlength="6" />
    <p>热门小话题：</p>
    <div class="item">
      <itema v-for="(site,index) in sites" :key="site" v-if="index<9" :nameSet="site.name" @child="childSay"></itema>
    </div>
    <textarea cols="5" class="title1" placeholder="写点小话题描述（200字内）" maxlength="200"></textarea>
    <div class="box">
      <div v-for="(img,index) in images" :key="img" v-if="index<6" class="box-img">
        <img :src="img" class="big">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div id="plus" v-if="images.length<6&&images.length>0">
        <img  src="/static/images/jiahao.png" @click="upLoadImage" />
      </div>
      <div id="plus1" v-if="images.length===0">
        <img  src="/static/images/jiahao.png" @click="upLoadImage" />
      </div>
    </div>
    </div>
    <div class="item1">
      <span>小提示：小话题必选,可以匿名发布</span>
      <line />
      <ul>
        <li>
          <button class="AnonymousPublish" plain="true" @click="ClickAnonymous">匿名发</button>
        </li>
        <li>
          <button class="publish" plain="true" @click="ClickPublish">发布</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import itema from "@/components/itema"
  import line from "@/components/line"
  export default {
    components: {
      itema,
      line
    },
    data() {
      return {
        scrollHeight:"",
        build: "未来城",
        words: "",
        sites: [{
            name: '高铁杭州杭州'
          },
          {
            name: '价格'
          },
          {
            name: '距离杭州杭州'
          },
          {
            name: '价格'
          },
          {
            name: '距离'
          },
          {
            name: '价格杭州杭州'
          },
          {
            name: '高铁'
          },
          {
            name: '价格'
          },
          {
            name: '距离'
          },
          {
            name: '价格'
          },
          {
            name: '距离'
          },
          {
            name: '价格'
          }
        ],
        images:[],
      }
    },
    onReady (){
      console.log("ScrollViewHeight")
      this.ScrollViewHeight()
    },
    computed: {},
    methods: {
      childSay: function (title) {
        this.words = title
      },
      Clickpublish: async function(){
          this.temp = {};
          temp.topic = this.topic;
          temp.owner = this.owner;
          temp.userType = this.userType;
          temp.user = this.user;
          temp.content = this.content;
          let res = await this.$post('',this.temp);
          JSON.parse(temp);
        },
        ScrollViewHeight() {
     let that = this
     let windowHeight = wx.getSystemInfoSync().windowHeight;
     let scrollHeight = windowHeight -100;
     that.scrollHeight = scrollHeight;
     //读取机型全屏高度，减去固定高度获得scroll高度
    },
        upLoadImage () {
        let _this = this;
        wx.chooseImage({
          count:6,//最多可以选择的图片总数 
          sizeType: ['original','compressed'],// 可以指定是原图还是压缩图，默认二者都有 
          sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有 
          success: function(res){
            let paths=res.tempFilePaths
            wx.showToast({  
             title: '正在上传...',  
             icon: 'loading',  
             mask: true,  
             duration: 500  
            })  
            for(let i=0;i<paths.length;i++){
              if(_this.images.length<6){
              _this.images.push(paths[i])
            }else {
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
    width: 100%;
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

  .scroll{
    overflow: auto;
  }

  #title {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top:40rpx;
    height: 100rpx;
    width:700rpx;
    padding-left:20rpx;
  }

  p {
    margin-top: 20rpx;
    margin-left: 20rpx;
  }

  .item {
    list-style: none;
    margin-left: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .title1 {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top: 40rpx;
    height: 200rpx;
    width: 700rpx;
    padding-left:20rpx;
  }

  .box {
    width: 660rpx;
    margin: 0 auto;
  }
  .box img {
    vertical-align: middle;
  }
  .box div {
    display: inline-block;
    width: 200rpx;
    height: 200rpx;
    margin: 10rpx;
  }
  .box .box-img {
    position: relative;
  }
  .box .box-img .min{
    width: 50rpx;
    height: 50rpx;
    position: absolute;
    top: 0;
    right: 0;
  }
  .box .box-img .big {
    width: 200rpx;
    height: 200rpx;
  }
  
  #plus,#plus1 {
    padding: 50rpx;
    box-sizing: border-box;
  }
  #plus img,#plus1 img{
    width: 100rpx;
    height: 100rpx;
  }
  #plus1 {
    margin-left: 230rpx;
  }
  
  .item1 {
    width: 100%;
    position: fixed;
    bottom: 0;
    /*置底*/
  }

  .item1 ul {
    display: flex;
    flex-direction: row;
  }

  .item1 li {
    color: #c5a500;
    width: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    flex: auto;
  }

  .item1 span {
    font-size: 15px;
  }

  .publish{
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

  .AnonymousPublish{
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
