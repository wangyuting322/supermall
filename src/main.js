import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 默认导入index.js
import Toast from 'components/common/toast';
// import FastClick from 'fastclick';
import vueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false
// 安装插件
Vue.use(ElementUI);

// 总线
Vue.prototype.$bus = new Vue()

// 安装插件
Vue.use(Toast);//会默认执行install函数

// 安装插件
// Vue.use(FastClick);
// 使用（调用attach函数），解决移动端300毫秒延迟
// FastClick.attach(document.body);

// 安装插件
// Vue.use(vueLazyLoad);
Vue.use(vueLazyLoad,{
  loading: require('./assets/img/common/placeholder.png')
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
