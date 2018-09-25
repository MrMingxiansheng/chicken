<template>
  <div class="all">
    <div class="loupan">
      <div class="topic-center">发布小话题</div>
      <div class="build-right">{{build}}</div>
    </div>
    <line />
    <input id="title" :value="words" type="text" placeholder="写个小话题（6个字内）" maxlength="6" />
    <p>热门小话题：</p>
    <div class="item">
      <itema v-for="(site,index) in sites" :key="site" v-if="index<9" :name="site.name" @child="ss"></itema>
    </div>
    <textarea cols="5" class="title1" placeholder="写点小话题描述（200字内）" maxlength="200"></textarea>
    <p class="addPic">添加图片</p>
    <div class="box">
      <div v-for="(img,index) in images" :key="img" v-if="index<6" class="box-img">
        <img :src="img" class="big">
        <img src="/static/images/remove.png" class="min" @click="removeImage(index)">
      </div>
      <div id="plus" v-if="images.length<6&&images.length>0">
        <img  src="/static/images/jiahao.png" @click="upLoadImage" />
        <i></i>
      </div>
      <div id="plus1" v-if="images.length===0">
        <img  src="/static/images/jiahao.png" @click="upLoadImage" />
        <i></i>
      </div>
    </div>

    <div class="item1">
      <span>小提示：小话题,描述文字图片至少选一项,可以匿名发布</span>
      <line />
      <ul>
        <li>
          <a href="#">匿名发</a>
        </li>
        <li>
          <a href="#">发布</a>
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
        images:[],
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
        ]
      }
    },
    computed: {},
    methods: {
      ss: function (title) {
        this.words = title
      },
      upLoadImage () {
        let _this = this
        wx.chooseImage({
          count:6,
          success(res){
            let paths=res.tempFilePaths
            for(let i=0;i<paths.length;i++){
              _this.images.push(paths[i])
            }
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
  .selectedPic {
    width: 50rpx;
    height: 50rpx;
    display: inline-block;
  }
  .loupan {
    display: flex;
    flex-direction: row;
    align-items: center;
    /*纵向居中*/
    height: 80rpx;
  }

  .topic-center {
    position: absolute;
    width: 100%;
    text-align: center;
    font-size:22px;
  }

  .build-right {
    position: absolute;
    width: 100%;
    text-align: right;
    color: #888888;
    font-size: 17px;
    right: 20rpx;
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

  .addPic {
    text-align: center;
    padding-top: 20rpx;
    font-size: 15px;
    overflow: hidden;
  }

  .box {
    width: 640rpx;
    margin: 0 auto;
  }

  .box div {
    display: inline-block;
    width: 200rpx;
    height: 200rpx;
    text-align: center;
    margin: 10rpx;
  }
  .box .box-img {
    position: relative;
  }
  .box .box-img .min{
    display: inline-block;
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
  
  #plus img,#plus1 img{
    width: 100rpx;
    height: 100rpx;
    vertical-align: middle;
  }

  i {
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
  }

  #plus1 {
    margin: 0 auto;
  }

  .item1 {
    width: 100%;
    /* position: fixed;
    bottom: 0; */
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
    margin-bottom: 20rpx;
    flex: auto;
  }

  .item1 span {
    font-size: 15px;
  }

</style>
