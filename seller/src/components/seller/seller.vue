<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="description">
          <star :size="36" :score="seller.score"></star>
          <span class="rank">({{seller.ratingCount}})</span>
          <span class="count">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="price">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h1 class="title">商家配送</h1>
            <div class="content">
              <span class="price">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="price">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span
          class  ="icon-favorite"
          :class ="{active:isFavorite}"
          @click ="toggleFavorite">
          </span>
          <span
          class  ="text"
          :class ="{active:isFavorite}">
          {{favoriteText}}
          </span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="support">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <icon :size = "4" :type= "index"></icon>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pictures" >
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="pictures">
          <ul class="list" ref="list">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info border-1px">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item border-1px" v-for="item in seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script >
import BScroll from 'better-scroll'
import star from 'components/star/star.vue'
import split from 'components/split/split.vue'
import icon from 'components/icon/icon.vue'

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

/* 数据: isFavorite => 商家收藏的状态
  功能： 展示商家具体信息 */
export default{
  data() {
    return {
      isFavorite: storage.fetch('favorite', false)
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  methods: {
    toggleFavorite(event) {
      if (!event._constructed) return
      this.isFavorite = !this.isFavorite
      storage.save('favorite', this.isFavorite)
    }
  },
  computed: {
    favoriteText() {
      return this.isFavorite === true ? '已收藏' : '收藏'
    }
  },
  created() {
    let picWidth = 120
    let margin = 6
    let width = (picWidth + margin) * this.seller.pics.length - margin
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      })
      this.$refs.list.style.width = width + 'px'
      this.picScroll = new BScroll(this.$refs.pictures, {
        scrollX: true,
        eventPassthrough: true
      })
    })
  },
  components: {
    star,
    split,
    icon
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins'
  .seller
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .overview
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .description
        padding-bottom 18px
        line-height 18px
        font-size 0
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          vertical-align top
        .rank,.count
          display inline-block
          vertical-align top
          font-size 10px
          color rgb(77, 85, 93)
        .rank
          margin-left 8px
        .count
          margin-left 12px
      .remark
        display flex
        padding-top 18px
        font-size 0
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border none
          .title
            margin-bottom 4px
            font-size 10px
            color rgb(147, 153, 159)
          .content
            line-height 24px
            font-size 10px
            color rgb(7, 17, 27)
            .price
              font-size 24px
      .favorite
        position absolute
        width 50px
        top 18px
        right 11px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          font-size 10px
          line-height 10px
          color rgb(77, 85, 93)
    .bulletin
      padding 18px 18px 0 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .content-wrapper
        padding 0 12px 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height 24px
          font-size 12px
          color rgb(240, 20, 20)
      .support
        .support-item
          padding 16px 12px
          font-size 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            &::after
              border none
          .text
            display inline-block
            vertical-align top
            font-size 12px
            line-height 16px
            color rgb(7, 17, 27)
    .pictures
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7, 17, 27)
      .pic-wrapper
        overflow hidden
        width 100%
        white-space nowrap
        .list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin-right 0
    .info
      padding 18px 18px 0 18px
      .title
        padding-bottom 12px
        border-1px(rgba(7, 17, 27, 0.1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        color rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          &::after
            border none



</style>
