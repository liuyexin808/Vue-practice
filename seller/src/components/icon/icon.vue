<template>
  <span v-if="type > -1"  :class="[icon,iconClass]"></span>
</template>

<script>
/* 数据: type => icon的样式
         size => icon的尺寸
  功能: 根据数据显示不同的icon样式 */
  export default{
    props: {
      size: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      iconClass() {
        return this.classMap[this.type]
      },
      icon() {
        return 'icon_' + this.size
      }
    }
  }
</script>

<style lang="stylus" >
@import '../../common/stylus/mixins'
  .icon_1
    display inline-block
    vertical-align top
    width 12px
    height 12px
    margin-right 4px
    &.decrease
      bg-image('decrease_1', @width, @height)
    &.discount
      bg-image('discount_1', @width, @height)
    &.special
      bg-image('special_1', @width, @height)
    &.guarantee
      bg-image('guarantee_1', @width, @height)
    &.invoice
      bg-image('invoice_1', @width, @height)
  .icon_2
    display inline-block
    vertical-align top
    width 16px
    height 16px
    margin-right 6px
    &.decrease
      bg-image('decrease_2', @width, @height)
    &.discount
      bg-image('discount_2', @width, @height)
    &.special
      bg-image('special_2', @width, @height)
    &.guarantee
      bg-image('guarantee_2', @width, @height)
    &.invoice
      bg-image('invoice_2', @width, @height)
  .icon_3
    display inline-block
    vertical-align top
    width 12px
    height 12px
    margin-right 2px
    &.decrease
      bg-image('decrease_3', @width, @height)
    &.discount
      bg-image('discount_3', @width, @height)
    &.special
      bg-image('special_3', @width, @height)
    &.guarantee
      bg-image('guarantee_3', @width, @height)
    &.invoice
      bg-image('invoice_3', @width, @height)
  .icon_4
    display inline-block
    vertical-align top
    width 16px
    height 16px
    margin-right 6px
    &.decrease
      bg-image('decrease_4', @width, @height)
    &.discount
      bg-image('discount_4', @width, @height)
    &.special
      bg-image('special_4', @width, @height)
    &.guarantee
      bg-image('guarantee_4', @width, @height)
    &.invoice
      bg-image('invoice_4', @width, @height)
</style>
