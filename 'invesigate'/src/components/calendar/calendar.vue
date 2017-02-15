<template>
  <div class="calendar" >
    <input class="message" type="text"
    v-model='message'
    @click="flag = true"
    readonly="readonly">
    <transition name='move'>
    <div class="calendar-wrapper" v-show="flag">
      <div class="calendar-date" v-show=" state === 'date'">
        <div class="preview">
          <i class="left-triangle" @click="previewDate(-1)"></i>
          <span class="year-month" @click="toggleState('month')">{{`${y}年${M}月`}}</span>
          <i class="right-triangle" @click="previewDate(1)"></i>
        </div>
        <ul class="date-list" >
          <li class="week-wrapper">
            <span class='week' v-for="item in weekList">{{item | week}}</span>
          </li>
          <li class="date"
          v-for='(date,index) in dateList'
          :class="{noNow:date.type !== 'now',active: date.value === d && date.type === 'now'}"
          @click="selectDate(index)">
            {{date.value}}
          </li>
        </ul>
      </div>
      <div class="calendar-month" v-show="state === 'month'">
        <div class="preview">
          <i class="left-triangle" @click="previewMonth(-1)"></i>
          <span class="year-month" @click="toggleState('date')">{{`${y}年`}}</span>
          <i class="right-triangle" @click="previewMonth(1)"></i>
        </div>
        <ul class="month-list" v-show='state === "month"'>
          <li class="month"
          :class="{active: month === M}"
          v-for="(month,index) in monthList"
          @click="selectMonth(index)"
          >
            {{month+'月'}}
          </li>
        </ul>
      </div>
    </div>
    </transition>
    <!-- 透明层用于点击,消失日历 -->
    <div class="disappear" v-show="flag" @click="flag = false"></div>
   </div>
</template>
<script>
import {formatDate} from 'common/js/formatDate'
export default {
  // 时间戳
  props: ['date'],
  data() {
    return {
      // 根据状态切换对应模板
      state: 'date',
      y: this.nowDate.getFullYear(),
      M: this.nowDate.getMonth() + 1,
      d: this.nowDate.getDate(),
      h: this.nowDate.getHours(),
      m: this.nowDate.getMinutes(),
      s: this.nowDate.getSeconds(),
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      weekList: [0, 1, 2, 3, 4, 5, 6],
      flag: false
    }
  },
  computed: {
    // 天数列表为 7x6
    dateList() {
      // 计算当月一共有几天
      let dateLength = new Date(this.y, this.M, 0).getDate()
      // 创建对应的数组
      let dateList = Array.from({length: dateLength}, (x, i) => {
        return {
          type: 'now',
          value: i + 1
        }
      })
      // 计算上个月一共有几天
      let lastDateLength = this.M === 1
      ? new Date(this.y - 1, 12, 0).getDate()
      : new Date(this.y, this.M - 1, 0).getDate()
      // 计算当月第一天是星期几
      let firstDay = new Date(this.y, this.M - 1, 1).getDay()
      // 填充完上个月的天数
      for (let i = 0, len = firstDay === 0 ? 7 : firstDay; i < len; i++) {
        dateList.unshift({
          type: 'last',
          value: lastDateLength - i
        })
      }
      // 填出完下个月的天数
      for (let i = 1, len = dateList.length; len < 42; len++, i++) {
        dateList.push({
          type: 'next',
          value: i
        })
      }
      return dateList
    }
  },
  methods: {
    // 点击改变状态
    toggleState(state) {
      this.state = state
    },
    // 浏览上个月或下个月的日期
    previewDate(index) {
      this.M += index
    },
    // 浏览上一年或下一年的月份
    previewMonth(index) {
      this.y += index
    },
    // 选择日期,并显示在input上
    selectDate(index) {
      let date = this.dateList[index]
      if (date.type === 'last') {
        this.M -= 1
      } else if (date.type === 'next') {
        this.M += 1
      }
      this.d = date.value
      this.flag = false
      this.setMessage()
    },
    // 选择月份,改变状态为date
    selectMonth(index) {
      this.M = this.monthList[index]
      this.state = 'date'
    },
    // 格式化Date,并发送事件给父组件
    setMessage() {
      let date = new Date(this.y, this.M - 1, this.d, this.h, this.m, this.s)
      this.message = formatDate(date, 'yyyy-MM-dd')
      this.$emit('getDate', date.getTime(), formatDate(date, 'yyyy-MM-dd hh:mm:ss'))
    }
  },
  // 根据prop初始化Date
  beforeCreate() {
    this.nowDate = this.date ? new Date(this.date) : new Date()
  },
  // 根据prop初始化message
  created() {
    this.message = this.date ? formatDate(new Date(this.date), 'yyyy-MM-dd') : ''
  },
  // 监听月份, 改变对应年份
  watch: {
    M: function(value) {
      if (value > 12) {
        this.y += 1
        this.M = 1
      } else if (value < 1) {
        this.y -= 1
        this.M = 12
      }
    }
  },
  filters: {
    week (value) {
      return [ '日', '一', '二', '三', '四', '五', '六' ][value]
    }
  }
}
</script>

<style lang="scss">
@import "../../common/scss/mixin";
$wd: 250px;
$hg: 250px;
$h-hg: 35px;
$d-hg: 195px;
$m-hg: 215px;

.calendar-wrapper {
  @include bd($wd, $hg);
  position: absolute;
  font-size: 14px;
  cursor: default;
  z-index:88;
  .active {
    background: rgb(238, 116, 25);
    color: #fff;
    font-weight: bold
  }
  .preview {
      color: #fff;
      text-align: center;
      height: $h-hg;
      line-height: $h-hg;
      position: relative;
      background-color: #e77408;
      .year-month {
        cursor: pointer;
      }
      .left-triangle {
        position: absolute;
        top: 10px;
        left: 15px;
        width: 0;
        height: 0;
        border-top: 6px solid transparent;
        border-right: 8px solid #fff;
        border-bottom: 6px solid transparent;
        cursor: pointer;
      }
      .right-triangle {
        position: absolute;
        top: 10px;
        right: 15px;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 8px solid #fff;
        border-bottom: 5px solid transparent;
        cursor: pointer;
      }
  }
  .date-list {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    .week-wrapper {
      margin-top:-1px;
      height: 20px;
      display: flex;
      background-color: #e77408;
      color: #fff;
      .week {
        width: $wd/7;
      }
    }
    .date {
      width: $wd/7-0.1px ;
      height: $d-hg/6;
      line-height: $d-hg/6;
      cursor: pointer;
      &:hover {
        background-color: rgba(238, 116, 25, 0.8);
        color: #fff;
        font-weight: bold;
      }
      &.noNow {
        color: #eee;
      }
    }
  }
  .month-list {
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    background: #fff;
    .month {
      line-height: $m-hg/3;
      width: $wd/4;
      height: $m-hg/3;
      cursor: pointer;
      &:hover {
        background-color: rgba(238, 116, 25, 0.8);
        color: #fff;
        font-weight: bold;
      }
    }
  }
}
.calendar {
  display: inline-block;
  position: relative;
  .message {
    font-size: 14px;
    width: 250px;
    height: 30px;
    text-indent: 10px;
    cursor: pointer;
  }
  .move-enter-active,.move-leave-active {
    transition: all 0.5s
  }
  .move-enter,.move-leave-active {
    transform: translateY(30px);
    opacity: 0.5;
  }
  .disappear {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20
  }
}
</style>
