<template>
  <div class="section">
 <input placeholder="这个只有在按钮点击的时候才聚焦"  @blur="focusState = false"  :focus="focusState" />
 <div class="btn-area">
 <button @click="bindButtonTap">使得输入框获取焦点</button>
 </div>
</div>

</template>

<script>
  import line from "@/components/line"
  export default {
    components: {
      line,
    },

    data() {
      return {
    focusState:false,
      }
    },
    methods: {
         bindButtonTap:function(){
              this.focusState = true 
         },
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
