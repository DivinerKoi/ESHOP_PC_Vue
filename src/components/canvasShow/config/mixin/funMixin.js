import api from '../api'
import {sendReq} from './sendReqMixin'
import router from '@/router'
import { mapMutations } from 'vuex'
/*
 * 公共方法的 mixin
 */

/* eslint-disable */
export const tool = {
  mixins: [sendReq],
  methods: {
    // ...mapMutations({
    //   setCurrentPro: 'SET_CURRENTPRO'
    // }),
    // 判断url
    jumpLink (linkObj) {
      var link = ''
      if(linkObj && linkObj.typeText && linkObj.data){
        switch (linkObj.typeText) {
          case '类别':
            router.push({name:'category',query:{classifyData:JSON.stringify(linkObj.data)}})
            break
          case '店辅':
            router.push({
              path: '/store',
              query: {shopId: linkObj.data.shopId}
            });
            break
          case '商品':
            // this.setCurrentPro(linkObj.data)
            // router.push("/productDetail");
            let data = {
              productId: linkObj.data.productId,
              skuId: linkObj.data.skuId,
              shopId: linkObj.data.shopId
            }
            router.push({
              path: "/productDetail",
              query: {
                proData: JSON.stringify(data)
              }
            })
            break
          case '自定义':
            // router.push("/category");
            break
        }
      } else if(linkObj.selsectValue==='/index'){
        router.push("/index");
      }
      return link
    },
    // 跳转到类别主页
    jumpCategory(item){
      router.push({name:'category',query:{classifyData:JSON.stringify(item)}})
    },
    // 跳转到店铺主页
    jumpStore(item){
      router.push({
        path: '/store',
        query: {shopId: item.shopId}
      });
    },
    // 跳转到产品详细
    jumpProductDetail(item){
      let data = {
        productId: item.productId,
        skuId: item.skuId,
        shopId: item.shopId
      }
      router.push({
        path: "/productDetail",
        query: {
          proData: JSON.stringify(data)
        }
      });
    },
    // 跳转到秒杀专区
    jumpSeckills(item){
      router.push({
        path: '/rabatt',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    // 跳转到拼团专区
    jumpGroupWorks(item){
      router.push({
        path: '/groupBuy',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    // 跳转到折扣列表
    jumpDiscount(item){
      router.push({
        path: '/spitze',
        query: {shopId: item.shopId,id:item.id}
      });
    },
    // 查询产品
    searchPro (key,type) {
      if (this.$route.name !== 'search') {
        this.$router.push({
          path: '/search',
          query: {
            keyword: key,
            searchVal: type
          }
        })
      } else {
        this.$emit('search', this.keyword, this.searchVal)
      }
    }
  }
}
