<template>
  <div class="ratings" ref="ratings">
   <div class="ratings-content">
      <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :score="seller.serviceScore" :size="36"></star>
          <span class="score"> {{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :score="seller.foodScore" :size="36"></star>
          <span class="score"> {{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <rating-control
    :ratings       ="ratings"
    :only-content  ="onlyContent"
    :select-type   ="selectType"
    @updataType    ="updataType"
    @updataContent ="updataContent"
    >
    </rating-control>
    <div class="rating-wrapper">
      <ul>
        <li v-for="rating in filterList" class="rating-item">
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text" >{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
              <i class="icon-thumb_up"></i>
              <span v-for="item in rating.recommend" class="item">{{item}}</span>
            </div>
            <div class="time">{{rating.rateTime | format}}</div>
          </div>
        </li>
      </ul>
    </div>
   </div>
  </div>
</template>

<script >
import BScroll from 'better-scroll'
import star from 'components/star/star.vue'
import split from 'components/split/split.vue'
import ratingControl from 'components/ratingControl/ratingControl.vue'
import {formatDate} from 'common/js/format'
const ERR_OK = 0

const otype = ['positive', 'negative', 'all']

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
// 和goods组件一样,评价相关的数据,只是具体样式不同
export default{
  data() {
    return {
      ratings: [],
      selectType: 2,
      onlyContent: true
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.ratings = res.data
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      }
    })
  },
  computed: {
    filterList() {
      const type = otype[this.selectType]
      const list = filter[type](this.ratings)
      if (this.onlyContent) {
        return list.filter(item => {
          return item.text !== ''
        })
      } else {
        return list
      }
    }
  },
  methods: {
    updataType(number) {
      this.selectType = number
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    updataContent(bollean) {
      this.onlyContent = bollean
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    }
  },
  filters: {
    format(time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  },
  components: {
    star,
    split,
    ratingControl
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins'
  .ratings
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px
        width 137px
        text-align center
        border-right 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex 0 0 110px
          width 110px
        .score
          margin-bottom 6px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width: 320px)
          padding-left 6px
      .score-wrapper
        margin-bottom 8px
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .star
          display inline-block
          vertical-align top
          margin 0 12px
        .score
          display inline-block
          vertical-align top
          line-height 18px
          font-size 12px
          color rgb(255, 153, 0)
      .delivery-wrapper
        font-size 0
        .title
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
        .delivery-time
          margin-left 12px
          font-size 12px
          color rgb(147, 153, 159)
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery-time
              display inline-block
              vertical-align top
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            font-size 12px
            color rgb(7, 17, 27)
          .recommend
            margin-top 8px
            line-height 16px
            font-size 0
            .icon-thumb_up,.item
              display inline-block
              margin: 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 1px
              color rgb(147, 153, 159)
              background-color #fff
          .time
            position absolute
            right 0
            top 0
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)

</style>
