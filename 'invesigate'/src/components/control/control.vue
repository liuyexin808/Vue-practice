<template>
  <div class="control" v-if="contents && contents.length" >
    <span class="control-btn"
    v-show="selectIndex !== 0"
    @click='move(-1)'>上移</span>
    <span class ="control-btn"
    v-show="selectIndex !== contents.length - 1"
    @click='move(1)'>下移</span>
    <span class="control-btn"
    @click='repeat'>复用</span>
    <span class="control-btn"
    @click='remove'>删除</span>
  </div>
</template>
<script >
export default {
  props: ['contents', 'selectIndex'],
  computed: {
    // 被选中的问卷内容
    selectContent() {
      return this.contents[this.selectIndex]
    }
  },
  methods: {
    // 上下移动问卷内容
    move(index) {
      let newIndex = this.selectIndex + index
      let temp = this.contents[newIndex]
      this.contents.splice(newIndex, 1, this.selectContent)
      this.contents.splice(this.selectIndex, 1, temp)
    },
    // 复制问卷内容
    repeat() {
      let obj = JSON.parse(JSON.stringify(this.selectContent))
      this.contents.splice(this.selectIndex, 0, obj)
    },
    // 删除问卷内容
    remove() {
      this.contents.splice(this.selectIndex, 1)
    }
  }
}
</script>
<style lang="scss">
.control {
  visibility: hidden;
  .control-btn {
    margin-right: 15px;
    cursor: pointer;
    &:hover {
      font-weight: bold
    }
  }
}
</style>
