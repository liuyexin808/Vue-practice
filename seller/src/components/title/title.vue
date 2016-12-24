<template>
  <div class="otitle">
    <div class="line"></div>
    <div class="text">{{text}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
/* 数据: text => 标题
  功能: 显示不同标题的样式 */
  export default{
    props: {
      text: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="stylus">
  .otitle
    display flex
    width 80%
    margin 28px auto 24px auto
    .text
      padding 0 12px
      font-size 10px
      font-weight 700
    .line
      flex 1
      position relative
      top -6px
      border-bottom 1px solid rgba(255, 255, 255, 0.2)
</style>
