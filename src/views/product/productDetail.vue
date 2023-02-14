<template>
  <div>
    <div class="productBox warp">
      <div class="productConcise clearfix">
        <div class="swiper-box" style="height: 560px">
          <!-- swiper1 -->
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="(item) of productDetailData.sliderImageArr" :key="item" :style="{backgroundImage: 'url('+ $api.BASEURL+item +')'}"></swiper-slide>
          </swiper>
          <!-- swiper2 Thumbs -->
          <div class="swiperThumbsLeft">
            <div class="thumbsBox">
              <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                <swiper-slide v-for="(item, index) of productDetailData.sliderImageArr" :key="index" :style="{backgroundImage: 'url('+ $api.BASEURL+item +')'}">
                  <div style="width: 100%; height: 100%;" @click="thumbsClick(index)"></div>
                </swiper-slide>
              </swiper>
              <div class="swiper-button-prev swiper-button-white iconfont" slot="button-prev">&#xe660;</div>
              <div class="swiper-button-next swiper-button-white iconfont" slot="button-next">&#xe695;</div>
            </div>
          </div>
        </div>
        <div class="proDuctInfo">
          <h3 class="productTit">{{productDetailData.storeName}}</h3>
          <p class="introduction">{{productDetailData.storeInfo}}</p>
          <div class="priceDataInfo">
            <div class="promotionInfo">
              <span>价格:</span>
              <span>￥{{ skuInfo.price }}</span>
              <span>￥{{ skuInfo.otPrice }}</span>
            </div>
          </div>
          <div class='sku-box'>
            <ul v-for='(item,index) in specList' :key='index'>
              <li>
                <p class="proDescribeTit">{{item.attrName}}</p>
                <p>
                  <span
                    @click='selectSku(index, sindex)'
                    v-for='(spec,sindex) in item.attrValue'
                    :key='sindex'
                    :class="[{'selected-item': spec.check}]">
                    {{spec.attr }}
                  </span>
                </p>
              </li>

            </ul>
          </div>
          <div class="productNumber">
            <div class="proDescribeTit">数量：</div>
            <div class="proNumberList">
              <el-input-number v-model="productNumber" :min="1" :max="skuInfo.stock" label="库存"></el-input-number>
              <span>库存<b>{{skuInfo.stock}}</b>件</span>
            </div>
          </div>
          <div class="btnBox">
            <div class="buyBox" v-if="skuInfo.stock!==0">
              <span @click="clickAddCart">加入购物车</span>
              <span @click='buyGood'>购买</span>
            </div>
            <div class="noStock" v-if="skuInfo.stock===0">
              <span>已售空</span>
            </div>
            <div class="favoritesBtn" @click="collect">
              <img style="width:18px;height:18px;margin-top:3px;" v-if="favorite === false" src="../../../static/image/sc0.png" alt="">
              <img style="width:18px;height:18px;margin-top:3px;" v-else src="../../../static/image/sc1.png" alt="">
              <span>收藏</span>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="productDetail">
        <div class="detailTabs">
          <span :class="{compActive: currentComp === 'detailData'}" @click="clickSwitchTab(type = 'detailData')">宝贝详情</span>
          <span :class="{compActive: currentComp === 'evaluation'}" @click="clickSwitchTab(type = 'evaluation')">商品评论</span>
        </div>
         <div class="detailBox clearfix">
           <div class="detailInfoBox">
             <div v-show="currentComp==='detailData'">
               <div class="detailBox">
                 <div class="detailCont" v-html="replaceImgSrc($api.BASEURL,productDetailData.description)"></div>
               </div>
             </div>
             <div v-show="currentComp==='evaluation'">
               <evaluation v-if="replyCount > 0" :evaluateParam="productDetailData"></evaluation>
             </div>
           </div>
           <div class="likeProductBox">
             <like-list @reloadDetail="reloadDetail" :similarProducts="similarProducts"></like-list>
           </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import detailData from './detailData'
