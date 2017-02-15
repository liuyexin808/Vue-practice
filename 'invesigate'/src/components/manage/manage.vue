<template>
  <div class="manage">
    <table v-if="store && store.length " class="list">
      <thead class="list-header">
        <tr >
          <th class="item" >标题</th>
          <th class="item">时间</th>
          <th class="item">状态</th>
          <th class="item">操作<button @click="routerGo('edit') "class="btn">+ 新建问卷</button></th>
        </tr>
      </thead>
      <tbody>
        <tr class="list-content" :class="{active:isSelect}"v-for="(item,index) in store" >
          <td class="text">{{item.title}}</td>
          <td class="text">{{item.date | format}}</td>
          <td class="text"
          :class="{release: item.state ==='release',end: item.state === 'end'}">
          {{item.state | stateText}}
          </td>
          <td class="text">
            <div v-if="item.state === 'noRelease'">
              <button class='btn' @click="routerGo('edit', index)">编辑问卷</button>
              <button class='btn' @click="showModal(index)">删除问卷</button>
            </div>
            <div v-else>
              <button class='btn' @click="routerGo('view', index)">查看数据</button>
              <button class='btn' @click="routerGo('fill', index)">填写问卷</button>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot class="list-foot">
        <td class="all-select" colspan="4" >
          <button @click="selectAll" class="btn">全选</button>
          <button @click="removeAll" class="btn">删除</button>
        </td>
      </tfoot>
    </table>
    <div v-else class="rebuild">
      <button @click="routerGo('edit')" class="btn-build">+ 新建问卷</button>
    </div>
    <modal
    ref="modal">
      <p slot="text">确认要删除此问卷?</p>
    </modal>
  </div>
</template>

<script>
import gobal from 'store/bus.js'
import modal from 'components/modal/modal'
import {formatDate} from 'common/js/formatDate'
export default {
  data() {
    return {
      store: gobal.store,
      isSelect: false,
      flag: false
    }
  },
  created() {
    const date = new Date().getTime()
    // 比较当前时间与发布截止时间,如果大于截止时间则改变状态为已结束
    gobal.store.forEach((item) => {
      if (item.date < date && item.state === 'release') {
        item.state = 'end'
      }
    })
  },
  methods: {
    // 路由跳转到指定路径,附带查询参数
    routerGo(com, value) {
      this.$router.push({path: com, query: {index: value}})
    },
    // 全选按钮
    selectAll() {
      this.isSelect = !this.isSelect
    },
    // 删除按钮
    removeAll() {
      if (this.isSelect) {
        this.store.splice(0)
      }
    },
    // 显示弹窗
    showModal(index) {
      this.$refs.modal.show().then(() => {
        this.store.splice(index, 1)
      }).catch(() => {})
    }
  },
  filters: {
    stateText(val) {
      switch (val) {
        case 'release': return '发布中'
        case 'noRelease': return '未发布'
        case 'end': return '已结束'
      }
    },
    // 格式化时间戳
    format(time) {
      return time ? formatDate(new Date(time), 'yyyy-MM-dd hh:mm:ss') : ''
    }
  },
  components: {
    modal
  }
}
</script>

<style lang='scss'>
@import '../../common/scss/mixin';
.manage {
    padding: 10px;
  .list {
    width: 95%;
    margin: 0 auto
  }
  .list-header {
    .item {
      padding: 20px 0;
      font-size: 18px;
      text-align: left;
      &:last-child {
        text-align: right;
      }
      &:nth-child(3) {
        text-align: center;
        padding-right: 10px
      }
    }
    .btn {
      margin-left: 15px;
      width: 100px;
      background-color: #EE7419;
      color: #fff;
      cursor: pointer;
      font-weight: bold;
    }
  }
  .list-content {
    border-bottom: 1px solid #EFEFEF;
    margin: 0 110px;
    &:hover {
      background-color: #FCF0e5;
    }
    &.active {
      background-color: #FCF0e5;
    }

    .text {
      padding: 10px 0;
      &:first-child {
        width:30%;
        text-align: left;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(3) {
        width: 25%;
        text-align: center;
      }
      &:last-child {
        text-align:right;
      }
      &.release {
        color: #a4f47e;
      }
      &.end {
        color: #ef2b2b;
      }
    }
  }
  .list-foot {
   .all-select {
      padding: 20px 0;
    }
  }
  .btn {
    @include btn(70px, 30px);
    margin-right: 10px;
  }
  .remove {
    text-align: center;
    padding: 1%;
  }
  .rebuild {
    height: 300px;
    line-height: 300px;
    text-align:center;
    .btn-build {
      @include bd(200px,50px);
      color: #fff;
      background-color: #EE7419;
      font-size: 25px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
