import Vue from 'vue'
import App from './App.vue'
var resource = require('vue-resource');
Vue.use(resource);

new Vue({
  el: '#app',
  render: h => h(App)
})
