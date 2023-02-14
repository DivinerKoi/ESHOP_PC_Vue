<template>
  <div class="custom warp" :class="'terminal' + terminal">
    <div class="noData" v-if="isNoData">
      <div style="height: 300px;"></div>
    </div>
    <div class="rowLayout" v-else-if="componentContent.layoutType ==='L1' || componentContent.layoutType ==='L2' || componentContent.layoutType ==='L3' || componentContent.layoutType ==='L4'">
      <div class="customLayout" :style="{'padding':'0 ' + componentContent.pageSpacing + 'px','marginLeft':(-componentContent.imgClearance) +'px'}">
        <ul class="clearfix" :class="'layout'+componentContent.layoutType">
          <li v-for="(item,index) of componentContent.imgData" :key="index" :style="{'width':getItemValue(item.width) + '%','height':getItemValue(item.height) + '%','left':getItemValue(item.left) + '%','top':getItemValue(item.top) + '%','paddingLeft':componentContent.imgClearance +'px'}">
            <a class="a-link" @click="jumpLink(item.linkObj)"><img class="img" :src="item.src" v-if="item.src"></a>
          </li>
        </ul>
      </div>
    </div>
    <div class="boxLayout" v-else :style="{'padding':'0 ' + componentContent.pageSpacing + 'px','paddingBottom':componentContent.maxH !== 0?getItemValue(componentContent.maxH) + '%': '100%'}">
      <div class="boxLayoutInner">
        <div class="boxWarp">
          <div class="customLayout" :style="{'marginLeft':(-componentContent.imgClearance) +'px','top':(-componentContent.imgClearance) +'px'}">
            <ul class="clearfix" :class="'layout'+componentContent.layoutType">
              <li v-for="(item,index) of componentContent.imgData" :key="index" :style="{'width':getItemValue(item.width) + '%','height':getItemValue(item.height) + '%','left':getItemValue(item.left) + '%','top':getItemValue(item.top) + '%','padding':componentContent.imgClearance +'px 0 0 ' + componentContent.imgClearance +'px'}">
                <a class="a-link" @click="jumpLink(item.linkObj)"><img class="img" :src="item.src" v-if="item.src"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {funMixin} from '../config/mixin'
  export default {
    name: 'customComponent',
    mixins: [funMixin],
    data () {
      return {
      }
    },
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
        const density = parseInt(this.componentContent.density)
        if (val === 0 || density === 0) {
          return 0
        }
        return (val / density * 10000 / 100.00)// 小数点后两位百分比
      }
    },
    computed: {
      isNoData () {
        let flag = true
        let imgData = this.componentContent.imgData
        if (imgData.length !== 0) {
          for (let i = 0; i < imgData.length; i++) {
            if (imgData[i].src) {
              flag = false
            }
          }
        }
        return flag
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom{
    .boxLayout{
      position: relative;
      .boxLayoutInner{
        padding-bottom: 100%;
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
      }
      .boxWarp{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        overflow: hidden;
      }
    }
    .customLayout{
      position: relative;
      ul{
        display: flex;
        flex-wrap: wrap;
        position: relative;
      }
      li{
        .img{
          width: 100%;
          display: block;
        }
      }
      .layoutL1 li{
        flex: 0 0 100%;
      }
      .layoutL2 li{
        flex: 0 0 50%;
      }
      .layoutL3 li{
        flex: 0 0 33.3%;
      }
      .layoutL4 li{
        flex: 0 0 25%;
      }
      .layoutT2B2{
        padding-bottom: 100%;
        li{
          width: 50%;
          height: 50%;
          position: absolute;
          .img{
            width: 100%;
            height: 100%;
          }
          &:nth-child(1){
            left: 0;
            top: 0;
          }
          &:nth-child(2){
            right: 0;
            top: 0;
          }
          &:nth-child(3){
            left: 0;
            bottom: 0;
          }
          &:nth-child(4){
            right: 0;
            bottom: 0;
          }
        }
      }
      .layoutL1R2{
        padding-bottom: 100%;
        li{
          width: 50%;
          height: 50%;
          position: absolute;
          .img{
            width: 100%;
            height: 100%;
          }
          &:nth-child(1){
            height: 100%;
            left: 0;
            top: 0;
          }
          &:nth-child(2){
            right: 0;
            top: 0;
          }
          &:nth-child(3){
            right: 0;
            bottom: 0;
          }
        }
      }
      .layoutT1B2{
        padding-bottom: 100%;
        li{
          width: 50%;
          height: 50%;
          position: absolute;
          .img{
            width: 100%;
            height: 100%;
          }
          &:nth-child(1){
            width: 100%;
            left: 0;
            top: 0;
          }
          &:nth-child(2){
            left: 0;
            bottom: 0;
          }
          &:nth-child(3){
            right: 0;
            bottom: 0;
          }
        }
      }
      .layoutL1T1B2{
        padding-bottom: 50%;
        li{
          position: absolute;
          .img{
            width: 100%;
            height: 100%;
          }
          &:nth-child(1){
            width: 50%;
            height: 100%;
            left: 0;
            top: 0;
          }
          &:nth-child(2){
            right: 0;
            top: 0;
            width: 50%;
            height: 50%;
          }
          &:nth-child(3){
            left: 50%;
            bottom: 0;
            width: 25%;
            height: 50%;
          }
          &:nth-child(4){
            right: 0;
            bottom: 0;
            width: 25%;
            height: 50%;
          }
        }
      }
      .layoutaverage{
        padding-bottom: 100%;
        li{
          position: absolute;
          .img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
