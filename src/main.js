import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuelidate from 'vuelidate'
import './assets/css/tailwind.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPenToSquare, faXmark, faPlus, faMinus, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faTrash, faPenToSquare, faXmark, faPlus, faMinus, faBars, faCartShopping)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueMeta)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
