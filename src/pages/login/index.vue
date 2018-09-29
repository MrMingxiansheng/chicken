<template>
  <div class="login">
    <a href="/pages/qwe/main">
      <div class="LOGO">小鸡窝LOGO</div>
    </a>
    <span>我是</span>
    <button class="buy">买房的</button>
    <button class="sell">卖房的</button>
    <picker @change="bindPickerChange" :value="index" :range="array" mode="selector">
      <view class="picker">
        {{array[index]}}
      </view>
    </picker>
    <div class="tips">
      <p>提示：销售务必选卖房的，</p>
      <p>后期开发销售的更多神器福利</p>
      <p>一旦选错，不能享受愉快卖房福利</p>
    </div>
    <div class="test">
      <text class="xaoji">小鸡评房公众号</text>
      <div class="code"></div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        index: 0,
        array: ['曼云芳为曼云芳', '未来悦', '未来城', '宜和园'],
        objectArray: [{
            id: 0,
            name: '曼云芳'
          },
          {
            id: 1,
            name: '未来悦'
          },
          {
            id: 2,
            name: '未来城'
          },
          {
            id: 3,
            name: '宜和园'
          }
        ]
      }
    },
    methods: {
      bindPickerChange(e) {
        console.log(e)
        this.index = e.mp.detail.value; //普通选择器
      },
    },

  };

</script>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
  }

  .LOGO {
    margin-top: 80rpx;
    text-align: center;
  }

  span {
    margin-top: 80rpx;
    text-align: center;
  }

  .buy {
    background-color: #ffe144;
    border: none;
    width: 360rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    margin-top: 20rpx;
  }

  .sell {
    background-color: #ffe144;
    border: none;
    width: 360rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    margin-top: 80rpx;
  }

  .picker {
    font-size: 18px;
    background-color: #DDDDDD;
    text-align: center;
    line-height: 60rpx;
    height: 60rpx;
    width: 360rpx;
    margin: auto;
    margin-top: 20rpx;
  }

  .tips {
    color: #888888;
    margin: auto;
    margin-top: 30rpx;
    font-size: 15px;
  }

  .test {
    text-align: center;
    margin-top: 80rpx;
  }

  .code {
    border: 1px solid #d0d0d0;
    height: 200rpx;
    width: 200rpx;
    margin: auto;
  }

</style>
