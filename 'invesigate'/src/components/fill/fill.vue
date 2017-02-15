  <template>
  <div class="fill" >
    <div class="question-title">{{question.title}}</div>
    <div class="line"></div>
      <ul class="fill-wrapper ">
        <li class="fill-content fill-hook" v-for="(content, index) in question.contents">
          <span class="sign">Q{{index+1}}</span>
          <div  v-if="content.type === 'textarea'">
            <span class="option-title">{{content.title}}</span>
            <span class="fill-flag" >{{content.isFill ? '此题必填' : '此题选填'}}</span>
            <textarea  class="type-text t-hook"
            :data-isfill = 'content.isFill ? 1 : "" '></textarea>
          </div>
          <ul v-else>
            <span class="option-title">{{content.title}}</span>
            <li class="question-option" v-for="(option, num) in content.options">
              <input
              class="t-hook"
              :type='content.type'
              :name="`${content.type}-${index}`"
              :id="`${content.type}-${index}-${num}`">
              <label class="select-text"
              :for="`${content.type}-${index}-${num}`">
               {{option.text}}</label>
            </li>
          </ul>
        </li>
      </ul>
    <div class="line"></div>
    <div class="fill-foot">
      <button class='btn' @click="submit">提交</button>
    </div>
    <modal
    ref="modal"
    :text='text'
    :showCancel='showCancel' >
    </modal>
  </div>
</template>
<script>
import gobal from 'store/bus'
import modal from 'components/modal/modal'
import {storage} from 'common/js/util'
export default {
  data() {
    return {
      showCancel: true,
      text: ''
    }
  },
  created() {
    let query = this.$route.query.index
    this.question = gobal.store[query]
  },
  methods: {
    // 提交并验证填写好得问卷,
    submit() {
      // 问卷的状态是否是已结束
      if (this.question.state === 'end') {
        this.text = '提交时间已过'
        this.alertModal()
        return
      }
      // 问卷是否填写完整
      if (!this.isAllFill()) {
        this.text = '请填写完问卷'
        this.alertModal()
        return
      }
      this.text = '是否提交问卷'
      this.confirmModal()
    },
    alertModal() {
      this.showCancel = false
      this.$refs.modal.show().then().catch(() => {
      })
    },
    confirmModal() {
      this.showCancel = true
      // confirm回调
      this.$refs.modal.show().then(() => {
        this.getFillValue()
        this.$router.push('manage')
      }).catch(() => {})
    },
    /* 因为问卷的题目类型是根据type动态生成的,
      而且只需要最后提交的时候获取一次value,
      用v-model就太麻烦了,所以直接Dom操作获取value */
    getFillValue() {
      let contents = Array.from(document.querySelectorAll('.fill-content'))
      contents.forEach((el, i) => {
        let typeList = Array.from(el.querySelectorAll('.t-hook'))
        typeList.forEach((item, n) => {
          if (item.checked || item.value.length > 30) {
            this.question.contents[i].counts[n] += 1
          } else if (item.type === 'textarea' && item.value.length < 30) {
            this.question.contents[i].counts[1] += 1
          }
        })
      })
      storage.save('qusList', gobal.store)
    },
    // 判断问卷是否全部填写完整
    isAllFill() {
      let contents = Array.from(document.querySelectorAll('.fill-content'))
      return contents.every(item => {
        let select = item.querySelector('input')
        let checked = item.querySelector('input:checked')
        let text = item.querySelector('textarea')
        if (text && text.dataset.isfill && text.value.length < 1) {
          return false
        }
        if (select && !checked) {
          return false
        }
        return true
      })
    }
  },
  components: {
    modal
  }
}
</script>

<style lang='scss'>
@import '../../common/scss/mixin';
.fill {
  width: 95%;
  margin: 0 auto;
}
.fill-wrapper {
  padding: 20px;
  .fill-content {
    display: flex;
    position: relative;
    padding: 15px;
    margin-bottom: 10px;
    &:hover {
      background-color: #fdf1e6;
      .sign,.option-title {
        font-weight: bold
      }
    }
    .sign {
      padding: 8px 10px 0 5px;
    }
    .option-title {
      display: inline-block;
      line-height: 24px;
      padding: 5px 5px 5px 2px;
      margin-bottom: 5px;

    }
    .type-text {
      display: block;
      margin-top: 10px;
      width: 400px;
      height: 100px;
      resize: none;
      @media only screen and (max-width:737px) {
        & {
          width: 200px
        }
      }
    }
    .fill-flag {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .question-option {
      padding: 6px;
      input[type='radio'],
      input[type='checkbox'] {
        display: none;
      }
      label{
        position: relative;
        display: inline-block;
        cursor: pointer;
        padding-left: 25px;
      }
       label:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 14px;
        height: 14px;
        background-color: #e0e0e0;

      }
      input[type='radio'] + label:before {
        border-radius: 50%;
      }
      input[type='checkbox'] + label:before {
        border-radius: 3px;
      }
      input[type='radio']:checked + label:before{
        content: "\2022";
        color: #fff;
        font-size: 20px;
        text-align: center;
        line-height: 13px;
        background-color: #ee7419;
      }
      input[type='checkbox']:checked + label:before{
        content: "\2713";
        color: #fff;
        font-size: 13px;
        text-align: center;
        background-color: #ee7419;
      }
    }
  }
}
.fill-foot {
  padding: 30px 0 50px 0;
  text-align: center;
  .btn {
    @include btn(70px, 30px)
  }
}
</style>
