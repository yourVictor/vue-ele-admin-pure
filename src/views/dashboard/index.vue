<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <template>
                <el-col v-for="item in [1, 2, 3, 4, 5]" :key="item" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item" shadow="hover">
                        <content-loader :height="162" :width="400" :speed="2" primaryColor="#ddd" secondaryColor="#ecebeb">
                            <rect x="0" y="0" rx="4" ry="4" width="60" height="30" />
                            <rect x="0" y="40" rx="4" ry="4" width="300" height="10" />
                            <rect x="340" y="40" rx="4" ry="4" width="60" height="10" />
                            <rect x="0" y="70" rx="8" ry="8" width="120" height="50" />
                            <rect x="130" y="90" rx="8" ry="8" width="30" height="30" />
                            <rect x="0" y="150" rx="4" ry="4" width="190" height="10" />
                            <rect x="210" y="150" rx="4" ry="4" width="190" height="10" />
                        </content-loader>
                    </el-card>
                </el-col>
                <el-col class="hidden-xl-only" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item" shadow="hover">
                        <content-loader :height="162" :width="400" :speed="2" primaryColor="#ddd" secondaryColor="#ecebeb">
                            <rect x="0" y="0" rx="4" ry="4" width="60" height="30" />
                            <rect x="0" y="40" rx="4" ry="4" width="300" height="10" />
                            <rect x="340" y="40" rx="4" ry="4" width="60" height="10" />
                            <rect x="0" y="70" rx="8" ry="8" width="120" height="50" />
                            <rect x="130" y="90" rx="8" ry="8" width="30" height="30" />
                            <rect x="0" y="150" rx="4" ry="4" width="190" height="10" />
                            <rect x="210" y="150" rx="4" ry="4" width="190" height="10" />
                        </content-loader>
                    </el-card>
                </el-col>
            </template>
        </el-row>
        <el-card shadow="hover">
            <div class="chart-title">
                <div>新注册用户</div>
                <el-button class="date" type="text">2019/03/01-2019/03/19</el-button>
                <!--<el-date-picker :inline="true">
                </el-date-picker>-->
            </div>
            <div id="chart-trends"></div>
        </el-card>
    </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import './index.scss'
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

var chartTrends
export default {
  name: 'dashboard',
  components: {
    ContentLoader
  },
  metaInfo () {
    return {
      /* titleTemplate: '%s - 首页',
      meta: [
        { vmid: 'keyword', name: 'keyword', content: 'dashboard-keyword' },
        { vmid: 'description', name: 'description', content: 'dashboard-description' }
      ] */
    }
  },
  data () {
    return {
    }
  },
  created () {
    this.hello()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    chartTrends = echarts.init(document.getElementById('chart-trends'))
    this.fetchData()
  },
  methods: {
    fetchData () {
      // 绘制图表
      chartTrends.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '5%',
          bottom: '2%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false }
        },
        series: [
          {
            name: '新注册用户',
            type: 'line',
            stack: '总量',
            smooth: true,
            data: [ 120, 532, 101, 634, 90, 730, 210 ]
          }
        ]
      })
    },
    resizeCallBack (delayFlag) {
      // 页面尺寸变化时重新绘制
      setTimeout(() => {
        chartTrends.resize()
      }, delayFlag ? 300 : 0)
    },
    search () {
      // eslint-disable-next-line
      console.log('search ...')
    }
  }
}
</script>
