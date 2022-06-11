<template>
  <div class="relative bg-emerald-500 mb-5">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
      <router-link to="/" class="text-3xl font-bold text-white">
        Vue Eats
      </router-link>
      <div class="flex gap-2">
        <router-link 
          to="/login"
          class="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white"
          v-if="!getUser"
        >
          Iniciar sesión
        </router-link>
        <router-link 
          :to="getUser.isAdmin ? '/admin' : '/account'"
          class="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white"
          v-if="getUser"
        >
          {{ getUser.isAdmin ? 'Admin': 'Cuenta' }}
        </router-link>
        <button 
          class="rounded py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white"
          v-if="getUser"
          @click="handlerLogoutUser"
        >
          Cerrar sesión
        </button>
        <button
          class="rounded py-2 px-4 bg-red-500 hover:bg-red-600 text-white"
          @click="openModal"
        >
          {{ cartCounter }}
        </button>
      </div>
      </div>
    </nav>
    <CartModal 
      v-model="showModal" 
      :user="getUser"
      @confirm-order="confirmOrder" 
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartModal from "@/components/cart/CartModal.vue";

export default {
  name: "NavBar",
  components: {
    CartModal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    handlerLogoutUser(){
      this.logoutUser()
      const path = this.$router.currentRoute.path
      if(path !== "/") this.$router.push("/")
    },
    openModal() {
      this.$modal.show('cart-modal')
    },
    confirmOrder() {
      this.$emit("confirm-order")
    }
  },
  computed: {
    ...mapGetters("cart",["getCart"]),
    ...mapGetters("user",["getUser"]),
    cartCounter() {
      return this.getCart.reduce((acc, product) => acc + product.quantity, 0);
    },
  },
};
</script>
