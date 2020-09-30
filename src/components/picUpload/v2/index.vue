<template>
  <div class="pic-upload-container">
    <el-upload
      v-if="limit === 1"
      v-loading="loading"
      :element-loading-text="loadingText"
      :action="uploadUrl"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{ active: !!imageUrl }"
    >
      <template v-if="imageUrl">
        <el-image style="width: 100px; height: 100px" :src="imageUrl" fit="contain"></el-image>
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
        :element-loading-text="loadingText"
        :key="index"
        :action="uploadUrl"
        :show-file-list="false"
        :before-upload="
          file => {
            beforeUpload(file, index)
          }
        "
        :http-request="
          data => {
            upload(data, index)
          }
        "
        class="active"
      >
        <el-image style="width: 100px; height: 100px" :src="imgKey ? item[imgKey] : item" fit="contain"></el-image>
        <div class="el-upload__tip" slot="tip">
          <el-button type="text" @click="previewImage(item)">预览</el-button>
          <el-button type="text" @click="imageUrl.splice(index, 1)">清除</el-button>
        </div>
      </el-upload>
      <el-upload
        v-if="imageUrl.length < limit"
        v-loading="loading"
        :element-loading-text="loadingText"
        :action="uploadUrl"
        :show-file-list="false"
        :multiple="multiple"
        :before-upload="beforeUpload"
        :http-request="upload"
      >
        <i class="el-icon-plus upload-icon"></i>
      </el-upload>
    </template>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="previewImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// import * as imageConversion from 'image-conversion'
import lrz from 'lrz'
import { Message } from 'element-ui'
import { uploadFile } from '@/apis/common/index'
import './index.scss'
export default {
  name: 'picUpload',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    limit: { default: 1 },
    multiple: { default: false },
    imgKey: { default: '' },
    callback: { type: Function }
  },
  data() {
    return {
      loadingText: '压缩中',
      loading: false,
      listLoading: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],

      imageUrl: this.value,
      previewImageUrl: '',
      dialogVisible: false
    }
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
    async beforeUpload(file, index) {
      return new Promise((resolve, reject) => {
        this.setLoading(index, true)
        if (file.size / 1024 / 1024 < 2) {
          // 判定图片大小是否小于2MB
          resolve(file)
        } else {
          this.loadingText = '压缩中'
          lrz(file, { quality: 0.8 })
            .then(res => {
              resolve(res.file)
            })
            .catch(e => {
              console.log('压缩失败，上传原图', e, reject)
              resolve(file)
            })
        }
      })
    },
    async upload(data, index) {
      this.loadingText = '上传中'
      this.setLoading(index, true)
      this.$forceUpdate()
      // 根据后台需求数据格式
      const form = new FormData()
      // 文件对象
      const imgItem = {
        name: data.file.name.split('.')[0]
      }
      form.append('file', data.file)
      const res = await uploadFile(form)
      if (res.success && res.filePath) {
        const src = res.filePath
        const $this = this
        const image = new Image()
        image.src = src
        image.onload = function() {
          if ($this.limit > 1) {
            if (index >= 0) {
              if ($this.imgKey) {
                imgItem[$this.imgKey] = src
                $this.imageUrl[index] = {
                  ...imgItem
                }
              } else {
                $this.imageUrl[index] = src
              }
              $this.$emit('input', $this.imageUrl)
              $this.$forceUpdate()
            } else {
              if ($this.imgKey) {
                imgItem[$this.imgKey] = src
                $this.imageUrl.push({
                  ...imgItem
                })
              } else {
                $this.imageUrl.push(src)
              }
            }
          } else {
            if ($this.imgKey) {
              imgItem[$this.imgKey] = src
              $this.imageUrl = {
                ...imgItem
              }
            } else {
              $this.imageUrl = src
            }
          }

          $this.setLoading(index, false)
          $this.$forceUpdate()
        }

        image.onerror = function() {
          Message({
            message: '图片上传失败',
            type: 'error',
            duration: 3 * 1000
          })

          $this.setLoading(index, false)
          $this.$forceUpdate()
        }
      } else {
        this.setLoading(index, false)
      }
    },
    setLoading(index, loading) {
      if (index >= 0) {
        this.listLoading[index] = loading
      } else {
        this.loading = loading
      }
    },
    previewImage(item) {
      let url = item
      if (this.imgKey) {
        url = item[this.imgKey]
      }
      if (url || this.imageUrl) {
        this.previewImageUrl = url || this.imageUrl
        this.dialogVisible = true
      }
    }
  }
}
</script>
