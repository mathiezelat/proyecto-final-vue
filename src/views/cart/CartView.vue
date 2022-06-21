<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div v-if="!purchaseCompleted" class="flex flex-col">
      <div class="flex flex-col" v-if="getCart.length > 0">
        <CartTable :cart="getCart" />
        <button 
          class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
          "
          v-if="getCart.length > 0 && getUser && !getUser.isAdmin" 
          @click="confirmOrder"
        >
          Confirmar Compra
        </button>
        <button 
          class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
          "
          v-if="!getUser" 
          @click="toLogin"
        >
          Iniciar sesión
        </button>
      </div>
      <div class="flex flex-col items-center justify-center gap-2" v-else>
        <p class="text-xl font-medium">
          Tu carrito está vacío
        </p>
        <router-link to="/" class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
        ">
          Ir al inicio
        </router-link>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center gap-2">
      <img 
        class="w-28 h-28 object-contain"
        src="/gif/shopping.gif" 
        alt="compra completada"
      >
      <p>¡Compra completada con éxito!</p>
      <router-link to="/account" class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
          ">
        Ir a cuenta
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api.services.js'
import CartTable from "@/components/cart/CartTable.vue"

export default {
  name: "CartView",
  metaInfo: {
    title: 'Carrito'
  },
  data() {
    return { 
      purchaseCompleted: false,
    }
  },
  components: {
    CartTable,
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("cart", ["getCart"]),
    ...mapGetters("products", ["getProducts"]),
  },
  methods: {
    ...mapActions("cart", ["emptyCart"]),
    ...mapActions("orders", ["addOrder"]),
    toLogin() {
      const path = this.$router.currentRoute.path
      if(path !== "/login") this.$router.push("/login")
    },
    async confirmOrder() {
      const total = this.getCart.reduce((acc, product) => acc + product.total, 0)

      const newOrder = {
        products: this.getCart,
        total
      }

      await api.saveOrder(this.getUser.id, newOrder)

      this.addOrder(newOrder)

      this.emptyCart()

      this.purchaseCompleted = true
    }
  }
}
</script>