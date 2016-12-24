import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
Vue.use(VueRouter)

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

export default router
