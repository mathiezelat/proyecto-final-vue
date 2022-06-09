p<template>
  <modal
    name="cart-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="auto"
  >
    <div class="flex flex-col p-2">
      <div class="flex justify-end pb-2">
        <button class="border rounded py-1 px-3" @click="hide">
          <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
        </button>
      </div>
      <div class="flex flex-col" v-if="getCart.length > 0">
        <CartTable :cart="getCart" />
        <button 
          class="border rounded py-2 px-4"
          v-if="getCart.length > 0 && getUser" 
          @click="confirmOrder"
        >
          Confirmar Compra
        </button>
        <button 
          class="border rounded py-2 px-4"
          v-if="!getUser" 
          @click="toLogin"
        >
          Iniciar sesión
        </button>

      </div>
      <p class="text-xl text-center pb-9" v-else>
        No hay productos en el carrito
      </p>
    </div>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import api from '@/services/api.services.js'
import CartTable from "@/components/cart/CartTable.vue";

export default {
  name: "CustomModal",
  components: {
    CartTable,
  },
  methods: {
    ...mapActions("cart", ["emptyCart"]),
    ...mapActions("orders", ["addOrder"]),
    hide() {
      this.$modal.hide("cart-modal")
    },
    toLogin() {
      const path = this.$router.currentRoute.path
      if(path !== "/login") this.$router.push("/login")
      this.hide()
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

      this.$modal.hide("cart-modal")
    }
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    ...mapGetters("cart", ["getCart"]),
    ...mapGetters("products", ["getProducts"]),
  }
};
</script>
