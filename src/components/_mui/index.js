// 按需引入 vant 组件
import {
  Toast,
  Button,
  Loading,
  Icon,
  // Uploader,
  Form,
  Field,
  Checkbox,
  Switch,
  search,
  Col,
  Row,
  // RadioGroup,
  // Radio,
  Popup,
  // ActionSheet,
  // DropdownMenu,
  // DropdownItem,
  // IndexBar,
  // IndexAnchor,
  Cell,
  // Picker,
  // Overlay,
  List,
  PullRefresh
} from 'vant'

// 引入自定义组件
// import CoverUpload from '../cover-upload'
// import Arrow from '../arrow'

// 组装成 mui 套件
const mui = {
  Button,
  Loading,
  Icon,
  search,
  // Uploader,
  Form,
  Field,
  Checkbox,
  Switch,
  Col,
  Row,
  // RadioGroup,
  // Radio,
  Popup,
  // ActionSheet,
  // DropdownMenu,
  // DropdownItem,
  // IndexBar,
  // IndexAnchor,
  Cell,
  // Picker,
  // Overlay,
  List,
  PullRefresh
  // 'm-cover-upload': CoverUpload,
  // 'm-arrow': Arrow
}

const install = function (Vue) {
  Object.keys(mui).forEach((key) => {
    const n = mui[key].name
    if (n.indexOf('van-') === 0) {
      Vue.component('m' + n.substr(3), mui[key])
    } else {
      Vue.component(n, mui[key])
    }
  })
  Object.defineProperty(Vue.prototype, '$toast', { value: Toast })
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default Object.assign(mui, { install })
