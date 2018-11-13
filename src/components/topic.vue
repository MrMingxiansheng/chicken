<template>
  <div class="topic" v-if="item.tag_name" @click="ClickTag(item)" :id="'tag'+item.id">
    <author :item="item" :real_estate_name="real_estate_name"
     :user="user" @delMyInteract="delMyInteract" @pushMyInteract="pushMyInteract"
    ></author>
    <sofa v-if="second!==''" :item="second"></sofa>
  </div>
</template>

<script>
  import line from "@/components/line"
  import author from "@/components/author"
  import sofa from "@/components/sofa"
  export default {
    components: {
      line,
      author,
      sofa
    },
    props: ['item', 'real_estate_name', 'user'],
    data() {
      return {
        second: ''
      };
    },
    onLoad() {
      let that = this
      that.secondInteract()
    },
    methods: {
      secondInteract() {
        let that = this
        if (that.item.comment_num > 1) {
          that.$get("api/queryTagDetail", {
            tag_id: that.item.id
          }).then(function (res) {
            that.second = res.data.interactList[1]
          })
        }
      },

      ClickTag (item) {
        let that = this
        let obj = {
          real_estate_name: this.real_estate_name,
          tag_id: item.id
        }
        wx.navigateTo({
          url: '/pages/qwb/main?tag=' + JSON.stringify(obj)
        })
      },

      delMyInteract(id){
        this.$emit('delMyInteract',id)
      },
      pushMyInteract(data){
        this.$emit('pushMyInteract',data)
      }


    } //methods
  };

</script>

<style scoped>
  .topic{
    margin-bottom: 50rpx;
  }
</style>
