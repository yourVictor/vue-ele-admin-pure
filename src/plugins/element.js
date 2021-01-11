import Vue from 'vue'
import Meta from 'vue-meta'
import {
  Loading,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  Header,
  Breadcrumb,
  BreadcrumbItem,
  Main,
  Tree,
  Table,
  TableColumn,
  Pagination,
  Card,
  Form,
  FormItem,
  Input,
  Button,
  Switch,
  Checkbox,
  DatePicker,
  Popover,
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Tabs,
  TabPane,
  Row,
  Col,
  Dialog,
  Upload,
  Select,
  Option,
  Tag,
  Steps,
  Step,
  Message,
  MessageBox
} from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/display.css'
import '@/styles/element-reset.scss'

Vue.use(Meta)
Vue.use(Loading)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Main)
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Checkbox)
Vue.use(DatePicker)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Row)
Vue.use(Col)
Vue.use(Dialog)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tag)
Vue.use(Steps)
Vue.use(Step)

// 以下组件需要单独挂载
const element = {}
element.install = function(Vue) {
  // Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 2000 } // 全局配置对象。该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）。
  Vue.prototype.$message = Message
  Vue.prototype.$alert = MessageBox.alert
  Vue.prototype.$confirm = MessageBox.confirm
}
Vue.use(element)
