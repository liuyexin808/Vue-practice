<template>
  <div class="cartcontrol">
  <transition name="move">
      <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCount($event)">
      </div>
  </transition>
      <div class="count" v-show="food.count>0">{{food.count}}</div>
      <div class="add icon-add_circle" @click.stop.prevent="addCount($event)"></div>
    </div>

</template>

<script>
// 功能: 组件复用,处理父组件food的count数据
  export default{
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCount(event) {
        if (!event._constructed) return
        if (!this.food.count) {
          this.$set(this.food, 'count', 0)
        }
        this.food.count++
        this.$emit('add-ball', event.target)
      },
      decreaseCount(event) {
        if (!event._constructed) return
        this.food.count--
      }
    }
  }
</script>

<style lang="stylus">
  .cartcontrol
    font-size 0
    line-height 24px
    .decrease,.add
      display inline-block
      padding 6px
      vertical-align bottom
      font-size 24px
      color rgb(0, 160, 220)
    .count
      display inline-block
      text-align center
      vertical-align bottom
      padding-bottom 6px
      width 12px
      font-size 10px
      color rgb(147, 153, 159)
      font-weight 700
    .move-enter-active,.move-leave-active
      transition all 0.4s linear
      transform translateZ(0)
      transform rotate(180deg)
    .move-enter,.move-leave-active
      opacity 0
      transform translate3d(24px,0,0)


</style>
