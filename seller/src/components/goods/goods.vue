<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li
        v-for="(item,index) in goods"
        class="menu-item"
        @click = "selectMenu(index, $event)"
        :class = "{active: currentIndex === index  }">
          <span class="text border-1px">
          <icon :size="3" :type="item.type"></icon>
          {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li
            @click="selectedFood(food,$event)"
            v-for="food in item.foods"
            class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="description">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span >好评率{{food.sellCount}}%</span>
                </div>
                <div class="price">
                  <span class="new">¥ {{food.price}}</span><span class="old" v-if='food.oldPrice'>¥ {{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <control :food="food" @add-ball="addBall"></control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
    :deliver-price = "seller.deliveryPrice"
    :min-price = "seller.minPrice"
    :select-foods ="selectFoods"
    ref="shopcart">
    </shopcart>
    <food-detail
    :food="foodDetail"
    ref="foodDetail"
    @add-ball='addBall'>
    </food-detail>
  </div>
</template>
<script >
import BScroll from 'better-scroll'
import icon from 'components/icon/icon.vue'
import shopcart from 'components/shopcart/shopcart.vue'
import control from 'components/control/control.vue'
import foodDetail from 'components/foodDetail/foodDetail.vue'

const ERR_OK = 0

/* 数据: goods      => goods数据
         listHeight => 各个区块的高度数据
         scrollY    => 当前滚动的距离
         foodDetail => 当前选择的食品详情页        */
export default{
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      foodDetail: {}
    }
  },
  props: {
    seller: {
      type: Object,
      required: true
    }
  },
  created() {
    this.$http.get('api/goods').then((res) => {
      res = res.data
      if (res.errno === ERR_OK) {
        this.goods = res.data
        this.$nextTick(() => {
          this.initScroll()
          this.computeHeight()
        })
      }
    })
  },
  methods: {
    // 点击左侧菜单，右侧同步滚动到相应的区块
    selectMenu(index, event) {
      // 滚动插件是自己派发事件的,pc端会有原生事件,禁止执行两次
      if (!event._constructed) return
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    // 点击食物区块, 展示食物详情子组件
    selectedFood(food, event) {
      if (!event._constructed) return
      this.foodDetail = food
      this.$refs.foodDetail.show()
    },
    // 初始化滚动库
    initScroll() {
      // 左侧餐单
      this.menuScroll = new BScroll(this.$refs.menu, {
        click: true
      })
      // 右侧食物
      this.foodScroll = new BScroll(this.$refs.foods, {
        probeType: 3,
        click: true
      })
      // 监听右侧滚动事件,保存滚动距离
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    // 计算右侧不同区块的高度
    computeHeight() {
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.listHeight.push(height)
      }
    },
    /* 监听control组件触发的事件,参数为按钮的DOM
        然后调用子组件shopcart的方法,实质就是兄弟组件之间的通信 */
    addBall(target) {
      // 异步执行动画,性能优化
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    }
  },
  computed: {
    // 根据滚动距离,计算出左侧菜单的index
    currentIndex() {
      for (let i = 0; i < this.listHeight.length - 1; i++) {
        if (this.scrollY >= this.listHeight[i] && this.scrollY < this.listHeight[i + 1]) {
          return i
        }
      }
    },
    // 筛选出count>0 food数据,传入到shopcart组件
    selectFoods() {
      let foodList = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count > 0) {
            foodList.push(food)
          }
        })
      })
      return foodList
    }
  },
  components: {
    icon,
    shopcart,
    control,
    foodDetail
  }
}
</script>

<style lang="stylus">
@import "../../common/stylus/mixins"
f-color = rgb(147, 153, 159)
  .goods
    display flex
    position absolute
    width 100%
    top 174px
    bottom 46px
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        padding 0 12px
        width 56px
        height 54px
        font-size 0
        &.active
          position relative
          background-color #fff
          margin-top -1px
          z-index 8
          .text
            font-weight 700
            border 0
            &::after
              display none
        .text
          display table-cell
          width 56px
          vertical-align middle
          line-height 14px
          font-size 12px
          color rgb(240, 20, 20)
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        line-height 26px
        height 26px
        font-size 12px
        color f-color
        background-color #f3f5f7
        border-left 2px solid #d9dde1
      .food-item
        display flex
        padding 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
         &::after
          display none
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          position relative
          .name
            margin: 2px 0 8px 0
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .description,.extra
            line-height 10px
            font-size 10px
            color f-color
          .description
            line-height 12px
            margin-bottom 8px
          .extra
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
              color f-color
          .control-wrapper
            position absolute
            right -6px
            bottom -6px

</style>
