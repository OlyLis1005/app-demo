import Vue from 'vue'
import App from './App'
import request from '@/utils/request'
import {isOk} from '@/utils/common'

Vue.config.productionTip = false
Vue.prototype.$request = request
Vue.prototype.$isOk = isOk

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
