export const componentMap = [
  // 小程序
  new Map([
    // ['shopHeader', () => import('./cereshop/app/shopHeader')], // 首页头部
    ['text', () => import('./basics/text')], // 文本
    ['imageText', () => import('./basics/imageText')], // 图文
    ['brandList', () => import('./basics/brandList')], // 品牌列表
    ['categoryList', () => import('./basics/categoryList')], // 品牌列表
    ['imageTextList', () => import('./basics/imageTextList')], // 图文列表
    ['assistDiv', () => import('./basics/assistDiv')], // 铺助分割
    ['imageTextNav', () => import('./basics/imageTextNav')], // 图文导航
    ['productList', () => import('./basics/productList/app')], // 商品列表
    ['videoBox', () => import('./basics/video')], // 视频
    ['coupon', () => import('./basics/coupon')], // 优惠券
    ['custom', () => import('./basics/custom')], // 自定义
    ['shopHead', () => import('./basics/shopHead')], // 店铺头部
    ['groupList', () => import('./basics/groupList/app')], // 拼团专区
    ['spikeList', () => import('./basics/spikeList')], // 秒杀专区
    ['discountList', () => import('./basics/discountList')] // 限时折扣
  ]),
  // H5
  new Map([
    // ['shopHeader', () => import('./cereshop/app/shopHeader')], // 首页头部
    ['text', () => import('./basics/text')], // 文本
    ['imageText', () => import('./basics/imageText')], // 图文
    ['brandList', () => import('./basics/brandList')], // 品牌列表
    ['categoryList', () => import('./basics/categoryList')], // 品牌列表
    ['imageTextList', () => import('./basics/imageTextList')], // 图文列表
    ['assistDiv', () => import('./basics/assistDiv')], // 铺助分割
    ['imageTextNav', () => import('./basics/imageTextNav')], // 图文导航
    ['productList', () => import('./basics/productList/app')], // 商品列表
    ['videoBox', () => import('./basics/video')], // 视频
    ['coupon', () => import('./basics/coupon')], // 优惠券
    ['custom', () => import('./basics/custom')], // 自定义
    ['shopHead', () => import('./basics/shopHead')], // 店铺头部
    ['groupList', () => import('./basics/groupList/app')], // 拼团专区
    ['spikeList', () => import('./basics/spikeList')], // 秒杀专区
    ['discountList', () => import('./basics/discountList')] // 限时折扣
  ]),
  // APP
  new Map([
    // ['shopHeader', () => import('./cereshop/app/shopHeader')], // 首页头部
    ['text', () => import('./basics/text')], // 文本
    ['imageText', () => import('./basics/imageText')], // 图文
    ['brandList', () => import('./basics/brandList')], // 品牌列表
    ['categoryList', () => import('./basics/categoryList')], // 品牌列表
    ['imageTextList', () => import('./basics/imageTextList')], // 图文列表
    ['assistDiv', () => import('./basics/assistDiv')], // 铺助分割
    ['imageTextNav', () => import('./basics/imageTextNav')], // 图文导航
    ['productList', () => import('./basics/productList/app')], // 商品列表
    ['videoBox', () => import('./basics/video')], // 视频
    ['coupon', () => import('./basics/coupon')], // 优惠券
    ['custom', () => import('./basics/custom')], // 自定义
    ['shopHead', () => import('./basics/shopHead')], // 店铺头部
    ['groupList', () => import('./basics/groupList/app')], // 拼团专区
    ['spikeList', () => import('./basics/spikeList')], // 秒杀专区
    ['discountList', () => import('./basics/discountList')] // 限时折扣
  ]),
  // PC
  new Map([
    ['shopHeader', () => import('./cereshop/pc/shopHeader')], // 首页头部
    ['text', () => import('./basics/text')], // 文本
    ['imageText', () => import('./basics/imageText')], // 图文
    ['brandList', () => import('./basics/brandList')], // 品牌列表
    ['categoryList', () => import('./basics/categoryList')], // 品牌列表
    ['imageTextList', () => import('./basics/imageTextList')], // 图文列表
    ['assistDiv', () => import('./basics/assistDiv')], // 铺助分割
    ['imageTextNav', () => import('./basics/imageTextNav')], // 图文导航
    ['productList', () => import('./basics/productList/pc')], // 商品列表
    ['videoBox', () => import('./basics/video')], // 视频
    ['coupon', () => import('./basics/coupon')], // 优惠券
    ['custom', () => import('./basics/custom')], // 自定义
    ['shopHead', () => import('./basics/shopHead')], // 店铺头部
    ['groupList', () => import('./basics/groupList/pc')], // 拼团专区
    ['spikeList', () => import('./basics/spikeList')], // 秒杀专区
    ['discountList', () => import('./basics/discountList')] // 限时折扣
  ])
]
export default componentMap
