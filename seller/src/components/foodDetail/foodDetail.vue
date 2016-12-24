<template>
  <transition name="food-move">
    <div class="food-detail" v-show="showFlag" ref="foodDetail">
      <div class="food-content">
        <div class="img-header">
          <img :src="food.image">
          <div @click="hide" class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="new">¥ {{food.price}}</span><span class="old" v-if='food.oldPrice'>¥ {{food.oldPrice}}</span>
          </div>
          <div class="control-wrapper">
            <control :food="food" @add-ball = "addBall" ></control>
          </div>
          <transition name="cart-fade">
            <div
            class       ="cart"
            v-show      ="showCart"
            @click.stop ="addFirst">
            加入购物车</div>
          </transition>
        </div>
        <split v-if="food.info"></split>
        <div class="info" v-if="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-control
          :ratings       ="food.ratings"
          :desc          ="desc"
          :only-content  ="onlyContent"
          :select-type   ="selectType"
          @updataType    ="updataType"
          @updataContent ="updataContent">
          </rating-control>
        </div>
        <div class="rating-wrapper">
          <ul v-if ="food.ratings && food.ratings.length">
            <li v-for ="rating in filterList" class ="rating-item">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img :src="rating.avatar" width="12" height="12">
              </div>
              <div class="time">{{rating.rateTime | format}}</div>
              <p class="text">
                <i
                :class="{
                'icon-thumb_up':rating.rateType   === 0,
                'icon-thumb_down':rating.rateType === 1}">
                </i>
                {{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-else>暂无评论</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import BScroll from 'better-scroll'
import control from 'components/control/control.vue'
import split from 'components/split/split.vue'
import ratingControl from 'components/ratingControl/ratingControl.vue'
import {formatDate} from 'common/js/format'

// 评价的类型选择
const otype = ['positive', 'negative', 'all']

// 根据类型,过滤出数据
const filter = {
  all(ratings) {
    return ratings
  },
  positive(ratings) {
    return ratings.filter(item => {
      return item.rateType === 0
    })
  },
  negative(ratings) {
    return ratings.filter(item => {
      return item.rateType === 1
    })
  }
}

/* 数据 desc        => 评价类型的标题
        selectType  => 评价的类型
        onlyContent => 是否显示内容 */
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      showFlag: false,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      },
      selectType: 2,
      onlyContent: false
    }
  },
  methods: {
    // 显示详情页并初始化
    show() {
      this.showFlag = true
      this.onlyContent = false
      this.selectType = 2
      if (!this.scroll) {
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.foodDetail, {
            click: true
          })
        })
      } else {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    // 隐藏详情页
    hide(event) {
      if (!event._constructed) return
      this.showFlag = false
    },
    // set添加数据,能够被响应,并触发事件给父组件,参数为dom
    addFirst(event) {
      if (!event._constructed) return
      this.$set(this.food, 'count', 1)
      this.$emit('add-ball', event.target)
    },
    // 监听子组件ratingConrtol事件,selectType数据变化
    updataType(number) {
      this.selectType = number
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    // 监听子组件ratingConrtol事件,onlyContent数据变化
    updataContent(bollean) {
      this.onlyContent = bollean
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    addBall(target) {
      this.$emit('add-ball', target)
    }
  },
  computed: {
    // 购物车按钮
    showCart() {
      return !this.food.count || this.food.count === 0
    },
    // 根据selectType和onlyContent数据,过滤出最终的列表
    filterList() {
      const type = otype[this.selectType]
      const list = filter[type](this.food.ratings)
      if (this.onlyContent) {
        return list.filter(item => {
          return item.text !== ''
        })
      } else {
        return list
      }
    }
  },
  // 格式化时间
  filters: {
    format(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    control,
    split,
    ratingControl
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins'
  .food-detail
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background-color #fff
    z-index 1
    .img-header
      position relative
      width 100%
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        top 10px
        left 0
        .icon-arrow_lift
          display block
          padding 15px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        color rgb(147, 153, 159)
        font-size 0
        .count,.rating
          font-size 10px
        .count
          margin-right 12px
      .price
        line-height 24px
        font-weight 700
        .new
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
      .cart
        position absolute
        box-sizing border-box
        line-height 24px
        right 18px
        bottom 18px
        height 24px
        padding 0 12px
        border-radius 24px
        background-color rgb(0, 160, 220)
        color #fff
        font-size 10px
      .control-wrapper
        position absolute
        right 12px
        bottom 12px
    .info
      padding 18px
      .title
        margin-bottom 6px
        font-size 14px
        line-height 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .rating
      padding-top 18px
      width 100%
      .title
        margin-left 18px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
    .rating-wrapper
      padding 0 18px
      .rating-item
        position relative
        padding 16px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .user
          position absolute
          right 0
          top 16px
          font-size 0
          line-height 12px
          .name
            display inline-block
            vertical-align top
            margin-right 6px
            font-size 10px
            color rgb(147, 153, 159)
          .avatar
            border-radius 50%
        .time
          margin-bottom 6px
          line-height 12px
          font-size 10px
          color rgb(147, 153, 159)
        .text
          line-height 16px
          font-size 12px
          color rgb(7, 17, 27)
          .icon-thumb_up,.icon-thumb_down
            margin-right 4px
            line-height 16px
            font-size 12px
          .icon-thumb_up
            color rgb(0, 160, 220)
          .icon-thumb_down
            color rgb(147, 153, 159)
      .no-rating
        padding 16px 0
        font-size 12px
        color rgb(147, 153, 159)



  .food-move-enter-active, .food-move-leave-active
    transition all 0.3s ease
    transform: translateZ(0)
  .food-move-enter, .food-move-leave-active
    transform translateX(100%)
  .cart-fade-enter-active, .cart-fade-leave-active
    transition all 0.4s ease
  .cart-fade-enter, .cart-fade-leave-active
    opacity 0


</style>
