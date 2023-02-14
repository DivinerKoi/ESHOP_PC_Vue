<template>
  <div class="hom-pro-list warp" :class="'terminal'+terminal">
    <div class="title">
      <h2 class="h2" :style="{textAlign:componentContent.textAlign}">{{componentContent.title}}</h2>
    </div>
    <ul class="clearfix" :class="{imgTextNum4: componentContent.imgTextData.length === 4, imgTextNum5: componentContent.imgTextData.length === 5, imgTextStyle: componentContent.imgTextData.length >= 6 || componentContent.imgTextData.length === 3}">
      <li v-for="(item,index) in componentContent.imgTextData" :key="index">
        <a class="item" @click="jumpLink(item.linkObj)">
          <div class="itemImgBox" v-show="item.isShow">
            <div class="imgBox">
              <img ref="getHeight" :src="item.imgData" v-show="item.imgData" :alt="item.title">
            </div>
          </div>
          <div class="text">
            <h4 class="h4">{{item.title}}</h4>
            <p class="p">{{item.describe}}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {funMixin} from '../config/mixin'
  export default {
    name: 'imageTextList',
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
  .hom-pro-list{
    padding: 20px 0;
    .title{
      margin-bottom: 23px;
      position: relative;
      .h2{
        font-size: 22px;
        color: #333;
        line-height: 1em;
        font-weight: bold;
      }
    }
    ul{
      margin: -15px 0 0 -15px;
      display: flex;
      flex-wrap: wrap;
      li{
        flex: 0 0 50%;
        padding: 15px 0 0 15px;
        .item{
          .itemImgBox {
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .imgBox {
              padding-bottom: 80%;
              background-color: #cacaca;
              position: relative;
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
          .text{
            padding:16px 20px;
            text-align: center;
            .h4{
              line-height: 25px;
              overflow: hidden;
              color: #333333;
            }
            .p{
              color: #666666;
              padding: 5px 0 10px;
            }
          }
        }
      }
    }
    .imgTextNum4 {
      li {
        flex: 0 0 50%;
      }
    }
    .imgTextNum5 {
      li {
        flex: 0 0 33.33%;
      }
      li:nth-child(1) {
        flex: 0 0 50%;
      }
      li:nth-child(2) {
        flex: 0 0 50%;
      }
    }
    .imgTextStyle {
      li {
        flex: 0 0 33.33%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .hom-pro-list ul li{
      flex: 0 0 50%;
    }
  }
  .terminal1,.terminal2,.terminal3{
    &.hom-pro-list ul li{
      flex: 0 0 50%;
    }
  }
</style>
