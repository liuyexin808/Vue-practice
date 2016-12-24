`<template>
  <div class="star" :class="starType">
    <span
      v-for="item in itemClasses"
      :class="item"
      class="star-item">
    </span>
  </div>
</template>

<script>
const LENGTH = 5        // 星星的个数
const CAL_ON = 'on'     // 全星
const CAL_OFF = 'off'   // 零星
const CAL_HALF = 'half' // 半星

/* 数据: score => 商家的评分
         size  => 星星的尺寸大小
  功能: 根据数据显示不同的星星样式   */
export default {
  props: {
    score: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let int = Math.floor(score)
      let hasHalf = score % 1 !== 0
      for (let i = 0; i < int; i++) {
        result.push(CAL_ON)
      }
      if (hasHalf) {
        result.push(CAL_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CAL_OFF)
      }
      return result
    }
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins'

  .star
    font-size 0
    .star-item
      display inline-block
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on', @width, @height)
        &.off
          bg-image('star24_off', @width, @height)
        &.half
          bg-image('star24_half', @width, @height)
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on', @width, @height)
        &.off
          bg-image('star36_off', @width, @height)
        &.half
          bg-image('star36_half', @width, @height)
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on', @width, @height)
        &.off
          bg-image('star48_off', @width, @height)
        &.half
          bg-image('star48_half', @width, @height)
</style>
