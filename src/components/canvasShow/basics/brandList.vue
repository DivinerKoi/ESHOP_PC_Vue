<template>
  <div class="brand-list warp" :class="'terminal' + terminal">
    <h2 class="hom-title" :style="{textAlign:componentContent.textAlign}">{{componentContent.title}}</h2>
    <div class="content-warp">
      <ul class="clearfix">
        <li v-for="(item, index) in componentContent.imgList" :key="index">
          <a class="item a-link" @click="jumpLink(item.linkObj)">
            <div class="imgBox">
              <img :src="item.imgData" v-show="item.imgData" :alt="item.title">
            </div>
            <h4 class="h4">{{item.title}}</h4>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {funMixin} from '../config/mixin'
  export default {
    name: 'brandList',
    mixins: [funMixin],
    props: {
      terminal: {
        type: Number,
        default: 4
      },
      componentContent: {
        type: Object
      }
    }
  }
</script>
<style lang="scss" scoped>
  .brand-list{
    color: #fff;
    padding: 20px 0;
    .hom-title{
      font-size: 22px;
      color: #333;
      line-height: 1em;
      margin-bottom: 23px;
      font-weight: bold;
    }
    .content-warp{
      display: flex;
    }
    .first{
      width: 24%;
      padding-top: 10px;
      .item{
        background-color: #7A8594;
        height: 336px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .h3{
          font-size: 30px;
          line-height: 46px;
          margin-bottom: 10px;
        }
      }
    }
    ul{
      width: 100%;
      li{
        width: 25%;
        float: left;
        padding: 10px 0 0 10px;
        .item{
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .imgBox {
            padding-bottom: 80%;
            background-color: #cacaca;
            position: relative;
          }
          .h4{
            font-size: 18px;
            color: #333333;
            text-align: center;
            height: 40px;
            line-height: 40px;
          }
          .p{
            font-size: 12px;
            margin: 7px 0 12px;
          }
          img {
            max-width: 100%;
            height: 100%;
            max-height: 100%;
            position: absolute;
            margin: auto;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
  .terminal1,.terminal2,.terminal3{
    &.brand-list{
      .content-warp{
        display: block;
      }
      .first{
        width: 100%;
      }
      ul{
        width: auto;
        margin-left: -10px;
        li{
          width: 50%;
          .item {
            padding-left: 0;
          }
        }
      }
    }
  }
</style>
