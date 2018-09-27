<template>
  <div>
    <div class="page-search">
      <div class="search_arr">
        <icon class="searchcion" size="20" type="search"></icon>
        <input type="search" placeholder="输入楼盘名称或小话题搜索" :value="searchValue" focus="true"/>
      </div>
      <div class="sousuo" @click="suo">搜索</div> 
    </div>
    <div id="result">搜索结果</div>
    <line />
    <div class="Hot">
      <hot v-for="site in sites" :key="site"></hot>
    </div>
  </div>
</template>

<script>
  import line from "@/components/line"
  import hot from "@/components/hot"
  export default {
    components: {
      line,
      hot,
      },
    data() {
      return {
        sites: [{}],
        searchValue:"",
      };
    },

    methods: {
     /* suo: function () {
       var that = this;
       if (that.searchValue.length > 0) {
        wx.request({
        url: '',
        data: {
         
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        dataType: json,
        responseType: text,
        success: function (res) {
          if (res.code) {
            var data = that.sites;
            for (let i = 0; i < res.length; i++) {
                data.push(res[i]);
            }
            
             that.sites= data
            
          }
        },
        fail: function (res) { 
          wx.showToast({
          title: '网络异常！',
          duration: 2000
        });
        },
        complete: function (res) { },
      })
    }
    }*/

    }
  };

</script>

<style scoped>
  .page-search {
    display: flex;
    flex-direction: row;
    /*整体*/
    margin-top: 20rpx;
  }

  .search_arr {
    display: flex;
    flex-direction: row;
    border: 1px solid #d0d0d0;
    width: 600rpx;
    height: 60rpx;
    margin-bottom: 20rpx;
    margin-left: 20rpx;
  }

  .searchcion {
    margin: 10rpx 10rpx 10rpx 10rpx;
    position: absolute;
    left: 20rpx;
    z-index: 2;
    width: 40rpx;
    height: 40rpx;
    text-align: center;
    /*搜索图标*/
  }

  .search_arr input {
    margin-left: 60rpx;
    height: 60rpx;
    border-radius: 5px;
    width: 440rpx;
    font-size: 17px;
    /*input框内*/
  }

  
.sousuo {
  font-size:17px;
  margin-left: 15rpx;
  width: 100rpx;
  height:60rpx;
  line-height: 150%;
  text-align: center;
  border: 1px solid #d0d0d0;
  border-radius: 10rpx;
}

  #result {
    margin-left: 40rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }

</style>
