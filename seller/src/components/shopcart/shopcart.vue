<template>
    <div class="shopcart">
      <div class="content" >
        <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
            </div>
            <div class="count" v-show="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalPrice>0}">¥ {{totalPrice}}</div>
          <div class="description">另需配送费¥ {{deliverPrice}}元</div>
        </div>
        <div class="content-right" @click="payMoney">
          <div class="pay" :class="payClass" >{{payState}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="cleanList">清除</span>
          </div>
          <div class="list-content" ref="content">
            <ul>
              <li class="food" v-for="food in selectFoods" >
                <span class="name">{{food.name}}</span>
                <span class="price">
                  ¥{{food.count*food.price}}
                </span>
                <div class="control-wrapper">
                  <control :food="food"></control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="list-fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
      </transition>
      <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="balls" v-show="balls.show">
      <div class="inner"></div>
      </div>
      </transition>
    </div>
</template>

<script>
import control from 'components/control/control.vue'
import BScroll from 'better-scroll'
/* 数据: selectFoods => count>0的食物数据
        deliverPrice => 平均价格,默认为0
        minPrice     => 最低运送价格,默认为0
        fold         => 购物车的列表状态
        balls        => 购物车小球动画
  功能: 根据父组件的数据,处理相应的数据逻辑,映射出内容 */
export default{
  data() {
    return {
      fold: true,
      dropBalls: [],
      balls: {
        show: false
      }
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default: function() {
        return []
      }
    },
    deliverPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 购买总价
    totalPrice() {
      let price = 0
      this.selectFoods.forEach((item) => {
        price += item.price * item.count
      })
      return price
    },
    // 购物总数
    totalCount() {
      let count = 0
      this.selectFoods.forEach((item) => {
        count += item.count
      })
      return count
    },
    // 支付状态
    payState() {
      let diff = this.minPrice - this.totalPrice
      if (this.totalPrice === 0) {
        return `¥ ${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥ ${diff}元起送`
      } else {
        return `去结算`
      }
    },
    // 支付样式
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    // 列表的展示,并初始化
    listShow() {
      if (this.totalCount === 0) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.content, {
              click: true,
              onRefresh: function() {
              }
            })
          } else {
            this.scroll.refresh()
          }
        })
      }
      return show
    }
  },
  methods: {
    // 列表按钮
    toggleList() {
      if (!this.totalCount) return
      this.fold = !this.fold
    },
    // 清除列表
    cleanList() {
      this.selectFoods.forEach(item => {
        item.count = 0
      })
      this.fold = true
    },
    // 隐藏列表
    hideList() {
      this.fold = true
    },
    // 最终支付价格
    payMoney() {
      if (this.totalPrice < this.minPrice) return false
      window.alert(`一共支付${this.totalPrice}元`)
      this.hideList()
    },
    // 小球动画
    drop(el) {
      this.balls.show = true
      this.balls.el = el
    },
    // 计算小球与购物车的X和Y距离,外层执行Y变化,内层执行X变化
    beforeEnter(el) {
      let rect = this.balls.el.getBoundingClientRect()
      let x = (rect.left - 32)
      let y = -(window.innerHeight - rect.top - 22)
      el.style.display = ''
      el.style.transform = `translateY(${y}px)`
      let inner = el.getElementsByClassName('inner')[0]
      inner.style.transform = `translateX(${x}px)`
    },
    enter(el) {
      // 浏览器重绘
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.transform = 'translateY(0)'
        let inner = el.getElementsByClassName('inner')[0]
        inner.style.transform = 'translateX(0)'
      })
    },
    afterEnter(el) {
      this.balls.show = false
      el.style.display = 'none'
    }
  },
  components: {
    control
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins"
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 111
    width 100%
    height 48px
    .content
      display flex
      color rgba(255, 255, 255, 0.4)
      background-color #141d27
      height 48px
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          box-sizing border-box
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          vertical-align top
          border-radius 50%
          background-color #141d27
          .logo
            text-align center
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            &.highlight
              background-color rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 46px
              font-size 24px
              color #80858a
              &.highlight
                color #fff
          .count
            position absolute
            text-align center
            top 0
            right 0
            width 24px
            line-height 16px
            font-size 9px
            border-radius 12px
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0px rgba(0, 0, 0, 0.4)
        .price
          box-sizing border-box
          display inline-block
          vertical-align top
          margin-top 12px
          padding-right 12px
          line-height 24px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .description
          display inline-block
          margin 12px 0 0 12px
          vertical-align top
          font-size 10px
          line-height 24px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          line-height 48px
          font-size 12px
          text-align center
          font-weight 700
          &.enough
            background-color #00b43c
            color #fff
          &.not-enough
            background-color #2b333b
    .balls
      position fixed
      left 32px
      bottom 22px
      z-index 199
      transition all 0.4s cubic-bezier(.5,-0.31,0.75,0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background-color rgb(0, 160, 220)
        transition all 0.4s linear
    .shopcart-list
      position absolute
      left 0
      bottom 48px
      width 100%
      z-index -1
      .list-header
        padding 0 18px
        line-height 40px
        height 40px
        background-color #f3f5f7
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          display inline-block
          float right
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        padding 0 18px
        max-height 217px
        overflow hidden
        background-color #fff
        .food
          position relative
          padding 12px 0
          height 48px
          box-sizing border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height 24px
            font-size 14px
            color rgb(7, 17, 27)
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 14px
            color rgb(240, 20, 20)
            font-weight 700
          .control-wrapper
            position absolute
            right -8px
            bottom 4px
    .list-mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index -2
      backdrop-filter: blur(10px)
      background-color rgba(7, 17, 27, 0.6)
    .list-fade-enter-active,.list-fade-leave-active
      transition all 0.3s
    .list-fade-enter,.list-fade-leave-active
      opacity 0
    .fold-enter-active,.fold-leave-active
      transition all 0.3s ease
      transform translateZ(0)
    .fold-enter,.fold-leave-active
      transform translateY(100%)

</style>
