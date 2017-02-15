 // localstorage存储
let storage = (function() {
  return {
    fetch: function(Key, def) {
      return JSON.parse(window.localStorage.getItem(Key)) || def
    },
    save: function(Key, item) {
      window.localStorage.setItem(Key, JSON.stringify(item))
    }
  }
})()

// 简单的深度拷贝,只是为了拷贝默认数据模板,平时不该用这种深拷贝,因为会丢失对象的很多信息
let deepCopy = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export {storage, deepCopy}
