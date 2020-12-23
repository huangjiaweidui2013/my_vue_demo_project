import Vue from 'vue'
import Router from 'vue-router'
import FirstPage from '@/components/FirstPage'
import WeatherInfo from '@/components/WeatherInfo'
import NeteaseNews from '@/components/NeteaseNews'
import VuexDemo from '@/components/VuexDemo'
import ShoppingCart from '@/components/ShoppingCartExample'
import ElementUIMenu from '@/components/ElementUIMenu'
import StudentsMock from '@/components/StudentsMock'
import StudentsHomeMap from '@/components/StudentsHomeMap'
import ChildComponent1 from '@/components/ChildComponent1'
import ChildComponent2 from '@/components/ChildComponent2'
import ElementUITabs from '@/components/ElementUITabs'
import LoginPage from '@/components/LoginPage'
import ElementUIOthers from '@/components/ElementUIOthers'
import Tinymce from '@/components/Tinymce'
import QRCodePage from '@/components/QRCodePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirstPage',
      component: FirstPage,
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/WeatherInfo',
      name: 'WeatherInfo',
      component: WeatherInfo
    },
    {
      path: '/NeteaseNews',
      name: 'NeteaseNews',
      component: NeteaseNews
    },
    {
      path: '/VuexDemo',
      name: 'VuexDemo',
      component: VuexDemo
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/ElementUIMenu',
      name: 'ElementUIMenu',
      component: ElementUIMenu,
      redirect: '/ElementUIMenu/StudentsMock',
      children:[
        {
          path: 'WeatherInfo',
          name: 'WeatherInfo',
          component: WeatherInfo
        },
        {
          path: 'NeteaseNews',
          name: 'NeteaseNews',
          component: NeteaseNews
        },
        {
          path: 'VuexDemo',
          name: 'VuexDemo',
          component: VuexDemo
        },
        {
          path: 'ShoppingCart',
          name: 'ShoppingCart',
          component: ShoppingCart
        },
        {
          path: 'ChildComponent1',
          name: 'ChildComponent1',
          component: ChildComponent1
        },
        {
          path: 'ChildComponent2',
          name: 'ChildComponent2',
          component: ChildComponent2
        },
        {
          path: 'StudentsMock',
          name: 'StudentsMock',
          component: StudentsMock
        },
        {
          path: 'ChinaMap',
          name: 'ChinaMap',
          component: StudentsHomeMap
        }
      ]
    },
    {
      path: '/StudentsMock',
      name: 'StudentsMock',
      component: StudentsMock
    },
    {
      path: '/ChinaMap',
      name: 'ChinaMap',
      component: StudentsHomeMap
    },
    {
      path: '/ElementUITabs',
      name: 'ElementUITabs',
      component: ElementUITabs,
      redirect: '/ElementUITabs/StudentsMock',
      children:[
        {
          path: 'WeatherInfo',
          name: '实时天气',
          component: WeatherInfo
        },
        {
          path: 'NeteaseNews',
          name: '网易新闻',
          component: NeteaseNews
        },
        {
          path: 'VuexDemo',
          name: 'Vuex演示',
          component: VuexDemo
        },
        {
          path: 'ShoppingCart',
          name: 'Vuex购物车',
          component: ShoppingCart
        },
        {
          path: 'ChildComponent1',
          name: '富文本UEditor',
          component: ChildComponent1
        },
        {
          path: 'ChildComponent2',
          name: '父子组件通信',
          component: ChildComponent2
        },
        {
          path: 'StudentsMock',
          name: '学生信息',
          component: StudentsMock
        },
        {
          path: 'ChinaMap',
          name: '学生分布',
          component: StudentsHomeMap
        },
        {
          path: 'ElementUIOthers',
          name: 'ElementUI其他组件',
          component: ElementUIOthers
        },
        {
          path: 'Tinymce',
          name: 'Tinymce富文本组件',
          component: Tinymce
        },
        {
          path: 'QRCodePage',
          name: '二维码示例',
          component: QRCodePage
        }
      ]
    }
  ]
})
