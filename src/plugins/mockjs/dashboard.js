import Mock from 'mockjs'
import { formatDate } from '../../utils/config'

const dashboardData = [
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD'), formatDate(new Date(), 'YYYY/MM/DD')],
    'chainRatio': {
      'type': 0,
      'value': '-48.69%'
    },
    'unit': '万',
    'name': 'GMV',
    'isToday': 1,
    'yearOnYear': {
      'type': 0,
      'value': '0%'
    },
    'value': 25.59,
    'desc': 'GMV是指范围时间内的订单成交金额的总和（只要付款成功均计入，无论之后是否发生退换货。'
  },
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD'), formatDate(new Date(), 'YYYY/MM/DD')],
    'chainRatio': {
      'type': 0,
      'value': '-43.42%'
    },
    'unit': '次',
    'name': '订单量',
    'isToday': 1,
    'yearOnYear': {
      'type': 0,
      'value': '0%'
    },
    'value': 2891,
    'desc': '统计时间区间范围内已付款订单的总数。'
  },
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD'), formatDate(new Date(), 'YYYY/MM/DD')],
    'chainRatio': {
      'type': 0,
      'value': '-42.61%'
    },
    'unit': '人',
    'name': '下单人数',
    'isToday': 1,
    'yearOnYear': {
      'type': 0,
      'value': '0%'
    },
    'value': 2277,
    'desc': '统计显示时间区间内成功付款过的用户人数，一个人在同一区间内多次付款只记为一人。'
  },
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD'), formatDate(new Date(), 'YYYY/MM/DD')],
    'chainRatio': {
      'type': 0,
      'value': '-9.31%'
    },
    'unit': '',
    'name': '客单价',
    'isToday': 1,
    'yearOnYear': {
      'type': 0,
      'value': '0%'
    },
    'value': 88.51,
    'desc': '统计显示时间区间范围内客单价金额。'
  },
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD'), formatDate(new Date(), 'YYYY/MM/DD')],
    'chainRatio': {
      'type': 0,
      'value': '-53.33%'
    },
    'unit': '人',
    'name': '全站新增用户数',
    'isToday': 1,
    'yearOnYear': {
      'type': 0,
      'value': '0%'
    },
    'value': 81,
    'desc': ''
  },
  {
    'date': [formatDate(new Date(), 'YYYY/MM/DD')],
    'unit': '万人',
    'name': '累计用户数',
    'isToday': 1,
    'value': 149.14,
    'desc': ''
  }
]

Mock.mock('/dashboard', 'post', ({ body }) => {
  return {
    status: 200,
    data: dashboardData,
    message: '',
    sysMsg: ''
  }
})
