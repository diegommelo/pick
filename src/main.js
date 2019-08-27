import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import VueHead from 'vue-head'
import router from './router'
import './registerServiceWorker'
import {firestorePlugin} from 'vuefire'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(firestorePlugin)
Vue.use(VueHead)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
