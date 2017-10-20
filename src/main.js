// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import store from './store/'
import routerMap from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
// import mavonEditor from 'mavon-editor'
import 'bootstrap/dist/css/bootstrap.css'
// import 'mavon-editor/dist/css/index.css'
import 'element-ui/lib/theme-default/index.css'
//开启debug模式
Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
// Vue.use(mavonEditor)
// Vue.use(Wangeditor)
Vue.http.options.emulateJSON = true

// 测试阶段，电脑根据电脑ip来设置读片路径
Vue.prototype.highlight = function (sTitle) {
  var valStro = sTitle.replace(/192.168.1.236:/g, "192.168.1.228:")
  var valStrt = valStro.replace(/192.168.1.224:/g, "192.168.1.228:")
  return valStrt

};
// 并且配置路由规则
const router = new VueRouter({
  hashbang: false,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true,
  mode: 'hash',
  base: __dirname,
  routes: routerMap,
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
