import Mock from 'mockjs'

const dashboardData = {
  data: [
    {
      name: '新增用户',
      desc: Mock.Random.cparagraph(),
      date: ['2019/03/18', '2019/03/18'],
      value: 1020,
      unit: '人',
      yearOnYear: 10,
      chainRatio: -20
    },
    {
      name: '下单人数',
      desc: Mock.Random.cparagraph(),
      date: ['2019/03/18', '2019/03/18'],
      value: 1020,
      unit: '人',
      yearOnYear: 10,
      chainRatio: -20
    },
    {
      name: '下单金额',
      desc: Mock.Random.cparagraph(),
      date: ['2019/03/18', '2019/03/18'],
      value: 68920,
      unit: '元',
      yearOnYear: 10,
      chainRatio: -20
    }
  ]
}

Mock.mock('/dashboard', 'post', ({ body }) => {
  return {
    status: 200,
    data: dashboardData,
    message: '',
    sysMsg: ''
  }
})
