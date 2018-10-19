<template>
<div class="suggest">
  <div class="kefu">
    <span class="xaoji">小鸡客服:wuao03</span>
    <div>
    <img :src='first_scene' class="code" @click="preview">
    </div>
  </div>
  <div class="xaoji">
    <span class="xaoji">小鸡公众号:xiaojipf</span>
    <div>
    <img :src='second_scene' class="code" @click="preview">
    </div>
  </div>
</div>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        first_scene: '',
        second_scene: '',
        a: '',
        b:[]
      }
    },
    onLoad (){
      let that = this
      that.first_scene = ''
      that.second_scene = ''
      that.a ='that.first_scene,that.second_scene'
      that.b = that.a.split(',')
    },
    methods: {
      preview: function () {
        //图片预览
        wx.previewImage({
          urls: this.b // 需要预览的图片http链接列表 转化成数组
        })
      },
    }
  }

</script>

<style scoped>
  .kefu {
    text-align: center;
    margin-top: 80rpx;
  }

  .xaoji {
    text-align: center;
    margin-top: 80rpx;
  }

  .code {
    height: 200rpx;
    width: 200rpx;
    margin: auto;
  }

</style>
