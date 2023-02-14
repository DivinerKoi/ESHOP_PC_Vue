<template>
  <ul class="ul image-text-nav" :class="'terminal' + terminal">
    <li class="li" v-for="(item,index) in componentContent.imgTextData" :key="index" :style="{'flex':'0 0 '+ getItemValue() + '%'}">
      <a class="item a-link" @click="jumpLink(item.linkObj)">
        <div class="imgBox">
          <el-image
            :src="item.img"
            fit="cover"></el-image>
        </div>
        <h4 class="h4">{{item.title}}</h4>
      </a>
    </li>
  </ul>
</template>

<script>
  import {funMixin} from '../config/mixin'
  export default {
    name: 'imageTextNav',
    mixins: [funMixin],
    props: {
      terminal: {
        type: Number,
        default: 4
      },
      componentContent: {
        type: Object
      }
    },
    methods: {
      // 计算生成格子百分比
      getItemValue (val) {
        const len = parseInt(this.componentContent.imgTextData.length)
        if (len === 0) {
          return 0
        } else {
          return (1 / len * 10000 / 100.00)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .image-text-nav{
    min-height: 100px;
    width: 690px;
    margin: 0 auto;
    display: flex;
    padding: 20px 0;
    &.terminal{
      width: 1250px;
    }
    .li{
      text-align: center;
      .imgBox{
        .el-image{
          width: 100px;
          height: 100px;
        }
      }
      .h4{
        font-size: 26px;
        color: #333;
        line-height: 33px;
      }
    }
  }
</style>
