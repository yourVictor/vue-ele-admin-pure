<template>
  <div class="pic-upload-container">
    <el-upload
      v-if="limit === 1"
      v-loading="loading"
      element-loading-text="上传中"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :http-request="upload"
      :class="{ active: !!imageUrl }"
    >
      <template v-if="imageUrl">
        <el-image style="width: 100px; height: 100px" :src="imageUrl + '?imageView2/2/w/200/h/200'" fit="contain"></el-image>
        <div class="el-upload__tip" slot="tip">
          <el-button type="text" @click="previewImage(imageUrl)">预览</el-button>
          <el-button type="text" @click="imageUrl = ''">清除</el-button>
        </div>
      </template>
      <i v-else class="el-icon-plus upload-icon"></i>
    </el-upload>
    <template v-else>
      <el-upload
        v-for="(item, index) in imageUrl"
        v-loading="listLoading[index]"
        element-loading-text="上传中"
        :key="index"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :http-request="
          data => {
            upload(data, index)
          }
        "
        class="active"
      >
        <el-image style="width: 100px; height: 100px" :src="item + '?imageView2/2/w/200/h/200'" fit="contain"></el-image>
        <div class="el-upload__tip" slot="tip">
          <el-button type="text" @click="previewImage(item)">预览</el-button>
          <el-button type="text" @click="imageUrl.splice(index, 1)">清除</el-button>
        </div>
      </el-upload>
      <el-upload v-if="imageUrl.length < limit" v-loading="loading" element-loading-text="上传中" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :http-request="upload">
        <i class="el-icon-plus upload-icon"></i>
      </el-upload>
    </template>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="previewImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import * as qiniu from 'qiniu-js'
import { Message, Image } from 'element-ui'
import { getQiNiuToken } from '@/apis/common/index'
import './index.scss'
export default {
  name: 'picUpload',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    limit: { default: 1 },
    callback: { type: Function }
  },
  data() {
    return {
      uploadToken: '',
      host: '',
      putExtra: {},
      config: {
        useCdnDomain: true,
        disableStatisticsReport: false,
        retryCount: 6,
        region: qiniu.region.z0
      },
      loading: false,
      listLoading: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],

      imageUrl: this.value,
      previewImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    value(newValue) {
      this.imageUrl = newValue
    },
    imageUrl(newValue) {
      this.$emit('input', newValue)
    }
  },
  methods: {
    async fetchData() {
      const res = await getQiNiuToken()
      if (res.success) {
        this.uploadToken = res.data.uploadToken
        this.host = res.data.host
      }
    },
    upload(data, index) {
      if (index >= 0) {
        this.listLoading[index] = true
      } else {
        this.loading = true
      }
      this.$forceUpdate()
      const observable = qiniu.upload(data.file, 'upf' + new Date().getTime(), this.uploadToken, this.putExtra, this.config)
      observable.subscribe({
        next: () => {
          // console.log('next', res)
        },
        error: err => {
          const reg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
          Message({
            message: err.message && reg.test(err.message) ? err.message : '服务器异常，请稍后再试',
            type: 'error',
            duration: 3 * 1000
          })
          if (index >= 0) {
            this.listLoading[index] = false
          } else {
            this.loading = false
          }
        },
        complete: res => {
          const src = this.host + '/' + res.key
          /* var src = qiniu.imageMogr2({
            thumbnail: '750x1000',
            quality: 80, // 图片质量，取值范围1-100
            format: 'png' // 新图的输出格式，取值范围：jpg，gif，png，webp等
          }, res.key, this.host) */
          const $this = this
          const image = new Image()
          image.src = src + '?imageView2/2/w/200/h/200'

          image.onload = function() {
            if ($this.limit > 1) {
              if (index >= 0) {
                $this.imageUrl[index] = src
                $this.$emit('input', $this.imageUrl)
                $this.$forceUpdate()
              } else {
                $this.imageUrl.push(src)
              }
            } else {
              $this.imageUrl = src
            }

            if (index >= 0) {
              $this.listLoading[index] = false
            } else {
              $this.loading = false
            }
            $this.$forceUpdate()
          }

          image.onerror = function() {
            Message({
              message: '图片上传失败',
              type: 'error',
              duration: 3 * 1000
            })

            if (index >= 0) {
              $this.listLoading[index] = false
            } else {
              $this.loading = false
            }
            $this.$forceUpdate()
          }
        }
      })
    },
    previewImage(url) {
      if (url || this.imageUrl) {
        this.previewImageUrl = url || this.imageUrl
        this.dialogVisible = true
      }
    }
  }
}
</script>
