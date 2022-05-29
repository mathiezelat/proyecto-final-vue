import Vue from 'vue'
import App from './App.vue'
import './assets/css/tailwind.css'
import router from './router'
import Vuelidate from 'vuelidate'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPenToSquare, faXmark, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash, faPenToSquare, faXmark, faPlus, faMinus)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VModal)
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
