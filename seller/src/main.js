import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router/router'
import 'common/stylus/index'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')
