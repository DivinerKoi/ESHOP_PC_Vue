import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import search from '@/views/search/index'
import category from '@/views/category/index'
import index from '@/views/home/index'
import custom from '@/views/custom/index'
import login from '../views/login/login'
import orderDetail from '../views/orderDetail/index'
import shoppingTrolley from '../views/shopping-trolley/index'
import productDetail from '../views/product/productDetail'
import placeOrder from '../views/placeOrder/index'
import evaluate from '@/views/evaluate/index'
// 用户中心中心
import userCenter from '../views/userCenter/userCenter'
import recharge from '../views/userCenter/recharge/recharge'
import myOrder from '../views/userCenter/myOrder/myOrder'
import signingAddress from '../views/userCenter/signingAddress/signingAddress'
import userInfo from '../views/userCenter/userInfo/userInfo'
import browseRecords from '../views/userCenter/browseRecords/browseRecords'
import favorites from '../views/userCenter/favorites/favorites'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: { name: 'index' },
      children: [
        // 首页
        {
          path: '/index',
          name: 'index',
          component: index,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 自定义页面
        {
          path: '/custom',
          name: 'custom',
          component: custom,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 用户中心
        {
          path: '/userCenter',
          name: 'userCenter',
          component: userCenter,
          meta: {
            logoText: '',
            searchVisible: false
          },
          children: [
            {
              path: '/recharge',
              name: 'recharge',
              component: recharge,
              meta: {
                logoText: '',
                searchVisible: false
              }
            },
            {
              path: '/myOrder',
              name: 'myOrder',
              component: myOrder,
              meta: {
                logoText: '',
                searchVisible: false
              }
            },
            {
              path: '/signingAddress',
              name: 'signingAddress',
              component: signingAddress,
              meta: {
                logoText: '',
                searchVisible: false
              }
            },
            {
              path: '/userInfo',
              name: 'userInfo',
              component: userInfo,
              meta: {
                logoText: '',
                searchVisible: false
              }
            },
            {
              path: '/browseRecords',
              name: 'browseRecords',
              component: browseRecords,
              meta: {
                logoText: '',
                searchVisible: false
              }
            },
            {
              path: '/favorites',
              name: 'favorites',
              component: favorites,
              meta: {
                logoText: '',
                searchVisible: false
              }
            }
          ]
        },
        // 搜索
        {
          path: '/search',
          name: 'search',
          component: search,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 分类页面
        {
          path: '/category',
          name: 'category',
          component: category,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 购物车
        {
          path: '/shopping-trolley',
          name: 'shoppingTrolley',
          component: shoppingTrolley,
          meta: {
            logoText: '',
            searchVisible: true
          }

        },
        // 订单详情
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component: orderDetail,
          meta: {
            logoText: '',
            searchVisible: true
          }

        },
        // 评价
        {
          path: '/evaluate',
          name: 'evaluate',
          component: evaluate,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 商品详情
        {
          path: '/productDetail',
          name: 'productDetail',
          component: productDetail,
          meta: {
            logoText: '',
            searchVisible: true
          }
        },
        // 下单页面
        {
          path: '/placeOrder',
          name: 'placeOrder',
          component: placeOrder,
          meta: {
            logoText: '',
            searchVisible: true
          }
        }
      ]
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  // cookie没有值就跳到登陆页
  // let area = sessionStorage.getItem('area')
  // if (area === null && to.name !== 'login' && to.name !== 'overview') {
  //   // Vue.prototype.$message.error('用户未登陆')
  //   next('/login')
  // } else {
  next()
  // }
})

export default router
