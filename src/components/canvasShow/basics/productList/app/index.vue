<template>
  <div class="hom-pro-list">
      <div v-if="componentContent.arrangeType == '横向滑动'">
        <div class="title">
          <label>{{componentContent.title}}</label>
        </div>
        <swiper class="weekStore-swiper" :options="swiperOption">
          <swiper-slide class="store-box" v-for="(item,index) in componentContent.imgTextData.slice(0, 20)" :key="index" @click="jumpProductDetail(item)">
            <div class="store-backImg">
              <img class="img" :src="item.image">
              <div class="pad-top-20">
                <div class="store-namebox flex-items-plus">
                  <label class="store-name fs22">{{item.shopName}}</label>
                </div>
              </div>
            </div>
            <div class="storeDetail-box">
              <div class="pad-top-30">
                <div class="shop-title fs30 mar-left-20">{{item.productName}}</div>
              </div>
              <div class="storePrice-box flex-start flex-row">
                <div class="flex-items-plus flex-row price-box">
                  <div class="font-color-FF7800">
                    <label class="fs24">¥ </label>
                    <label class="fs30">{{item.price}}</label>
                  </div>
                  <div class="fs24 font-color-999 discountsPrice mar-left-20">
                    <label>¥ </label>
                    <label class="fs24 ">{{item.originalPrice}}</label>
                  </div>
                </div>
                <div class="inStoreshop" @click.stop="jumpStore(item)">进店逛逛</div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <div class="swiper-pagination"></div>
      </div>
    <div v-if="componentContent.arrangeType == '一行两个'" class="goodRecommend mar-left-10">
      <div class="title">
        <label>{{componentContent.title}}</label>
      </div>
      <div class="goos-box" >
        <div class="goodRecommend-box mar-left-20 mar-top-30 flex-display flex-column" v-for="(item,index) in componentContent.imgTextData.slice(0, 10)" :key="index" @click="jumpProductDetail(item)">
          <div class="goodsImg-box">
            <img v-show="item.image" class="img" :src="item.image">
          </div>
          <div class="goodRecommendDetail-box">
            <label class="productName">{{item.productName}}</label>
            <label class="buyCount">{{item.buyCount}}人付款</label>
            <div class="priceBox">
              <div class="price">
                <label class="unit">¥ </label>
                <label class="val"> {{item.price}}</label>
              </div>
              <div class="originalPrice">
                <label class="unit">¥ </label>
                <label class="val"> {{item.originalPrice}}</label>
              </div>
            </div>
            <div class="shopName" @click.stop="jumpStore(item)">
              <label>{{item.shopName}}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import {funMixin} from '../../../config/mixin'
  export default {
    name: 'imageTextList',
    components: {
      Swiper,
      SwiperSlide
    },
    directives: {
      swiper: directive
    },
    mixins: [funMixin],
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
    data () {
      return {
        swiperOption: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          autoplay: false, // 可选选项，自动滑动
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    mounted () {
      console.log(this.componentContent)
    }
  }
</script>

<style lang="scss" scoped>
  .hom-pro-list{
    padding: 30px 0 42px;
    .title{
      margin-left: 30px;
      display: flex;
      align-items:center;
      label{
        font-size: 36px;
        font-weight: bold;
        margin-left: 20px;
      }
    }
    .weekStore-swiper {
      padding: 30px;

      .store-box {
        width: 620px;
        height: 570px;
        // border:1px solid #ccc;
        box-shadow: 0px 0px 15px 0px rgba(52, 52, 52, 0.15);
        border-radius: 10px;
        overflow: hidden;
        .store-backImg {
          width: 620px;
          height: 414px;
          background-repeat: no-repeat;
          position: relative;
          background-color: #f5f5f5;
          .img {
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

        .store-namebox {
          display: inline-block;
          padding:0 50px 0 10px;
          height: 40px;
          line-height: 40px;
          background-color: #FFFFFF;
          border-radius: 0 20px 20px 0;
          position: relative;
          z-index: 2;
          .store-name {
            padding: 0px;
          }

          .store-logo {
            width: 38px;
            height: 38px;
          }
        }

        .storeDetail-box {
          background-color: #FFFFFF;

          .discountsPrice {
            text-decoration: line-through;
          }

          .price-box {
            padding: 20px 24px;
          }

          .inStoreshop {
            position: absolute;
            right: 50px;
            color: #FFFFFF;
            background-color: #FF7700;
            border-radius: 24px;
            font-size: 24px;
            padding: 12px 24px;
          }

          .shop-title {
            overflow: hidden;
            text-overflow: ellipsis;
            -ms-text-overflow: ellipsis;
            display: flex;
            line-clamp: 1;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }

    }
  }

  .swiper-pagination{
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 30px 0;
    bottom: 0;
     >>> .swiper-pagination-bullet{
      width: 10px;
      height: 10px;
      background: #333333;
      opacity: 0.3;
      border-radius: 5px;
      margin: 0 5px;
    }
     >>> .swiper-pagination-bullet-active{
      width: 20px;
      height: 10px;
      opacity: 1;
    }
  }
  /****/
  .goodRecommend {
    .goos-box {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
    }

    .goodRecommend-titleImg {
      width: 44px;
      height: 44px;
    }

    .goodsImg-box {
      width: 336px;
      height: 336px;
      background-color: #f5f5f5;
      border-radius: 10px 10px 0 0;
      .img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .storeArrow-icon {
      width: 20px;
      height: 20px;
    }

    .recommendGoods-title {
      width: 295px;
      display: block;
      word-break: keep-all;
      /* 不换行 */
      white-space: nowrap;
      /* 不换行 */
      overflow: hidden;
      /* 内容超出宽度时隐藏超出部分的内容 */
    }

    .goodRecommend-box {
      width: 336px;

      .goodRecommendDetail-box {
        background-color: #FFFFFF;
        box-shadow: 0px 0px 15px 0px rgba(52, 52, 52, 0.15);
        border-radius: 0 0 10px 10px;
        padding: 20px;
        label{
          font-weight: normal;
        }
        .productName{
          font-size: 28px;
          color: #333;
          display: block;
          margin-bottom: 18px;
        }
        .buyCount{
          color: #999;
          font-size: 24px;
          margin-bottom: 10px;
          display: block;
        }
        .priceBox{
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 10px;
          .price{
            color: #FF7800;
            .unit{
              font-size: 24px;
            }
            .val{
              font-size: 36px;
            }
          }
          .originalPrice{
            font-size: 24px;
            color: #999;
            text-decoration: line-through;
          }
        }
        .shopName{
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          color: #999;
          label{
            color: #999;
          }
        }
      }

      .recommendGoodsDes {
        width: 295px;
      }
    }
  }

  .pad-top-20{padding-top: 20px;}
  .pad-top-30{padding-top: 30px;}
  .mar-left-10{margin-left: 10px;}
  .mar-left-20{margin-left: 20px;}
  .mar-top-30{margin-top: 30px;}
  .fs22{font-size: 22px;}
  .fs24{font-size: 24px;}
  .fs28{font-size: 28px;}
  .fs30{font-size: 30px;}
  .font-color-999{color: #999999;}
  .font-color-FF7800{color: #FF7800;}
  .flex-items-plus{display: flex;justify-content: center;align-items:center;}
  .flex-start{display: flex;justify-content: flex-start;}
  .flex-row{flex-direction: row}
  .align-end{display: flex;align-items:flex-end;}
</style>
