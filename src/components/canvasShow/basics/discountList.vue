<template>
  <div class="hom-pro-list warp" :class="'terminal'+terminal">
    <div class="title" :class="'text-align-'+componentContent.textAlign">
      <h2 class="h2">{{componentContent.title}}</h2>
      <a class="btn-all a-link" @click="jumpDiscount(shopId!==0 && {shopId:shopId,id:componentContent.shopDiscountId})">查看全部<i class="iconfont icon-arrow-right"></i></a>
      <div class="tabList" v-show="componentContent.labelShow">
        <ul>
          <li v-for="(item,index) in componentContent.labelList" :key="index">
            <a @click="jumpLink(item.linkObj)">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="componentContent.shopDiscountId || componentContent.productData.productIdList !==0">
      <div class="discountList" v-if="terminal === 4" :class="this.typeId === 1 && 'pc'">
        <div class="listLeft" v-if="discountInfo.products && discountInfo.products.length > 0">
          <img src="../static/images/shop/xianshi@2x.png" alt="">
          <div class="bgBox">
            <div class="endTime">{{discountInfo.discountName}}</div>
            <div class="line"></div>
            <div class="endTimeText">距离{{count[0]}}还剩</div>
            <div class="timeBox">
              <span>{{count[1]}}</span><i>:</i><span>{{count[2]}}</span><i>:</i><span>{{count[3]}}</span>
            </div>
            <button @click="jumpDiscount(shopId!==0 && {shopId:shopId,id:componentContent.shopDiscountId})">查看全部></button>
          </div>
        </div>
        <div class="listRight">
          <div class="listItem" v-for='it in discountInfo.products' :key='it.productId' @click="jumpProductDetail(it)">
            <div class="imgBox">
              <img :src="it.image" alt="">
            </div>
            <div class="itemInfo">
              <h3>{{it.productName}}</h3>
              <div class="discountPrice">
                <span>折扣价￥</span><b>{{it.price}}</b>
              </div>
              <div class="originalPrice">原价：¥{{it.originalPrice}}</div>
              <button>立即抢购</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mobileList">
        <div class="topList mItem" @click="jumpProductDetail(firstProduct)">
          <div class="topImgBg">
            <img :src="firstProduct.image" alt="">
            <div class="leftText">
              <i class="iconfont">&#xe652;</i>
              <span>限时折扣</span>
            </div>
            <div class="rightDateBox"><span v-if="count && count.length> 0">距{{count[0]}}还有 {{`${count[1]}:${count[2]}:${count[3]}`}}</span></div>
          </div>
          <div class="itemInfo">
            <div class="itemTit">
              <h3>{{firstProduct.productName}}</h3>
              <span v-if="firstProduct.limitNumber && firstProduct.limitNumber>0">剩余{{firstProduct.stockNumber}}件</span>
            </div>
            <!-- <p>透明观感，磨砂质感</p> -->
            <div class="Price">
              <span><b>￥</b>{{firstProduct.price}}</span>
              <span>¥ {{firstProduct.originalPrice}}</span>
            </div>
          </div>
        </div>
        <div class="listBox">
          <div class="mItem" v-for='it in appProducts' :key='it.productId' @click="jumpProductDetail(it)">
            <div class="topImgBg">
              <img :src="it.image" alt="">
              <div class="leftText">
                <!--              <i class="iconfont">&#xe652;</i>-->
                <span>限时折扣</span>
              </div>
              <div class="rightDateBox"><span v-if="count && count.length> 0">距{{count[0]}} {{`${count[1]}:${count[2]}:${count[3]}`}}</span></div>
            </div>
            <div class="itemInfo">
              <div class="itemTit">
                <h3>{{firstProduct.productName}}</h3>
              </div>
              <!-- <p>透明观感，磨砂质感</p> -->
              <div class="surplus" v-if="it.limitNumber && it.limitNumber>0">剩余{{it.stockNumber}}件</div>
              <div class="Price">
                <span><b>￥</b>{{it.price}}</span>
                <span>¥ {{it.originalPrice}}</span>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {funMixin} from '../config/mixin'
