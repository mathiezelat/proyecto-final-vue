import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import './assets/css/tailwind.css'
import 'vue-js-modal/dist/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPenToSquare, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'

library.add(faTrash, faPenToSquare, faXmark, faPlus, faMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VModal)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
