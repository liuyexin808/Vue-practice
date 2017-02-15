// 问卷默认模板
const qusData = {
  // 问卷的标题
  title: '这里是标题',
  // 问卷的状态
  state: null,
  // 问卷的截止日期
  date: null,
  // 问卷的内容
  contents: []
}

// 单选题默认模板
const radio = {
  type: 'radio',
  title: '单选题',
  options: [ {
    text: '选项一'
  }, {
    text: '选项二'
  } ]
}

// 多选题默认模板
const checkbox = {
  type: 'checkbox',
  title: '多选题',
  options: [ {
    text: '选项一'
  }, {
    text: '选项二'
  }, {
    text: '选项三'
  }, {
    text: '选项四'
  } ]
}

// 文本题默认模板
const textarea = {
  type: 'textarea',
  title: '文本题',
  // 是否需要填写
  isFill: false
}

// 题目模板
const topicData = {
  radio,
  checkbox,
  textarea
}

// 单选题查看数据选项
const option1 = {
  title: {
    text: '某站点用户访问来源',
    subtext: '数据占比'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 'bottom',
    data: []
  },
  series: {
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  color: [
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
  ]
}

const colorList = function(parms) {
  let colorList = [
    '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
    '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
  ]
  return colorList[parms.dataIndex]
}

// 多选题查看数据选项
const option2 = {
  title: {
    text: null,
    subtext: '数据占比'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: '{b} : {c}'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    splitNumber: 5,
    type: 'value',
    boundary: [0.1, 1]
  },
  yAxis: {
    type: 'category',
    data: []
  },
  series: {
    type: 'bar',
    data: [],
    itemStyle: {
      normal: {
        color: null
      }
    }
  }
}

// 文本题查看数据选项
const option3 = {
  title: {
    text: null,
    subtext: '有效回答占比'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 'bottom',
    data: ['有效回答', '无效回答']
  },
  series: {
    name: '回答占比',
    type: 'pie',
    radius: '55%',
    center: ['50%', '50%'],
    data: [{
      value: null,
      name: '有效回答'
    }, {
      value: null,
      name: '无效回答'
    }],
    itemStyle: {
      emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  },
  color: [
    '#7ff4ee', '#fccccc'
  ]
}

const tempChart = {
  radio: option1,
  checkbox: option2,
  textarea: option3
}

export {tempChart, topicData, qusData, colorList}
