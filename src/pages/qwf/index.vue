<template>
 <div>
   </div>
</template>

<script>

export default {
    data() {
        return {
         
        }
    },
 
    methods: {
  suo: function () {
         wx.navigateTo({
           url: '/pages/qwc/main',
       })
       var that = this;
       if (that.searchValue.length > 0) {
        wx.request({
        url: '',
        data: {
          value: value.detail.value
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'POST',
        dataType: json,
        responseType: text,
        success: function (res) {
          if (res.code) {
            var data = that.lists;
            for (let i = 0; i < res.length; i++) {
                data.push(res[i]);
            }
            
             that.wxSearchData= value.detail.value,
              that.lists= data
            
          }
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    }

 }
 


}

</script>

<style scoped>


</style>