<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <template v-if="cardData.length">
                <el-col v-for="(item, index) in cardData" :key="index" :class="index>4?'hidden-xl-only':''" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item" shadow="hover">
                        <div class="item-title">
                            {{item.name}}
                            <el-tooltip v-if="item.desc" :content="item.desc" placement="right">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                        <div class="item-date">
                            <span v-if="item.date[1]">{{item.date[0]}} - {{item.date[1]}}</span>
                            <span v-else>{{item.date[0]}}</span>
                            <span v-if="item.isToday && item.date[1]">今日</span>
                        </div>
                        <div class="item-value">{{item.value||0}}<span v-text="item.unit"></span></div>
                        <template>
                            <div class="data-state">
                                <span v-if="item.chainRatio" :class="{'state-up': item.chainRatio.type, 'state-down': !item.chainRatio.type}">
                                    环比<i :class="{'el-icon-caret-top':item.chainRatio.type,'el-icon-caret-bottom':!item.chainRatio.type}">{{item.chainRatio.value}}</i>
                                </span>
                                <span v-else></span>
                                <span v-if="item.yearOnYear" :class="{'state-up': item.yearOnYear.type, 'state-down': !item.yearOnYear.type}">
                                    同比<i :class="{'el-icon-caret-top':item.yearOnYear.type,'el-icon-caret-bottom':!item.yearOnYear.type}">{{item.yearOnYear.value}}</i>
                                </span>
                            </div>
                        </template>
                    </el-card>
                </el-col>
            </template>
            <template v-else>
                <el-col v-for="item in [1, 2, 3, 4, 5]" :key="item" :xs="24" :sm="12" :md="8" :xl="5">
                    <el-card class="card-item center" shadow="hover">
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
                    <el-card class="card-item center" shadow="hover">
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
                <div>GMV趋势</div>
                <el-button class="date" type="text">2019/03/01-2019/03/19</el-button>
                <!--<el-date-picker :inline="true">
                </el-date-picker>-->
            </div>
            <div id="chart-trends"></div>
        </el-card>
    </div>
</template>
<script>
// 引入 ECharts 主模块
import echarts from 'echarts'
import { ContentLoader } from 'vue-content-loader'
import { dashboard } from '@/apis/dashboard'
import './index.scss'

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
      cardData: []
    }
  },
  created () {
    // this.hello()
  },
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    chartTrends = echarts.init(document.getElementById('chart-trends'))
    setTimeout(this.fetchData, 800)
  },
  methods: {
    async fetchData () {
      let res = await dashboard()
      if (res.success) {
        this.cardData = res.data
      }
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
