import Vue from 'vue'
import {storage} from 'common/js/util'

// 本地数据存储
const bus = new Vue({
  data: {
    store: storage.fetch('qusList', [])
  },
  watch: {
    store: function(value) {
      storage.save('qusList', value)
    }
  }
})

export default bus
