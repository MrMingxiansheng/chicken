<template>
<div>
<!-- 需要使用 button 来授权登录 -->
<button v-if="canIUse" open-type="getUserInfo" :bindgetuserinfo="bindGetUserInfo">授权登录</button>
<div v-else>请升级微信版本</div>
</div>
</template>

<script>
  export default {
    components: {
     
    },

    data() {
      return {
     canIUse: wx.canIUse('button.open-type.getUserInfo')

      }
    },
     onLoad: function() {
    // 查看是否授权
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    })
  },
    methods: {
         bindGetUserInfo: function(e) {
    console.log(e.detail.userInfo)
  }
    },  
    /*directives: {
    focus: {
      //根据focusState的状态改变是否聚焦focus
      update: function (el, value) {    //第二个参数传进来的是个json
        if (value) {
          el.focus()
        }
      }
    }
  }*/
}
</script>

<style scoped>



</style>
