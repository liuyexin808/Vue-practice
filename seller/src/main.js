// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
import 'common/stylus/index'

Vue.use(VueRouter)
Vue.use(VueResource)

// 配置路由，一共三个路径
const routes = [
  {
    path: '/goods',
    component: Goods
  }, {
    path: '/seller',
    component: Seller
  }, {
    path: '/ratings',
    component: Ratings
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

