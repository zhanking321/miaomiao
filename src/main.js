import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import scroller from './components/Scroller'
import loading from './components/Loading'

Vue.component('scroller', scroller)
Vue.component('loading', loading)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.filter('imgFilter', function(url, arg){
  return url.replace(/w\.h/, arg)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
