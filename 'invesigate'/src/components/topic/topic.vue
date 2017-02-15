<template>
  <div class="topic">
      <editText
      class='title'
      :text="topic.title"
      @editText='editTitle'>
        {{topic.title}}
      </editText>
      <div class="text-type" v-if='topic.type === "textarea"'>
        <div class="textarea"></div>
        <div class="select-flag">
          <i :class="iconClass"
          @click="topic.isFill = !topic.isFill">
          </i>
          <span>此题是否必填</span>
        </div>
      </div>
      <div v-else class="select-type">
        <ul>
          <li class="qus-topic"
          v-for='(option, index) in topic.options'
          @mouseover="changeIndex(index)"
          @mouseout="changeIndex(-1)" >
            <i :class="iconClass"></i>
            <editText
            :text="option.text"
            :index="index"
            @editText='editOption'>
            {{option.text}}
            </editText>
            <span class="remove"
            v-show='removeIndex === index'
            @click="removeOption(index)">&times</span>
          </li>
        </ul>
        <div class="add-option" @click="addOption">
          <div class="inner"> + </div>
        </div>
      </div>
      <modal ref="modal" :showCancel="false">
        <p slot="text">选项不得大于10个</p>
      </modal>
  </div>
</template>

<script>
import editText from 'components/editText/editText'
import modal from 'components/modal/modal'
export default {
  props: ['topic'],
  data() {
    return {
      // remove标识的索引
      removeIndex: -1
    }
  },
  computed: {
    // 题目类型的样式
    iconClass() {
      return {
        'icon-radio': this.topic.type === 'radio',
        'icon-checkbox': this.topic.type === 'checkbox' || this.topic.isFill === false,
        'icon-checkbox_fill': this.topic.isFill
      }
    },
    // 题目选项的数量
    totalCount() {
      return this.topic.options.length
    }
  },
  methods: {
    // 编辑标题
    editTitle(value) {
      this.topic.title = value
    },
    // 编辑选项
    editOption(value, index) {
      this.topic.options[index].text = value
    },
    // 改变remove标识的索引值
    changeIndex(index) {
      this.removeIndex = index
    },
    // 添加选项
    addOption() {
      // 选项不能大于10个
      if (this.totalCount > 9) {
        this.$refs.modal.show().then().catch(() => {})
        return
      }
      let num = [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十' ]
      // 选项的默认内容
      this.topic.options.push({
        text: `选项${num[this.totalCount]}`
      })
    },
    // 删除选项
    removeOption(index) {
      this.topic.options.splice(index, 1)
    }
  },
  components: {
    editText,
    modal
  }
}
</script>

<style lang="scss">
.topic {
  position: relative;
  width: 100%;
  .title {
    margin-bottom: 2px;
    line-height: 24px;
    .text {
      padding: 5px 5px 5px 2px;
    }
    .editing {
      padding: 3px 3px 3px 0;
    }
  }
  .icon-radio,
  .icon-checkbox,
  .icon-checkbox_fill {
    font-size: 14px
  }
}

.select-type{
  .edit-text {
    display: inline-block;
    line-height: 24px;
    .text {
      padding: 2px 5px 2px 3px;
    },
    .editing {
      padding: 0 3px 0 3px;
    }
  }
  .remove {
    font-size: 20px;
    cursor: pointer;
    color: red;
    &:hover {
      opacity: 0.6
    }
  }
  .add-option {
    &:hover .inner {
      visibility: visible;
    }
    .inner {
      text-align: center;
      font-size: 30px;
      border: 1px dashed;
      visibility: hidden;
      cursor: pointer
    }
  }
}

.text-type {
  .textarea {
    margin-top: 10px;
    height: 100px;
    width: 400px;
    border: 1px solid #a5a5a5;
    @media only screen and (max-width:737px) {
      & {
        width: 200px
      }
    }
  }
  .select-flag {
    position: absolute;
    top: 10px;
    right: 0;
    cursor: pointer;
  }
}
</style>
