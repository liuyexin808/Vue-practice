<template>
  <div class="edit">
    <div class="question-title" >
      <edit-text
      :text="question.title"
      @editText="editTitle">
        {{question.title}}
      </edit-text>
    </div>
    <div class="line"></div>
    <div class="edit-question-wrapper">
      <ul>
        <li class="question-content" v-for='(item,index) in question.contents'>
          <span class="sign">Q{{index+1}}</span>
          <topic :topic="item"></topic>
          <control
          :contents='question.contents'
          :selectIndex="index"></control>
        </li>
      </ul>
      <div class="add-question">
        <transition name='fold'>
          <div class="select-type" v-show="!fold">
          <div class="select-btn" @click="addTopic('radio')">
            <i class="icon-radio_fill"></i>单选
          </div>
          <div class="select-btn" @click="addTopic('checkbox')">
            <i class="icon-checkbox_fill"></i>多选
          </div>
          <div class="select-btn" @click="addTopic('textarea')">
            <i class="icon-text"></i>文本
          </div>
          </div>
        </transition>
        <div class="add-btn" @click="fold = !fold">
          <span>+</span>
          <span>添加问题</span>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="edit-foot-wrapper">
      <div class='edit-foot'>
        <div class="end-date">
          问卷截止日期
          <calendar
          :date="question.date"
          @getDate="getDate"
          ref="calendar">
          </calendar>
        </div>
        <div class="btn-wrapper">
          <button class="btn" @click="reserveQus">保存问卷</button>
          <button class="btn" @click="releaseQus">发布问卷</button>
        </div>
      </div>
    </div>
    <modal ref='modal' :showCancel="showCancel" :text="text"></modal>
  </div>
</template>
<script>
import gobal from 'store/bus'
import editText from 'components/editText/editText'
import topic from 'components/topic/topic'
import control from 'components/control/control'
import modal from 'components/modal/modal'
import calendar from 'components/calendar/calendar'
import {topicData, qusData} from 'common/js/template'
import {deepCopy} from 'common/js/util'
export default {
  data() {
    return {
      // 问卷数据模块
      question: null,
      // 查询参数
      query: null,
      // 控制添加题目选项
      fold: true,
      showCancel: false,
      text: ''
    }
  },
  created() {
    this.query = this.$route.query.index
    // 没有查询参数就是默认数据模板
    this.question = this.query === undefined ? deepCopy(qusData) : deepCopy(gobal.store[this.query])
  },
  methods: {
    // 编辑问卷标题
    editTitle(value) {
      this.question.title = value
    },
    // 添加不同的题目数据
    addTopic(type) {
      if (this.question.contents.length > 9) {
        this.text = '问卷内容最多为10题'
        this.alertModal()
        return
      }
      let temp = deepCopy(topicData[type])
      this.question.contents.push(temp)
    },
    // 保存问卷
    reserveQus() {
      this.setQus('noRelease')
      this.text = '保存成功'
      this.alertModal()
    },
    // 发布问卷
    releaseQus() {
      const date = new Date().getTime()
      if (date > this.question.date) {
        this.text = '截止日期没有选择或小于当前时间'
        this.alertModal()
        return
      } else if (this.question.contents.length < 1) {
        this.text = '问卷内容不得为空'
        this.alertModal()
        return
      } else {
        this.text = `是否发布问卷?<br/>( 此问卷截止日期为 ${this.$refs.calendar.message} )`
        this.confirmModal()
      }
    },
    // 获取日历组件的数据
    getDate(time) {
      this.question.date = time
    },
    alertModal() {
      this.showCancel = false
      this.$refs.modal.show().catch(() => {})
    },
    confirmModal() {
      this.showCancel = true
      this.$refs.modal.show().then(() => {
        this.setCount()
        this.setQus('release')
        this.$router.push('/manage')
      }).catch(() => {})
    },
    // 全局保存数据
    setQus(state) {
      this.question.state = state
      let data = deepCopy(this.question)
      // 如果没有查询参数,全局添加数据,否则修改其数据
      if (this.query === undefined) {
        this.query = gobal.store.length
        return gobal.store.push(data)
      } else {
        return gobal.store.splice(this.query, 1, data)
      }
    },
    // 添加填写问卷和查看问卷所需要的数据模板
    setCount() {
      this.question.contents.forEach(item => {
        let count = item.type === 'textarea' ? [0, 0]
        // 初始化数组,长度为选项的总数,用于记录被选择的次数
        : Array.from({length: item.options.length}, v => 0)
        // 对象添加属性应该使用set方法,不然无法实现响应
        this.$set(item, 'counts', count)
      })
    }
  },
  components: {
    editText,
    topic,
    control,
    modal,
    calendar
  }
}
</script>

<style lang='scss'>
@import '../../common/scss/mixin';
.edit {
  width: 95%;
  margin: 0 auto;
  .edit-question-wrapper {
    padding: 20px;
    @at-root .add-question {
      width: 100%;
      text-align: center;
      .fold-enter-active,
      .fold-leave-active {
        transition: all 0.8s;
        transform: translate3d(0,0,0);
      }
      .fold-enter,
      .fold-leave-active {
        transform: translate3d(0, 100%, 0);
      }
      .select-type {
        display: flex;
        padding: 10px 0;
        align-items: center;
        justify-content: center;
        height: 50px;
        border: 1px solid rgb(208, 208, 208);
        border-bottom: none;
        z-index: -1;
        .select-btn {
          @include btn(100px, 35px)
          margin-right: 30px;
          line-height: 35px;
          font-size: 14px;
          @media only screen and (max-width: 737px) {
            & {
              @include btn(80px, 35px)
              margin-right: 10px;
            }
          }
          &:last-child {
            margin: 0;
          }
          i {
            margin-right: 5px;
          }
        }
      }
      .add-btn {
        padding: 10px 0;
        line-height: 70px;
        height: 70px;
        background-color: #eee;
        border: 1px solid rgb(208, 208, 208);
        border-top: none;
        cursor: pointer;
        transform: translateZ(0);
        z-index: 60;
        span:first-child {
          display:inline-block;
          vertical-align: top;
          font-size: 40px;
        }
        span:last-child {
          position: relative;
          top: 2px;
          font-size: 20px;
        }
      }

    }
  }
  .question-content {
    display: flex;
    position: relative;
    padding: 15px 15px 30px 15px;
    margin-bottom: 10px;
    &:hover {
      background-color: #fdf1e6;
      .control {
        visibility: visible;
      }
      .sign,.title {
        font-weight: bold
      }
    }
    .sign {
      padding: 8px 10px 0 5px;
    }
    .control {
      position: absolute;
      bottom: 10px;
      right: 0;
    }
  }
  .edit-foot-wrapper {
    width: 85%;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 30px 0 50px 0;
    .end-date {
      display: inline-block;
    }
    .btn-wrapper {
      float: right;
      margin-right: 70px;
      .btn {
        @include btn(80px,30px);
        margin-right: 10px
      }
    }
  }
}
</style>