import api from '../config/api'
import store from '../config/mixin/store'
export default {
  name: 'discountList',
  mixins: [funMixin],
  data () {
    return {
      value: 100,
      discountInfo: {},
      firstProduct: {},
      appProducts: [],
      count: [],
      timer: null
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
          url: `${api.getProducts}?page=1&pageSize=99&type=3&ids=${_.componentContent.productData.productIdList}`,
          method: 'GET'
        }, (proRes) => {
          store.commit("loadNumReduce");
          _.discountInfo.products  = proRes.data.list
          _.firstProduct = _.discountInfo.products[0]
          _.appProducts = _.discountInfo.products.slice(1,3)
          _.$forceUpdate()
        })
      } else if(this.typeId === 3) {
        // 商家端
        if(_.componentContent.shopDiscountId){
          const params = {
            method: 'GET',
            url: `${api.getDiscounts}?shopId=${_.shopId}&ids=${_.componentContent.shopDiscountId}`,
          }
          this.sendReq(params, (res) => {
            store.commit("loadNumReduce");
            if(res.data && res.data.length > 0){
              _.discountInfo = res.data[0]
              _.discountInfo.products.splice(4)
              _.firstProduct = _.discountInfo.products[0]
              _.appProducts = _.discountInfo.products.slice(1,3)
              // 只有进行中和未开始活动, 用倒计时
              if(_.discountInfo.state !==2) {
                this.timer = setInterval(()=>{
                  _.getTime(_.discountInfo)
                }, 1000)
              }
            }
          })
        } else {
          _.discountInfo = {}
          _.firstProduct = {}
          _.appProducts = []
          store.commit("loadNumReduce");
        }
      }
    },
    getTime(info) {
      const date = new Date().getTime()
      const startTime = new Date(info.startTime.replace(/-/g,'/')).getTime()
      const endTime = new Date(info.endTime.replace(/-/g,'/')).getTime()
      if(startTime > date) {
        this.countDown(startTime-date,true) // 未开始
      } else {
        this.countDown(endTime-date) // 进行中
      }

    },

    countDown(time, isStart) {
      const fn = (v) =>  v < 10 ? `0${v}` : v
      const t = parseInt(time / 1000)
      const text = isStart ? '开始' : '结束'
      const hour = parseInt(t / 3600)
      const min = parseInt((t % 3600) / 60)
      const s = t % 60
      this.count = [text, fn(hour), fn(min), fn(s)]
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
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
      font-size: 16px;
      color: #343434;
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
  .discountList {
    display: flex;
    .listLeft {
      width: 256px;
      height: 412px;
      text-align: center;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .bgBox {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .endTime {
          font-size: 30px;
          color: #615548;
          margin-bottom: 22px;
          margin-top: 80px;
        }
        .line {
          width: 24px;
          height: 2px;
          background: #524B3D;
          margin: 0 auto 22px auto;
        }
        .endTimeText {
          font-size: 20px;
          color: #615548;
          margin-bottom: 22px;
        }
        .timeBox {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 55px;
          span {
            display: block;
            width: 45px;
            height: 45px;
            background: #54493C;
            color: #FFFFFF;
            font-size: 22px;
            line-height: 45px;
          }
          i {
            font-size: 14px;
            color: #54493C;
            font-style: normal;
            font-weight: bold;
            padding: 0 2px;
          }
        }
        button {
          width: 126px;
          height: 34px;
          background: #615548;
          border: 1px solid #54493C;
          border-radius: 17px;
          color: #FFFFFF;
          font-size: 16px;
        }
      }
    }
    .listRight {
      flex: 1;
      margin-left: 13px;
      display: flex;
      flex-wrap: wrap;
      .listItem {
        width: 431px;
        margin-right: 20px;
        display: flex;
        background: #FAFAFA;
        margin-bottom: 20px;
        .imgBox {
          width: 196px;
          height: 196px;
          flex: 0 0 auto;
          margin-right: 15px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .itemInfo {
          h3 {
            font-size: 18px;
            color: #333434;
            line-height: 28px;
            margin: 10px 0 3px 0;
          }
          button {
            width: 130px;
            text-align: center;
            height: 39px;
            background: #FF7800;
            line-height: 39px;
            color: #FFFFFF;
            font-size: 18px;
            margin-top: 20px;
          }
        }
      }
      .listItem:nth-child(2n) {
        margin-right: 0;
      }
    }
    &.pc{
      .listLeft{
        display: none;
      }
      .listRight{
        .listItem{
          width: 608px;
        }
      }
    }
  }
  .discountPrice {
    span {
      font-size: 18px;
      color: $mainColor;
    }
    b {
      font-size: 26px;
      color: $mainColor;
    }
  }
  .originalPrice {
    margin-top: 8px;
    font-size: 16px;
    color: #666666;
    text-decoration: line-through;
  }
}
.mobileList {
  .mItem {
    width: 335px;
    height: 520px;
    background: #FFFFFF;
    box-shadow: 0 10px 15px 0 rgba(51, 51, 51, 0.1);
    border-radius: 10px;
    margin-bottom: 35px;
    overflow: hidden;
    float: left;
    margin-right: 20px;
    .topImgBg {
      width: 100%;
      height: 312px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .leftText {
        width: 126px;
        height: 62px;
        background: #EF7722;
        border-radius: 6px 18px 0 0;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99;
        i {
          font-size: 32px;
          color: #FFFFFF;
        }
        span {
          font-size: 28px;
          font-style: italic;
          color: #FFFFFF;
          font-weight: bold;
          font-family: 'YouSheBiaoTiHei';
        }
      }
      .rightDateBox {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 54px;
        width: 100%;
        background: #F38D45;
        color: #FFFFFF;
        text-align: right;
        padding-right: 20px;
        line-height: 54px;
        font-size: 24px;
      }
    }
    .itemInfo {
      padding: 25px 22px;
      .itemTit {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3 {
          font-size: 28px;
          color: #333333;
        }
        span {
          font-size: 24px;
          color: #AAAAAA;
        }
      }
      .surplus {
        font-size: 22px;
        color: #999999;
        margin-bottom: 5px;
      }
      p {
        margin-bottom: 20px;
        font-size: 24px;
        color: #999999;
      }
      .Price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-child {
          color: $mainColor;
          font-size: 36px;
          margin-right: 20px;
          b {
            font-weight: normal;
            font-size: 24px;
          }
        }
        span:last-child {
          font-size: 24px;
          font-weight: 400;
          text-decoration: line-through;
          color: #999999;
        }
      }
    }
  }
  .mItem:nth-child(2n) {
    margin-right: 0;
  }
  .topList {
    width: 100%;
    height: 484px;
    overflow: hidden;
    .topImgBg {
      .leftText {
        width: 192px;
        height: 72px;
      }
    }
    .itemInfo {
      .Price {
        justify-content: left;
      }
    }
    .rightDateBox {
      font-size: 24px;
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
