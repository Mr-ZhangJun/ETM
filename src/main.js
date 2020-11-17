// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//验证码
import SIdentify from './components/identify/identify'
//粒子
import VueParticles from 'vue-particles'
//font-awesome图标库
import 'font-awesome/css/font-awesome.min.css'
//axios
import axios from 'axios'
//隐藏类
import 'element-ui/lib/theme-chalk/display.css';
import '@/styles/index.scss'

Vue.prototype.$http = axios;
Vue.use(VueParticles)
Vue.use(SIdentify),
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
