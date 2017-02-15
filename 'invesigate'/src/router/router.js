import VueRouter from 'vue-router'
import Vue from 'vue'
import View from 'components/view/view'
import Manage from 'components/manage/manage'
import Fill from 'components/fill/fill'
import Edit from 'components/edit/edit'
Vue.use(VueRouter)

const routes = [
  {
    path: '/view',
    component: View
  },
  {
    path: '/manage',
    component: Manage
  },
  {
    path: '/fill',
    component: Fill
  },
  {
    path: '/edit',
    component: Edit
  }
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

export default router

