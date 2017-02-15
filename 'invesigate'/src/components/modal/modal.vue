<template>
  <transition name='fade'>
    <div class="modal" v-show="flag">
      <div class="modal-wrapper" >
        <div class="modal-head">
          <slot name="title">
            <span>{{title}}</span>
          </slot>
          <span class="close" @click="cancel">&times</span>
        </div>
        <div class="modal-body">
          <slot name="text">
            <p v-html='text'></p>
          </slot>
        </div>
        <div class="modal-foot">
          <button class="btn" @click="confirm" v-if="showConfirm">确认</button>
          <button class="btn" @click="cancel" v-if="showCancel">取消</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  /* 因为这次项目只需用到alertModal和confrimModal
    所以props就按需求传入,一般可以用options对象
    包含所需要的选项,然后在computed中处理默认值 */
  props: {
    showConfirm: {
      default: true
    },
    showCancel: {
      default: true
    },
    text: {
      default: ''
    },
    title: {
      default: '提示'
    }
  },
  data() {
    return {
      flag: false,
      resolve: '',
      reject: ''
    }
  },
  methods: {
    // 返回Promise对象,可以使父组件很好的处理回调
    show() {
      this.flag = true
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    confirm() {
      this.resolve('confirm')
      this.flag = false
    },
    cancel() {
      this.reject('cancel')
      this.flag = false
    }
  }
}
</script>

<style lang='scss'>
@import '../../common/scss/mixin';
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    z-index: 88;
    .modal-wrapper {
      @include bd(350px, 180px);
      position: fixed;
      box-sizing: border-box;
      transform: translate(-50%,-50%);
      top: 40%;
      left: 50%;
      border: 1px solid #EFEFEF;
      background-color: #fff;
      transition: all 1s;
      z-index: 100px;

      .modal-head {
        box-sizing: border-box;
        padding: 10px 20px;
        margin-bottom: 20px;
        height: 40px;
        width: 100%;
        background-color: #EFEFEF;
        font-weight: bold;
        .close {
          float: right;
          position: relative;
          bottom: 5px;
          font-size: 24px;
          cursor: pointer;
        }
      }

      .modal-body {
        padding: 0px 20px;
        line-height: 30px;
        height: 60px;
        margin-bottom: 20px
      }
      .modal-foot {
        text-align: center;
        font-size: 0;
        .btn {
          @include btn(70px,25px);
          margin-right: 10px;
        }
      }
    }
  }

  .fade-enter-active,.fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,.fade-leave-active {
    opacity: 0;
  }
</style>
