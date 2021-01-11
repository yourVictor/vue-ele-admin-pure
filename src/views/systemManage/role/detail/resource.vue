<template>
  <div class="resource-wrapper">
    <el-tree ref="tree" :data="treeData" show-checkbox node-key="id" :default-checked-keys="checked" :props="defaultProps" @check-change="treeCheckChange" default-expand-all>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <template v-if="data.buttons && data.buttons.length">
          <span>&nbsp;&nbsp;&nbsp; --- &nbsp;&nbsp;&nbsp;</span>
          <span class="node-btns">
            <el-checkbox v-for="(item, index) in data.buttons" :key="index" v-model="item.checked" @change="value => changeButtonCheck(value, data)">{{ item.label }}</el-checkbox>
          </span>
        </template>
      </span>
    </el-tree>
  </div>
</template>
<script>
import { asyncRouterMap } from '@/router/index'

export default {
  name: 'resource',
  props: {
    // 默认选中的权限列表
    checked: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      defaultProps: { children: 'children', label: 'label' },
      checkedKeys: [],
      checkedButtonKeys: [],
      allPermissionKeys: []
    }
  },
  computed: {
    treeData: function() {
      // this.allPermissionKeys = []
      let temp = []
      let getItem = data => {
        let tItem = {
          id: data.name,
          label: data.meta ? data.meta.title : '',
          buttons: []
        }

        if (data.meta && data.meta.buttons) {
          for (let key in data.meta.buttons) {
            let id = `${data.name}${this.formatKey(key)}`
            tItem.buttons.push({
              id,
              label: data.meta.buttons[key].label,
              checked: this.checked.includes(id)
            })
          }
        }
        return tItem
      }
      let getChild = (item, data) => {
        data.map(i => {
          if (i.meta && i.meta.permission === 'all') {
            // i.meta.permission === 'all' 代表所有用户拥有的权限
            this.allPermissionKeys.push(i.name)
          } else if (i.path && i.meta && !i.meta.hidden) {
            let allPermissionChildren = (i.children || []).filter(c => c.hidden && c.meta && c.meta.permission === 'all')
            allPermissionChildren.map(i => {
              this.allPermissionKeys.push(i.name)
            })
            let children = (i.children || []).filter(c => !c.hidden)
            const showParent = children.some(i => i.meta && i.meta.showParent)
            if (showParent || children.length > 1) {
              let tempItem = {
                id: i.name,
                label: i.meta.title || '',
                children: []
              }
              getChild(tempItem.children, children)
              item.push(tempItem)
            } else if (children.length === 1) {
              item.push(getItem(children[0]))
            } else {
              item.push(getItem(i))
            }
          }
        })
      }
      getChild(temp, asyncRouterMap)
      return temp
    }
  },
  methods: {
    formatKey(word) {
      if (word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return ''
    },
    changeButtonCheck(value, data) {
      if (value) {
        this.$refs.tree.setChecked(data, true)
      }
      this.getKeys()
    },
    treeCheckChange(data, isChecked) {
      setTimeout(() => {
        if (data.buttons && data.buttons.length) {
          if (!isChecked) {
            data.buttons.map(i => {
              i.checked = false
            })
          }
        }
        this.getKeys()
      }, 200)
    },
    getKeys() {
      this.checkedKeys = this.$refs.tree.getCheckedKeys(true)
      this.checkedButtonKeys = []
      let nodes = this.$refs.tree.getCheckedNodes() || []
      nodes.map(i => {
        if (i.buttons && i.buttons.length) {
          i.buttons.map(item => {
            if (item.checked) {
              this.checkedButtonKeys.push(item.key || item.id)
            }
          })
        }
      })

      this.$emit('change', this.checkedKeys.concat(this.checkedButtonKeys).concat(this.allPermissionKeys))
    }
  }
}
</script>
