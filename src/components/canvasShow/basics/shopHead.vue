<template>
  <div class="hom-pro-list warp" :class="'terminal'+terminal">
    <div class="title" :class="'text-align-'+componentContent.textAlign">
<!--      <router-link class="btn-all" :to="{name:'category',params:{classifyData:{id:componentContent.categoryId,categoryName:componentContent.categoryName}}}">查看全部<i class="iconfont icon-arrow-right"></i></router-link>-->
      <div class="tabList" v-show="componentContent.labelShow">
        <ul>
          <li class="active">店铺首页</li>
          <li>所有商品</li>
          <li v-for="(item,index) in componentContent.labelList" :key="index">
            <router-link :to="jumpLink(item.linkObj)">{{item.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="banner"  v-show="componentContent.bannerShow">
      <a @click="jumpLink(componentContent.bannerLinkObj)">
        <img class="img" v-show="componentContent.bannerUrl" :src="componentContent.bannerUrl">
      </a>
    </div>
  </div>
</template>

<script>
import {funMixin} from '../config/mixin'
export default {
  name: 'shopHead',
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
    height: 40px;
    .btn-all{
      position: absolute;
      right: 0;
      top: 0;
      line-height: 22px;
      padding-right: 20px;
      .iconfont{
        content: '';
        position: absolute;
        right: 0;
        top: 0;
      }
    }
    .tabList{
      ul{
        li{
          display: inline-block;
          padding-bottom: 15px;
          position: relative;
          margin-right: 20px;
          a:hover{
            color: $mainColor;
          }
          //&:after{
          //  content: '/';
          //  position: absolute;
          //  left: 0;
          //  top: 0;
          //}
          &:first-child{
            padding-left: 0;
            &:after{
              display: none;
            }
          }
        }
        .active {
          border-bottom: 2px solid $mainColor;
          color: $mainColor;
        }
      }
    }
    &.text-align-left{
      .tabList{
        position: absolute;
        left: 0;
        bottom: 0;
        line-height: 22px;
      }
    }
    &.text-align-center{
      text-align: center;
      .tabList{
        margin-top: 20px;
      }
    }
  }
  .banner{
    margin-bottom: 15px;
    img{
      width: 100%;
    }
  }
}
.block {
  .blockTit {
    padding-top: 20px;
    span {
      margin-right: 16px;
    }
    span:last-child {
      color: $mainColor;
    }
  }
}
</style>
