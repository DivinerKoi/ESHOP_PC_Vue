// 导入api接口模块
import home from './home'
// 导入购物车商品接口
import trolley from './shopping-troelly'

// 获取当前环境变量 true => 生产环境 false => 开发环境
const BASEURL = (process.env.NODE_ENV === 'production') ? '/api' : '/api'
const IMGBASEURL = 'http://localhost:8008/api'
export const api = {
  // 登录模块
  ...home(BASEURL),
  ...trolley(BASEURL),
  BASEURL: IMGBASEURL,
  vCode: `${BASEURL}/register/verify`,
  login: `${BASEURL}/login`,
  register: `${BASEURL}/register`,
  // 图片上传
  upload: `${BASEURL}/uploads`,
  // 首页模块
  getIndexBanner: `${BASEURL}/index/banner`, // 获取首页轮播图
  getIndexBast: `${BASEURL}/index/bastList`, // 获取首页精品推荐
  getIndexLike: `${BASEURL}/index/like`, // 获取首页猜你喜欢
  getSearchProducts: `${BASEURL}/app/getSearchProducts`, // 搜索商品
  // 分类模块
  getCategory: `${BASEURL}/category`, // 获取全部分类
  // 订单模块
  getOrderList: `${BASEURL}/order/list`, // 查询订单列表
  getOrderDetail: `${BASEURL}/order/detail/`, // 查询订单详情
  cancelOrder: `${BASEURL}/order/cancel`, // 取消订单
  confirm: `${BASEURL}/order/take`, // 确认收货
  deleteOrder: `${BASEURL}/order/del`, // 删除订单
  orderConfirm: `${BASEURL}/order/confirm`, // 订单确认信息
  orderComputed: `${BASEURL}/order/computed/`, // 计算订单金额
  orderSubmit: `${BASEURL}/order/create/`, // 订单创建
  payOrder: `${BASEURL}/order/pay`, // 订单支付
  orderComment: `${BASEURL}/order/comment`, // 订单评价
  // 收货地址模块
  addressList: `${BASEURL}/address/list`, // 收货地址管理查询
  selectAddress: `${BASEURL}/receive/getSelect`, // 选择收货地址查询
  changeAddress: `${BASEURL}/receive/getById`, // 修改收货地址查询
  delAddress: `${BASEURL}/address/del`, // 删除收货地址
  editAddress: `${BASEURL}/address/edit`, // 编辑收货地址
  getArea: `${BASEURL}/city_list`, // 获取城市列表
  // 个人信息模块
  getUser: `${BASEURL}/userinfo`, // 个人信息查询
  getAllProduct: `${BASEURL}/collect/user`, // 获取收藏或足迹
  unfavorite: `${BASEURL}/collect/del`, // 取消收藏
  unfavorites: `${BASEURL}/collect/dels/`, // 批量取消收藏或足迹
  getRecharge: `${BASEURL}/recharge/index`, // 获取充值方案
  setRecharge: `${BASEURL}/recharge/test`, // 充值
  uptPassword: `${BASEURL}/user/password`, // 修改密码
  uptUserInfo: `${BASEURL}/user/edit`, // 修改个人信息
  // 商品模块
  getProducts: `${BASEURL}/products`, // 查询商品
  getProDetail: `${BASEURL}/product/detail/`, // 商品详情
  addCart: `${BASEURL}/cart/add`, // 加入购物车
  collect: `${BASEURL}/collect/add`, // 收藏商品
  getEvaluateData: `${BASEURL}/reply/config/`, // 获取商品评价数据
  getEvaluateList: `${BASEURL}/reply/list/` // 获取商品评价列表
}
export default api
