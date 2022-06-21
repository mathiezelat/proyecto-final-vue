import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products.js'
import categories from './modules/categories.js'
import cart from './modules/cart.js'
import user from './modules/user.js'
import orders from './modules/orders.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    products,
    categories,
    cart,
    user,
    orders
  }
})
