<template>
<div class="suggest">
  <div class="kefu">
    <span class="xaoji">{{name1}}</span>
    <div>
    <img :src='imgSrc1' class="code" @click="preview(0)">
    </div>
  </div>
  <div class="xaoji">
    <span class="xaoji">{{name2}}</span>
    <div>
    <img :src='imgSrc2' class="code" @click="preview(1)">
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
        images:[],
        name1:'',
        name2:'',
        imgSrc1:'',
        imgSrc2:''
      }
    },
    onLoad (){
      let that = this
      that.$get('api/queryRealEstateList').then(function(res){
        let arr1 = res.data[0].real_estate_area.split('https')
        let arr2 = res.data[0].real_estate_name.split('https')
        that.name1 = arr1[0]
        that.name2 = arr2[0]
        that.imgSrc1 = 'https' + arr1[1] + '?date=' + JSON.stringify(new Date())
        that.imgSrc2 = 'https' + arr2[1] + '?date=' + JSON.stringify(new Date())
        that.images = []
        that.images.push(that.imgSrc1)
        that.images.push(that.imgSrc2)
      })
    },
    methods: {
      preview(index) {
        let that = this
        wx.previewImage({
          current: that.images[index], 
          urls: that.images
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
