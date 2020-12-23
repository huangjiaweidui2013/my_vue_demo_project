// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import store from './store'
import '@/mock'
// 引入第三方图标:阿里巴巴iconfont图标
// import './assets/iconfont/iconfont.css'
import './assets/iconfont/icon.css'
// font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。
import './assets/iconfont/iconfont.css'
// 使用Symbol 引用图标,支持多色图标
import './assets/iconfont/iconfont.js'

//引入echarts
import echarts from 'echarts'

//引用百度UEditor编辑器
import '../static/ue/ueditor.config'
import '../static/ue/ueditor.all.min'
import '../static/ue/lang/zh-cn/zh-cn'
import '../static/ue/ueditor.parse.min'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
