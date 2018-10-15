<template>
  <div class="collectItem">
    <span>{{tag_name}}</span>
    <span>&nbsp;&nbsp;{{real_estate_name}}</span>
  </div>
</template>

<script>
export default {
  props: ['tag_id'],
  data(){
    return{
      tag_name:'',
      real_estate_name:''
    }
  },
  onLoad(){
    let that = this
    that.$get('api/queryTagDetail',{tag_id:that.tag_id}).then(function(res){
      that.tag_name = res.data.tag.tag_name
      that.$get('api/queryRealEstateDetail',{real_estate_id:res.data.tag.real_estate_id}).then(function(obj){
        that.real_estate_name = obj.data.realEstate.real_estate_name
      })
    })
  }
}
</script>

<style>

</style>
