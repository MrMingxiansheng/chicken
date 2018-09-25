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
    <div class="box">
      <span>添加图片</span>
      <img src="/static/images/jiahao.png" class="imgs" />
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
    height: 40px;
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
    right: 10px;
  }

  #title {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top: 20px;
    height: 50px;
    width: 350px;
    padding-left:10px;
  }

  p {
    margin-top: 10px;
    margin-left: 10px;
  }

  .item {
    list-style: none;
    margin-left: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .title1 {
    border: 1px solid #d0d0d0;
    margin: auto;
    margin-top: 20px;
    height: 100px;
    width: 350px;
    padding-left:10px;
  }

  .box {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }

  .box span {
    text-align: center;
    padding-top: 10px;
    font-size: 15px;
  }

  .imgs {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    /*居中*/
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
    width: 10px;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    flex: auto;
  }

  .item1 span {
    font-size: 15px;
  }

</style>
