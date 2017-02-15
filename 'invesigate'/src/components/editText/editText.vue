<template>
  <div class="edit-text" >
    <p class='text' v-if="!editing" @click='edit'><slot></slot></p>
    <input class="editing" type="temp"
    v-else
    v-model = "temp"
    v-focus
    @blur='doneEdit'
    @keyup.enter='doneEdit'
    @keyup.esc='cancelEdit' >
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 编辑标识
      editing: false
    }
  },
  methods: {
    // 开始编辑
    edit() {
      // 保存编辑前的状态
      this.temp = this.text
      this.editing = true
    },
    // 结束编辑,编辑完的内容发送给父组件
    doneEdit() {
      if (!this.editing) return
      this.editing = false
      this.temp = this.temp.trim()
      this.$emit('editText', this.temp, this.index)
    },
    // 取消编辑,编辑前的内容发送给父组件
    cancelEdit() {
      this.editing = false
      this.temp = this.text
      this.$emit('editText', this.text, this.index)
    }
  }
}
</script>

<style lang="scss">
.edit-text {

  &:hover {
    background-color: #FDF1E6;
  }
  .text {
    padding: 2.5px 0;
    box-sizing: border-box;
  }
  .editing {
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    text-align: inherit;
    line-height: inherit;
    padding: inherit;
    box-sizing: border-box;
    width: 100%
  }
}
</style>
