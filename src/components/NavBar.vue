<template>
  <div class="relative bg-emerald-500">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex justify-between">
      <router-link to="/" class="text-2xl text-white">
        Vue Desserts CH MEL
      </router-link>
      <div class="flex gap-2">
        <router-link 
          to="/login"
          class="rounded py-2 px-4 bg-blue-500 text-white"
          v-if="!user"
        >
          LOGIN
        </router-link>
        <router-link 
          :to="user.isAdmin ? '/admin' : '/account'"
          class="rounded py-2 px-4 bg-blue-500 text-white"
          v-if="user"
        >
          {{ user.isAdmin ? 'Admin': 'Mi Cuenta' }}
        </router-link>
        <button 
          class="rounded py-2 px-4 bg-blue-500 text-white"
          v-if="user"
          @click="userLogout"
        >
          Logout
        </button>
        <button
          class="rounded py-2 px-4 bg-red-500 text-white"
          @click="openModal"
        >
          {{ cartCounter }}
        </button>
      </div>
      </div>
    </nav>
    <CartModal 
      v-model="showModal" 
      :user="user" 
      :cart="cart" 
      @confirm-order="confirmOrder" 
    />
  </div>
</template>

<script>
import CartModal from "@/components/cart/CartModal.vue";

export default {
  name: "NavBar",
  components: {
    CartModal,
  },
  props: {
    user: {
      type: Object,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.$modal.show('cart-modal')
    },
    userLogout() {
      this.$emit("user-logout")
    },
    confirmOrder() {
      this.$emit("confirm-order")
    }
  },
  computed: {
    cartCounter() {
      return this.cart.reduce((acc, product) => acc + product.quantity, 0);
    },
  },
};
</script>
