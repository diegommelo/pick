import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueHead from 'vue-head'
import VueAnalytics from 'vue-analytics'
import router from './router'
import './registerServiceWorker'
import {firestorePlugin} from 'vuefire'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(firestorePlugin)
Vue.use(VueHead)
Vue.use(VueAnalytics, {
  id:'UA-37628257-3'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
