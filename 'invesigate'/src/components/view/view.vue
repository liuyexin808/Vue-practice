<template>
  <div class="view">
    <div class="question-title">{{question.title}}</div>
      <div class="line"></div>
      <ul class="view-wrapper">
        <li
        v-for="(item, index) in question.contents"
        :id='`view-${index}`'
        class="view-chart"
        >
        </li>
      </ul>
      <div class="line"></div>
      <div class="view-foot">
        <button class='btn' @click="goBack">返回</button>
      </div>
    </div>

</template>
<script>
import gobal from 'store/bus'
import {tempChart, colorList} from 'common/js/template'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'

export default {
  methods: {
    // 根据不同的类型初始化echart
    initChart() {
      this.question.contents.forEach((item, index) => {
        let myChart = echarts.init(document.getElementById(`view-${index}`))
        let option = JSON.parse(JSON.stringify(tempChart[item.type]))
        option.title.text = `Q${index + 1}-${item.title}`
        switch (item.type) {
          case 'radio': this.radioChart(option, item)
            break
          case 'checkbox': this.checkboxChart(option, item)
            break
          case 'textarea': this.textareaChart(option, item)
        }
        myChart.setOption(option)
      })
    },
    // 单选题的图标选项
    radioChart(option, item) {
      item.options.forEach((opt, index) => {
        option.legend.data.push(opt.text)
        option.series.data.push({
          name: opt.text,
          value: item.counts[index]
        })
      })
    },
    // 多选题的图表选项
    checkboxChart(option, item) {
      item.options.forEach((opt, index) => {
        option.yAxis.data.unshift(opt.text)
        option.series.data.unshift(item.counts[index])
      })
      option.series.itemStyle.normal.color = colorList
    },
    // 文本题的文本选项
    textareaChart(option, item) {
      item.counts.forEach((count, index) => {
        option.series.data[index].value = count
      })
    },
    goBack() {
      this.$router.push('manage')
    }
  },
  created() {
    let query = this.$route.query.index
    this.question = gobal.store[query]
  },
  mounted() {
    // 初始化echart,异步操作DOM
    this.$nextTick(() => {
      this.initChart()
    })
  }
}
</script>
<style lang="scss">
@import '../../common/scss/mixin';
.view {
  width: 95%;
  margin: 0 auto;
}
.view-wrapper {
  padding: 20px;
  .view-chart {
    width: 100%;
    height: 400px;
    padding: 15px;
    margin-bottom: 10px;
  }
  @media only screen and (max-width:737px) {
    & {
      padding: 20px 0;
      .view-chart {
        padding: 15px 0;
      }
    }
  }
}
.view-foot {
  padding: 30px 0 50px 0;
  text-align: center;
  .btn {
    @include btn(70px, 30px)
  }
}
</style>