import likeList from './likeList'
import evaluation from './evaluation'
import 'swiper/dist/css/swiper.css'
import CereHeader from '../../components/canvasShow/cereshop/pc/header'
import api from '../../api'
import { listSearchMixin } from '../../config/mixin'
import {mapMutations} from 'vuex'
import Cookie from 'js-cookie'
export default {
  name: 'productDetail',
  mixins: [listSearchMixin],
  components: {
    CereHeader,
    swiper,
    swiperSlide,
    detailData,
    evaluation,
    likeList
  },
  inject: ['reload'],
  data () {
    return {
      currentComp: 'detailData',
      swiperTop: null,
      swiperThumbs: null,
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 20
      },
      swiperOptionThumbs: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 3,
        loop: true,
        freeMode: true,
        loopedSlides: 20, // looped slides should be the same
        centeredSlides: true,
        watchSlidesVisibility: true
      },

      productDetailData: {},
      specList: [], // 规格列表
      skuList: [], // sku列表
      skuInfo: {}, // sku信息
      specSelected: [], // 选中的规格
      favorite: false,
      activeName: 'Detail',
      similarProducts: [],
      currentProductData: {},
      replyCount: 0,
      productNumber: 1,
      currentPro: JSON.parse(this.$route.query.proData)
    }
  },
  created () {
    this.getProductInfo()
    this.getLikeProduct()
  },
  mounted () {
    this.$nextTick(() => {
      this.swiperTop = this.$refs.swiperTop.swiper
      this.swiperThumbs = this.$refs.swiperThumbs.swiper
      this.swiperTop.controller.control = this.swiperThumbs
      this.swiperThumbs.controller.control = this.swiperTop
    })
  },
  watch: {
    // 监听规格参数变化
    specSelected (e) {
      let sku = ''
      e.forEach((item, sindex) => {
        sku += item.attr + ','
      })
      sku = sku.substring(0, sku.length - 1)
      let s = this.skuList
      this.skuInfo = s[sku]
    }
  },
  methods: {
    ...mapMutations({
      setCartNumber: 'SET_CARTNUMBER',
      setShoppingCart: 'SET_SHOPPINGCART',
      setCollectData: 'SET_COLLECTDATA'
    }),
    // 获取商品详情
    getProductInfo () {
      const rLoading = this.openLoading()
      let self = this
      let params = {
        url: api.getProDetail + self.currentPro.productId,
        method: 'GET'
      }
      self.sendReq(params, (res) => {
        if (res.status === 200) {
          self.productDetailData = res.data.storeInfo
          self.specList = res.data.productAttr
          self.favorite = self.productDetailData.userCollect
          self.skuList = res.data.productValue
          self.replyCount = res.data.replyCount
          // 规格 默认选中第一条
          this.specList.forEach((item) => {
            item.attrValue[0].check = true
            this.specSelected.push(item.attrValue[0])
          })
          window.scrollTo(0, 0)
          rLoading.close()
        } else {
          self.$message(res.msg)
        }
      })
    },
    // 获取猜你喜欢
    getLikeProduct () {
      var _this = this
      let params = {
        url: api.getIndexLike,
        method: 'GET'
      }
      this.sendReq(params, (res) => {
        if (res.status === 200) {
          this.similarProducts = res.data.splice(0, 4)
        } else {
          _this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    reloadDetail () {
      this.$router.go(0)
      // this.reload()
    },

    // 加入购物车
    clickAddCart () {
      if (this.skuInfo.stock > 0) {
        let self = this
        let params = {
          url: api.addCart,
          method: 'POST',
          data: {
            cartNum: self.productNumber,
            uniqueId: self.skuInfo.unique,
            productId: self.productDetailData.id,
            new: 0
          }
        }
        self.sendReq(params, (res) => {
          if (res.status === 200) {
            self.$message.success('添加成功')
            self.getTrolleyList()
          } else {
            self.$message(res.msg)
          }
        })
      } else {
        this.$message.warning('商品库存不足')
      }
    },
    // 购物车列表
    async getTrolleyList () {
      const vm = this
      const params = {
        url: api.getTrolleyList,
        method: 'GET'
      }
      vm.sendReq(params, res => {
        const d = res.data.valid
        this.setShoppingCart(d)
        this.setCartNumber(d.length)
      })
    },
    clickSwitchTab (type) {
      this.currentComp = type
    },
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    // 购买
    buyGood () {
      let self = this
      if (this.skuInfo.stock > 0) {
        if (!Cookie.get('token')) {
          this.$message.warning('请先登录')
          this.$store.commit('resetVuex')
          this.$router.push({path: '/login'})
        } else {
          let params = {
            url: api.addCart,
            method: 'POST',
            data: {
              cartNum: self.productNumber,
              uniqueId: self.skuInfo.unique,
              productId: self.productDetailData.id,
              new: 1
            }
          }
          self.sendReq(params, (res) => {
            if (res.status === 200) {
              let cartId = res.data.cartId
              this.$router.push({
                path: '/placeOrder',
                query: {
                  cartId: cartId
                }})
            } else {
              self.$message(res.msg)
            }
          })
        }
      } else {
        this.$message.warning('商品库存不足')
      }
    },
    // 选择规格sku
    selectSku (index, cindex) {
      this.specSelected = []
      this.specList.forEach((item, sindex) => {
        if (index === sindex) {
          for (let i = 0; i < item.attrValue.length; i++) {
            if (i === cindex) {
              item.attrValue[i].check = true
            } else {
              item.attrValue[i].check = false
            }
          }
        }
      })

      this.specList.forEach((item) => {
        for (let i = 0; i < item.attrValue.length; i++) {
          if (item.attrValue[i].check) {
            this.specSelected.push(item.attrValue[i])
          }
        }
      })
    },
    // 轮播图
    thumbsClick (index) {
      this.swiperThumbs.slideTo(index, 300, false)
      this.swiperTop.slideTo(index, 300, false)
    },
    // 收藏
    collect () {
      if (this.favorite === false) {
        let params = {
          url: api.collect,
          method: 'POST',
          data: {
            category: 'collect',
            id: this.productDetailData.id
          }
        }
        this.sendReq(params, (res) => {
          if (res.status === 200) {
            this.$message.success('收藏成功')
            this.favorite = true
          }
        })
      } else {
        let params = {
          url: api.unfavorite,
          method: 'POST',
          data: {
            category: 'collect',
            id: this.productDetailData.id
          }
        }
        this.sendReq(params, (res) => {
          if (res.status === 200) {
            this.$message.success('取消成功')
            this.favorite = false
          }
        })
      }
    },
    replaceImgSrc (basePrefix, questionContent) {
      if (questionContent) {
        questionContent = questionContent.replace(new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi), function (match, capture) {
          match = match.replace(new RegExp(capture, 'g'), basePrefix + capture)
          return match
        })
        return questionContent
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.productBox {
  margin-top: 50px;
  .productConcise {
    margin-bottom: 60px;
    .swiper-box {
      width: 580px;
      position: relative;
      margin-right: 50px;
      float: left;
      .swiper-slide {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        &.slide-1 {
          background-image:url('../../../static/image/tu1@2x.png');
        }
        &.slide-2 {
          background-image:url('../../../static/image/tu3@2x.png');
        }
        &.slide-3 {
          background-image:url('../../../static/image/tup2@2x.png');
        }
        &.slide-4 {
          background-image:url('../../../static/image/likeProduct1.png');
        }
        &.slide-5 {
          background-image:url('../../../static/image/poornetwork@2x.png');
        }
      }
      .gallery-top {
        height: 100%!important;
        width: 440px;
        position: absolute;
        right: 0;
      }
      .swiperThumbsLeft {
        width: 120px;
        position: absolute;
        left: 0;
        top: 10%;
        box-sizing: border-box;
        padding: 10px 0;
        height: 80%;
        .thumbsBox {
          width: 100%;
          height: 100%;
          position: relative;
          .swiper-button-prev,
          .swiper-button-next {
            position: absolute;
            left: 45px;
            background: none;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #999999;
            color: #FFFFFF;
          }
          .swiper-button-prev {
            position: absolute;
            top: -30px;
          }
          .swiper-button-next {
            position: absolute;
            top: initial;
            bottom: -50px;
          }
        }
      }
      .gallery-thumbs {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .gallery-thumbs .swiper-slide {
        width: 100%;
        opacity: 0.7;
      }
      .gallery-thumbs .swiper-slide-active {
        opacity: 1;
        border: 1px solid $mainColor;
        box-sizing: border-box;
      }
    }
    .proDuctInfo {
      width: 578px;
      float: left;
      .productTit {
        font-size: 22px;
        color: #333333;
      }
      .introduction {
        color: #999999;
        font-size: 14px;
        line-height: 30px;
        margin: 10px 0;
      }
      .priceDataInfo {
        background: #FFF8F2;
        height: auto;
        .groupBuyInfo {
          display: flex;
          justify-content: space-between;
          background: #FF6B63;
          height: 32px;
          align-items: center;
          padding: 0 16px;
          .groupLeft {
            display: flex;
            color: #FFFFFF;
            align-items: center;
            i {
              font-size: 22px;
              margin-right: 5px;
            }
            span {
              font-family: YouSheBiaoTiHei;
              font-style: italic;
              font-weight: bold;
            }
          }
          .groupRight {
            color: #FFFFFF;
          }
          .countdown{
            display: flex;
            font-size: 14px;
            color: #FFFFFF;
            .countdownTit{
              line-height: 20px;
              margin-right: 5px;
            }
            .timeDown{
              span{
                display: inline-block;
                text-align: center;
                height: 20px;
                line-height: 20px;
              }
              .time{
                min-width: 20px;
                background-color: #fff;
                color: #FF6B63;
              }
            }
          }
        }
        .priceSpike {
          display: flex;
          margin-top: 15px;
          padding: 0 15px;
          justify-content: space-between;
          .priceSpikeLeft {
            display: flex;
            color: #EC4B42;
            align-items: center;
            font-size: 16px;
            b {
              color: $mainColor;
              font-size: 22px;
              margin-right: 10px;
            }
            span {
              font-size: 16px;
              font-weight: 400;
              text-decoration: line-through;
              color: #666666;
            }
          }
          .priceSpikeRight {
            display: flex;
            align-items: center;
            span {
              margin-right: 15px;
              color: #999999;
              font-size: 14px;
            }
            >>>.el-progress{
              box-sizing: border-box;
              width: 100px;
              height: 10px;
              border-radius: 0;
              border: 1px solid #FF736C;
              background: #F5F5F5;
              .el-progress-bar{
                display: block;
                height: 100%;
                .el-progress-bar__inner{
                  border-radius: 0;
                  height: 100%;
                }
                .el-progress-bar__outer{
                  border-radius: 0;
                  height: 100% !important;
                }
                .el-progress-bar__innerText{
                  display: none;
                }
              }
            }
          }
        }
        .promotionInfo {
          padding: 16px 16px 20px 16px;
          span:nth-child(1) {
            font-size: 16px;
            color: #999999;
          }
          span:nth-child(2) {
            font-size: 22px;
            color: $mainColor;
          }
          span:nth-child(3) {
            font-size: 16px;
            color: #666666;
            text-decoration: line-through;
          }
        }
        .proDiscount {
          padding: 2px 0 16px;
          max-height: 112px;
          overflow-y: auto;
          box-sizing: border-box;
          .discountInfo {
            span:nth-child(1) {
              font-size: 16px;
              color: #999999;
            }
            span:nth-child(2) {
              font-size: 14px;
              color: $mainColor;
              border: 1px solid $mainColor;
              padding: 0 2px;
              border-radius: 4px;
            }
            span:nth-child(3) {
              font-size: 14px;
              color: #666666;
            }
          }
          .activityLabel {
            padding-left: 20px;
            margin-bottom: 20px;
            span:nth-child(1) {
              font-size: 14px;
              color: $mainColor;
              border: 1px solid $mainColor;
              padding: 1px 2px;
              border-radius: 4px;
            }
            span:nth-child(2) {
              font-size: 14px;
              color: #666666;
            }
            span:nth-child(3) {
              font-size: 14px;
              color: $mainColor;
              text-decoration: underline;
              cursor: pointer;
            }
          }
          .activityLabel:last-child{
            margin-bottom: 0;
          }
        }
      }
      .proDescribeTit {
        color: #000000;
        font-size: 16px;
        margin: 18px 0;
      }
      .productColor {
        .proColorList {
          display: flex;
          div {
            border: 1px solid #FFFFFF;
            padding: 4px;
            margin-right: 15px;
            cursor: pointer;
            span {
              display: block;
              height: 37px;
              width: 37px;
              border: 1px solid #EEEEEE;
              img {
                width: 100%;
              }
            }
          }
          // div.colorActive {
          // }
        }
      }
      .sku-box {
        ul {
          li {
            p {
              &:nth-child(2) {
                span {
                  display: inline-block;
                  padding: 0 10px;
                  height: 32px;
                  line-height: 32px;
                  text-align: center;
                  color: #666666;
                  font-size: 18px;
                  background: #EFEFEF;
                  margin-right: 20px;
                  margin-bottom: 15px;
                  cursor: pointer;
                }
                .selected-item {
                  background: $mainColor;
                  color: #FFFFFF;
                }
              }
            }
          }
        }
      }
      .productSize {
        .proSizeList {
          display: flex;
          span {
            padding: 0 10px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #666666;
            font-size: 18px;
            background: #EFEFEF;
            margin-right: 20px;
            cursor: pointer;
          }
          span.sizeActive {
            background: $mainColor;
            color: #FFFFFF;
          }
        }
      }
      .proNumberList {
        .el-input-number {
          width: 140px;
          margin-right: 25px;
        }
        b {
          font-size: 16px;
          font-weight: 500;
          color: $mainColor;
          padding: 0 5px;
        }
      }
      .btnBox {
        display: flex;
        align-items: center;
        margin-top: 30px;
        .buyBox {
          display: flex;
          span {
            width: 135px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: $mainColor;
            border: 1px solid $mainColor;
            margin-right: 10px;
            &:hover {
              cursor: pointer;
            }
          }
          span:nth-child(2) {
            background: $mainColor;
            color: #FFFFFF;
          }
        }
        .favorites {
          display: flex;
          .StartGroup {
            width: 135px;
            height: 40px;
            background: #FF7800;
            display: block;
            color: #FFFFFF;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
          }
          .oddBuy {
            width: 135px;
            height: 40px;
            display: block;
            box-sizing: border-box;
            color: $mainColor;
            border: 1px solid $mainColor;
            margin-right: 10px;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
          }
        }
        .noStock{
          display: flex;
          span{
            width: 135px;
            height: 40px;
            background: #999999;
            display: block;
            color: #FFFFFF;
            text-align: center;
            line-height: 40px;
          }
        }
        .favoritesBtn {
          width: 40px;
          height: 38px;
          background: #FFFFFF;
          border: 1px solid #CCCCCC;
          text-align: center;
          margin-left: 10px;
          cursor: pointer;
          i {
            color: #666666;
            display: block;
            margin-top: 2px;
          }
          span {
            display: block;
            font-size: 12px;
            color: #999999;
          }
        }
      }
    }
  }
  >>> .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }
  .productDetail {
    .detailTabs {
      margin-bottom: 30px;
      height: 46px;
      line-height: 46px;
      border: 1px solid #E5E5E5;
      background: #F6F6F6;
      display: flex;
      span {
        padding: 0 30px;
        border-right: 1px solid #E5E5E5;
        cursor: pointer;
        color: #333333;
        font-size: 16px;
      }
      .compActive {
        background: #FFFFFF;
      }
    }
    .detailBox {
      margin-bottom: 100px;
      .detailInfoBox {
        width: 890px;
        float: left;
        min-height: 1200px;
        border-right: 1px solid #CACACA;
      }
      .detailCont >>> img{ // 修改v-html渲染的样式
        max-width: 100%;
        height: auto;
      }
      .detailCont >>> ul{ // 修改v-html渲染的样式
        list-style-type: none;
      }
      .likeProductBox {
        width: 280px;
        float: left;
        padding-left: 44px;
      }
    }
  }
}
.pinListBox::-webkit-scrollbar {
  width: 4px;
  height: 16px;
  background-color: #F5F5F5;
}
/*定义滚动条轨道 内阴影+圆角*/
.pinListBox::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 0px;
  background-color: #FFFFFF;
}
/*定义滑块 内阴影+圆角*/
.pinListBox::-webkit-scrollbar-thumb {
  border-radius: 0px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);
  background-color: #e3e3e3;
}
</style>
