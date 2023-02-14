<template>
  <div class="hom-pro-list warp" :class="'terminal'+terminal">
      <div class="title" :class="'text-align-'+componentContent.textAlign">
        <h2 class="h2">{{componentContent.title}}</h2>
        <a class="btn-all a-link" @click="jumpGroupWorks(shopId!==0 && {shopId:shopId,id:componentContent.shopGroupWorkId})">查看全部<i class="iconfont icon-arrow-right"></i></a>
        <div class="tabList" v-show="componentContent.labelShow">
          <ul>
            <li v-for="(item,index) in componentContent.labelList" :key="index">
              <a class="a-link" @click="jumpLink(item.linkObj)">{{item.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="banner"  v-show="componentContent.bannerShow">
        <a class="a-link" @click="jumpLink(componentContent.bannerLinkObj)">
          <img class="img" v-show="componentContent.bannerUrl" :src="componentContent.bannerUrl">
        </a>
      </div>
      <div class="picList">
        <ul class="clearfix" :class="'imgTextNum' +  componentContent.productNum">
          <li v-for="(item,index) in productData" :key="index">
            <a class="item a-link" @click="jumpProductDetail(item)">
              <div class="itemImgBox">
                <div class="imgBox">
                  <el-image
                    :src="item.image"
                    fit="contain"></el-image>
                  <!--<img :src="item.image" v-show="item.image" :alt="item.productName">-->
                </div>
              </div>
              <div class="text">
                <h4 class="h4">{{item.productName}}</h4>
                <div class="priceBox">
                  <span>拼团价：¥{{item.price}}</span>
                  <span class="discount" v-if="item.originalPrice">原价：¥{{item.originalPrice}}</span>
                </div>
<!--                <p class="p">够柔够弹针织棉，亲肤可裸睡</p>-->
              </div>
            </a>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
  import {funMixin} from '../../../config/mixin'
  import api from '../../../config/api'
  import Cookies from 'js-cookie'
  import store from '../../../config/mixin/store'
  export default {
    name: 'imageTextList',
    mixins: [funMixin],
    data () {
      return {
        productData: []
      }
    },
    props: {
      terminal: {
        type: Number,
        default: 4
      },
      typeId: {
        type: Number,
        default: 1
      },
      shopId: {
        type: Number,
        default: 0
      },
      componentContent: {
        type: Object
      }
    },
    watch: {
      'componentContent': {
        handler(newVal, oldVal) {
          this.getData()
        },
        deep: true
      }
    },
    created() {
      this.getData()
    },
    methods: {
      getData() {
        const _ = this
        if(this.typeId === 1){
          // 平台端
          this.sendReq({
            url: `${api.getProducts}?page=1&pageSize=99&type=1&ids=${_.componentContent.productData.productIdList}`,
            method: 'GET'
          }, (proRes) => {
            store.commit("loadNumReduce");
            _.productData  = proRes.data.list
          })
        } else if(this.typeId === 3) {
          // 商家端
          if(_.componentContent.shopGroupWorkId){
            const params = {
              method: 'GET',
              url: `${api.getGroupWorks}?shopId=${_.shopId}&ids=${_.componentContent.shopGroupWorkId}`,
            }
            this.sendReq(params, (res) => {
              store.commit("loadNumReduce");
              if(res.data && res.data.length > 0){
                _.productData = res.data[0].products
              }
            })
          } else {
            _.productData = []
            store.commit("loadNumReduce");
          }
        }
      },
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
        font-size: 30px;
        color: #333;
        line-height: 1em;
        font-weight: bold;
      }
      .btn-all{
        position: absolute;
        right: 0;
        top: 10px;
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
            padding: 0 12px 0 20px;
            position: relative;
            a:hover{
              color: $mainColor;
            }
            &:after{
              content: '/';
              position: absolute;
              left: 0;
              top: 0;
            }
            &:first-child{
              padding-left: 0;
              &:after{
                display: none;
              }
            }
          }
        }
      }
      &.text-align-left{
        .tabList{
          position: absolute;
          right: 100px;
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
    .picList{
      ul{
        margin: -15px 0 0 -15px;
        display: flex;
        flex-wrap: wrap;
        li{
          flex: 0 0 50%;
          padding: 15px 0 0 15px;
          width: 0;
          .item{
            cursor: pointer;
            &:hover{
              box-shadow: 3px 4px 20px 0px rgba(186, 186, 186, 0.5);
            }
            .itemImgBox {
              height: auto;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .imgBox {
                padding-bottom: 100%;
                background-color: #cacaca;
                position: relative;
                .el-image {
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
            .text{
              padding:16px 20px;
              text-align: center;
              .h4{
                font-size: 16px;
                font-weight: bold;
                line-height: 24px;
                overflow: hidden;
                color: #333333;
              }
              .p{
                color: #999;
                font-size: 16px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding-top: 18px;
                position: relative;
                margin-top: 8px;
                &:after{
                  position: absolute;
                  top: 0;
                  left: 50%;
                  margin-left: -80px;
                  width: 160px;
                  height: 2px;
                  background: #F0F0F0;
                  content: '';
                }
              }
              .priceBox {
                padding-top: 12px;
                span {
                  font-size: 18px;
                  font-weight: bold;
                  color: $mainColor;
                  display: block;
                }
                span.discount {
                  margin-top: 10px;
                  padding-top: 20px;
                  font-size: 16px;
                  color: #666666;
                  text-decoration: line-through;
                  position: relative;
                  &:after{
                    content: '';
                    width: 160px;
                    height: 1px;
                    background: #F0F0F0;
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -80px;
                  }
                }
              }
            }
          }
        }
      }
      .imgTextNum2 {
        li {
          flex: 0 0 50%;
        }
      }
      .imgTextNum3 {
        li {
          flex: 0 0 33.33%;
        }
      }
      .imgTextNum4 {
        li {
          flex: 0 0 25%;
        }
      }
      .imgTextNum5 {
        li {
          flex: 0 0 20%;
        }
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
