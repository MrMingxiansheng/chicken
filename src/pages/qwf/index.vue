<template>
 <view class="tool-item" catchtap='onCollectionTap' data-post-id="post.postId">
   <img wx:if="post.collectionStatus" src="/static/images/my"/>
   <img wx:else src="/static/images/my1"/>
    <text>{{post.collectionNum}}</text>
  </view>

</template>

<script>

export default {
    data() {
        return {
         
        }
    },
 
    methods: {
    //收藏文章
collect()
{
  return this.updatePostData('collect');
},
//更新本地的点赞、评论信息、收藏、阅读量
updatePostData(category){
  var itemData = this.getPostItemById(),
   postData = itemData.data,
  allPostData = this.getAllPostData();
  switch(category){
      case 'collect':
        //处理收藏
        if(!postData.collectionStatus){
          //如果当前状态是未收藏
          postData.collectionNum++;
          postData.collectionStatus = true;
        }else{
          //如果当前状态是已收藏
          postData.collectionNum--;
          postData.collectionStatus = false;
        }
        break;
      default:break;
  }
  //更新缓存数据库  
  allPostData[itemData.index] = postData;
  this.execSetStorageSync(allPostData);
  return postData;
},
nCollectionTap:function(event){
        //dbpost对象已在onLoad函数中被保存到了this变量中，无需再次实例化
        var newData = this.dbPost.collect();
        //从新绑定数据，注意，不要将整个newData全部作为setData的参数，应当有选择的更新部分数据
        this.setData(
          {
            'post.collectionSataus':newData.collectionStatus,
            'post.collectionNum':newData.collectionNum
          }
        ) 
        //交互反馈
    wx.showToast({
      title:newData.collectionStatus?"收藏成功":"收藏取消",
      duration:1000,
      icon:"sucess",
      make:true
     })
},

 }
 


}

</script>

<style scoped>


</style>