<template>
  <div id="app">
    <NavBar 
      :user="user" 
      :cart="cart" 
      @user-logout="userLogout" 
      @confirm-order="confirmOrder"
    />
    <br />
    <router-view 
      :user="user" 
      :products="products" 
      :cart="cart" 
      @add-to-cart="updateCart" 
      @user-login="userLogin" 
    />
  </div>
</template>

<script>
import api from "@/services/api.services.js"
import NavBar from "@/components/NavBar.vue"

export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    return {
      user: null,
      products: [],
      cart: [],
    };
  },
  mounted() {
    this.getProducts()
    this.getCart()
    this.getUser()
  },
  methods: {
    async getProducts() {
      this.products = await api.getProducts()
    },
    getCart() {
      this.cart = JSON.parse(localStorage.getItem("cart")) || []
    },
    updateCart({ productId, counter }) {
      const productInCart = this.cart.find(product => product.id === productId)

      if (counter > 0) {
        if (productInCart) {
          productInCart.quantity = counter

          productInCart.total = productInCart.quantity * productInCart.price
        } else {
          const productInProducts = this.products.find(product => product.id === productId)

          const newProductForCart = { ...productInProducts }

          this.cart.push({
            ...newProductForCart,
            quantity: counter,
            total: newProductForCart.price * counter,
          })
        }
      } else {
        this.cart = this.cart.filter((product) => product.id !== productId)
      }
      
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    userLogin(user) {
      this.user = user

      localStorage.setItem('user', JSON.stringify(this.user))
    },
    getUser() {
      this.user = JSON.parse(localStorage.getItem("user")) || null
    },
    userLogout() {
      this.user = null

      localStorage.removeItem('user')

      this.$router.push("/")
    },
    async confirmOrder() {
      const total = this.cart.reduce((acc, product) => acc + product.total, 0)
      
      await api.saveOrder(this.user.id, {
        products: this.cart,
        total
      })

      this.cart = []

      localStorage.removeItem('cart')

      this.$modal.hide("cart-modal")
    }
  },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */
/* 
nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
