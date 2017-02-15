import Vue from 'vue'
import App from './App'
import 'common/scss/index.scss'
import router from './router/router.js'

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')

// focus全局指令,用于直接聚焦在input元素上
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
