<template>

<div class="tab">
    <div class="hd">
        <span :class="{cur:lanmu=='mes'}" @click="change('mes')">消息</span>
        <span :class="{cur:lanmu=='col'}" @click="change('col')">收藏</span>
        <span :class="{cur:lanmu=='se'}" @click="change('se')">看过</span>
        <span :class="{cur:lanmu=='sug'}" @click="change('sug')">反馈</span>
    </div>
    <div class="bd">
        <div class="mes" v-if="lanmu=='mes'"><message></message></div>
        <div class="col" v-if="lanmu=='col'"><collect></collect></div>
        <div class="se" v-if="lanmu=='se'"><see></see></div>
        <div class="sug" v-if="lanmu=='sug'"><suggest></suggest></div>
    </div>
</div>
</template>

<script>
 import line from "@/components/line"
  import message from "@/components/message"
  import collect from "@/components/collect"
  import see from "@/components/see"
  import suggest from "@/components/suggest"
export default {
  components: {
      line,
      message,
      collect,
      see,
      suggest,
    },
  data () {
    return {
    lanmu:"mes"
    }
  },
	methods:{
		change:function(str){
            this.lanmu = str;
        }

	}

}

</script>

<style scoped>
 
        .tab .hd{overflow: auto;}
        .tab .hd span{
            float: left;
            width: 90px;
            justify-content: space-around;
            height: 40px;
            line-height: 40px;
            background-color:#ccc;
            text-align: center;
        }
        .tab .hd span.cur{
            background-color: orange;
        }
        .tab .bd div{
            padding:20px;
        }

</style>