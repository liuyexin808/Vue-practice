<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <icon :size="1" :type = "seller.supports[0].type"></icon>
          <span class="text">{{seller.supports[0].description}}</span>
          </div>
      </div>
      <div
      v-if   ="seller.supports"
      class  ="support-count"
      @click ="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right" ></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
          <star :size="48" :score="seller.score"></star>
          </div>
          <otitle :text="'优惠信息'"></otitle>
          <ul v-if="seller.supports" class="support">
            <li class="support-item" v-for="(item,index) in seller.supports">
              <icon :size = "2" :type= "index"></icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <otitle :text="'商家公告'"></otitle>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail">
        <i class="icon-close"></i>
      </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'components/star/star.vue'
import title from 'components/title/title.vue'
import icon from 'components/icon/icon.vue'
export default {
  data() {
    return {
      detailShow: false
    }
  },
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 描述详情按钮
    showDetail() {
      this.detailShow = !this.detailShow
    }
  },
  components: {
    star,
    icon,
    otitle: title
  }
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins'
  .header
    position relative
    overflow hidden
    color #fff
    background-color rgba(7, 17, 27, 0.5)
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand', @width, @height)
          .name
            margin-left 6px
            font bold 16px/18px 'sans-serif'
        .description
          margin-bottom 10px
          font-size 10px
          line-height 12px
        .support
          .text
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 14px
        padding 0 8px
        line-height 24px
        border-radius 14px
        height 24px
        background-color rgba(7, 17, 27, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      background-color rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 8px
        width 22px
        height 12px
        bg-image('bulletin', @width, @height)
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        font-size 10px
        right 12px
        top 10px
    .background
      position absolute
      top 0
      left 0
      width: 100%
      height 100%
      filter blur(10px)
      z-index: -999
    .detail
      position fixed
      width 100%
      height 100%
      overflow auto
      z-index 999
      top 0
      left 0
      background-color rgba(7, 17, 27, 0.8)
      .detail-wrapper
        min-height 100%
        width 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star-wrapper
            margin-top 18px
            padding 2px 0
            text-align center
          .support
            width 80%
            margin 0 auto
            .support-item
              margin-bottom 12px
              padding 0 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .text
                font-size 12px
                line-height 16px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              font-size 12px
              line-height 24px
      .detail-close
        font-size 32px
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        .icon-close
          color rgba(255, 255, 255, 0.5)

  .fade-enter-active,
  .fade-leave-active
    transition opacity .5s
  .fade-enter,
  .fade-leave-active
    opacity: 0
</style>
