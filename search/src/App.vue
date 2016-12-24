<template>
 <div id="app">
  <search></search>
</div>
</template>

<script>
import search from './components/search-component.vue'
export default {
  name: 'app',
  components:{
    search
  }
}
</script>

<style>

body {
  height: 100vh;
  background: url("./assets/background.png") no-repeat;
  background-size: cover;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
[v-cloak] {
  display: none;
}

</style>
