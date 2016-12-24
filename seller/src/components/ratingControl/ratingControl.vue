<template>
  <div class="rating-control">
    <div class="rating-type">
      <span
      class  ="block positive"
      :class ="{active: selectType === 2}"
      @click ="select(2, $event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span
      class  ="block positive"
      :class ="{active: selectType === 0}"
      @click ="select(0, $event)">
        {{desc.positive}}
        <span class="count">{{ratings | splitRating(0)}}</span>
      </span>
      <span
      class  ="block negative"
      :class ="{active: selectType === 1}"
      @click ="select(1, $event)">
        {{desc.negative}}
      <span class="count">{{ratings | splitRating(1)}}</span>
      </span>
    </div>
    <div
    class  ="switch"
    :class ="{on:onlyContent}"
    @click = "toggleContent">
      <span class="icon-check_circle"></span>
      <span class="text">只看有评价的内容</span>
    </div>
  </div>
</template>

<script >
/* 功能: 处理父组件selectType和onlyContent数据逻辑
   注意：子组件并不能直接改变父组件的数据,只能触发事件,传入相应的参数,
         然后父组件去监听事件,接受参数 */
export default{
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      require: true
    },
    onlyContent: {
      type: Boolean,
      require: true
    }
  },
  methods: {
    // 触发事件,传给父组件selectType数据,
    select(type, event) {
      if (!event._constructed) return
      this.$emit('updataType', type)
    },
    // 触发事件,传给父组件onlyConent数据
    toggleContent(event) {
      if (!event._constructed) return
      this.$emit('updataContent', !this.onlyContent)
    }
  },
  // 过滤出不同类型的评价长度
  filters: {
    splitRating(ratings, type) {
      return ratings.filter(rating => {
        return rating.rateType === type
      }).length
    }
  }
}
</script>
<style lang="stylus">
@import '../../common/stylus/mixins'
  .rating-control
    .rating-type
      padding 18px 0
      margin 0 18px
      font-size 0
      border-1px(rgba(7, 17, 27, 0.1))
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        line-height 16px
        border-radius 1px
        font-size 12px
        &.active
          color #fff
        &.positive
          background-color rgba(0, 160, 200, 0.2)
          &.active
            background-color rgb(0, 160, 200)
        &.negative
          background-color rgba(77, 85, 93, 0.2)
          &.active
            background-color rgb(77, 85, 93)
        .count
          font-size 8px
          margin-left 2px
    .switch
      padding 12px 18px
      line-height 24px
      font-size 0
      border-bottom 1px solid rgba(7, 17, 27, 0.2)
      color rgb(147, 153, 159)
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px



</style>
