<template>
  <div class="videoBox warp" :class="'terminal' + terminal">
    <div class="videoLeftBox">
      <h3>{{componentContent.title}}</h3>
      <div v-html="componentContent.mainBody"></div>
    </div>
    <div class="videoRightBox">
      <video class="myVideo" id="myVideo" :src="componentContent.videoUrl" enable-danmu danmu-btn controls></video>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'videoBox',
  props: {
    terminal: {
      type: Number,
      default: 4
    },
    componentContent: {
      type: Object
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
 .videoBox {
   padding: 20px 0;
   display: flex;
   justify-content: flex-start;
   align-items: center;
   .videoLeftBox {
     width: 50%;
     padding-right: 10%;
     h3 {
       font-size: 28px;
       color: #333333;
       margin-bottom: 30px;
     }
     p {
       color: #333333;
       font-size: 14px;
       line-height: 30px;
     }
   }
   .videoRightBox {
     width: 50%;
     video {
       width: 100%;
     }
   }
   .clear {
     clear: both;
   }
 }
 .terminal1,.terminal2,.terminal3{
   &.videoBox{
     display: block;
     .videoLeftBox{
       width: 100%;
       text-align: center;
       margin-bottom: 20px;
     }
     .videoRightBox {
       width: 100%;
     }
   }
 }
</style>
