<template>
  <div class="collect">
    <picker @change="bindPickerChange" :value="index" :range="array" mode="selector">
        <view class="picker">
          {{array[index]}}
        </view>
      </picker>
  </div>
</template>

<script>
  import line from "@/components/line"
  import itemr from "@/components/itemr"
  export default {
    components: {
      line,
      itemr
    },

    data() {
      return {
       index: 0,
        array: ['曼云芳', '未来悦', '未来城', '宜和园'],
        objectArray:[
          {
            id:0,
            name:'曼云芳'
          },
          {
            id:1,
            name:'未来悦'
          },
          {
            id:2,
            name:'未来城'
          },
          {
            id:3,
            name:'宜和园'
          }
        ]
      }
    },
    methods: {
       bindPickerChange(e) {
        console.log(e)
        this.setData = e.mp.detail.value;
      },
    }
  };

</script>

<style scoped>
 

</style>
