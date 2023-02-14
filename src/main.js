// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import api from './api'
// import '@/config/rem' // 配置flex
import 'normalize.css' // 重置样式表
// import '@/styles/element-ui-style.css' // 重置样式表
import ElementUI from 'element-ui'
import './../theme/index.css'
import qs from 'qs'
Vue.use(ElementUI)
Vue.prototype.$message = ElementUI.Message
Vue.prototype.$qs = qs
Vue.prototype.$api = api
// 阻止启动生产消息
Vue.config.productionTip = false

Vue.filter('money', function (value) {
  if (!value) return '0.00'
  var val = value.toFixed(2)
  var intPart = Number(val).toFixed(0)
  var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  var floatPart = '.00'
  val = value.toString()
  var value2Array = value.split('.')
  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    if (floatPart.length === 1) {
      return intPartFormat + '.' + floatPart + '0'
    } else {
      return intPartFormat + '.' + floatPart
    }
  } else {
    return intPartFormat + floatPart
  }
})
// 防止连点
Vue.directive('throttle', {
  inserted (el, binding) {
      el.addEventListener('click', () => {
          el.style.pointerEvents = 'none'
          if (!el.disabled) {
              setTimeout(() => {
                  el.style.pointerEvents = 'auto'
              }, binding.value || 2000)
          }
      })
  }
})

Vue.prototype.openLoading = function () {
  const loading = this.$loading({ // 声明一个loading对象
    lock: true, // 是否锁屏
    target: '.sub-main', // 需要遮罩的区域
    body: true,
    background: '#ffffff',
    customClass: 'mask' // 遮罩层新增类名
  })
  setTimeout(function () { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close() // 关闭遮罩层
  }, 5000)
  return loading
}
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
