<template>
  <div class="layout">
      <div class="list-group-item" v-for="(item,index) in componentsData" :key="index">
        <component :is="componentMap[terminal-1].get(item.type)" :componentContent="item.componentContent" :terminal="terminal" :typeId="typeId" :shopId="shopId"></component>
      </div>
    <loading-toast ref="loadingToast"></loading-toast>
  </div>
</template>

<script>
  import componentMap from './componentMap'
  import api from './config/api'
  import {sendReqMixin} from './config/mixin'
  import Cookies from 'js-cookie'
  import LoadingToast from './components/toast'
  import store from './config/mixin/store'
  export default {
    name: 'canvasPage',
    components: { LoadingToast },
    mixins: [sendReqMixin],
    data () {
      return {
        // terminal: 4, // 画布设备 1 小程序，2 H5，3 App 4 电脑
        // typeId: 3, // 画布类型 1 平台画布，2 自定义页面，3 商家店铺装修
        // shopId: 0, // 店铺id
        componentsData: [],
        activeComponent: -1,
        componentMap: componentMap
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
      canvasId: {
        type: Number,
        default: 0
      }
    },
    mounted () {
      // this.shopId = Cookies.get('cereShopId')
      this.canvasGet()
    },
    methods: {
      // 读取画布
      canvasGet () {
        var _this = this
        this.$refs.loadingToast.setCanvasLoading(true)
        var apiUrl = api.getCanvas + '?terminal=' + this.terminal + '&type=' + this.typeId
        if (this.shopId) {
          apiUrl += '&shopId=' + this.shopId
        }
        if (this.canvasId) {
          apiUrl += '&canvasId=' + this.canvasId
        }
        let params = {
          url: apiUrl,
          method: 'GET'
        }
        this.sendReq(params, (res) => {
          this.$refs.loadingToast.setCanvasLoading(false)
          if (JSON.stringify(res.data) !== '{}') {
            // _this.canvasId = res.data.canvasId
            var componentsData = JSON.parse(res.data.json)
            for (let i = 0; i < componentsData.length; i++) {
              // 商品列表
              if (componentsData[i].type === 'productList') {
                this.$refs.loadingToast.setCanvasLoading(true)
                store.commit("loadNumAdd");
                if (componentsData[i].componentContent.productData.sourceType === '1') {
                  _this.sendReq({
                    url: `${api.getProducts}?page=1&pageSize=99&ids=${componentsData[i].componentContent.productData.productIdList}`,
                    method: 'GET'
                  }, (proRes) => {
                    store.commit("loadNumReduce");
                    componentsData[i].componentContent.productData.imgTextData = proRes.data.list
                  })
                } else if(componentsData[i].componentContent.productData.sourceType === '2'){
                  _this.sendReq({
                    url: `${api.getProducts}?page=1&pageSize=99&classifyId=${componentsData[i].componentContent.productData.categoryId}`,
                    method: 'GET'
                  }, (proRes) => {
                    store.commit("loadNumReduce");
                    componentsData[i].componentContent.productData.imgTextData = proRes.data.list
                  })
                }
              }  else if (componentsData[i].type === 'coupon' || componentsData[i].type ===
                'groupList' || componentsData[i].type === 'spikeList' || componentsData[i].type ===
                'discountList') {
                this.$refs.loadingToast.setCanvasLoading(true)
                store.commit("loadNumAdd");
              } else if (componentsData[i].type === 'shopHeader' && this.terminal === 4) {
                if (componentsData[i].componentContent.category && componentsData[i].componentContent.category.length !== 0) {
                  var categoryArr = componentsData[i].componentContent.category
                  _this.sendReq({
                    url: `${api.getClassify}`,
                    method: 'GET'
                  }, (proRes) => {
                    componentsData[i].componentContent.category = proRes.data.filter((item) => {
                      for (let i = 0; i < categoryArr.length; i++) {
                        if (categoryArr[i].id === item.id) {
                          return true
                        }
                      }
                    })
                  })
                }
              }
            }
            //componentsData = componentsData.slice(0,24)
            _this.componentsData = componentsData
            //_this.componentsData = _this.componentsData.slice(0,14)
          } else {
            // _this.canvasId = ''
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hom-layout{
    background-color: #f5f5f5;
  }
</style>

<style lang="scss">
  .warp{
    width: 690px;
    margin: 0 auto;
    max-width: 100%;
    &.terminal4{
      width: 1250px;
      max-width: 96%;
    }
  }
  .flex-box{
    display: flex;
  }
</style>
