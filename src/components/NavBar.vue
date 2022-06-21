<template>
  <div class="bg-emerald-500 mb-5 shadow-sm">
    <nav class="relative max-w-7xl mx-auto px-4 py-4">
      <div class="mx-auto w-full h-full flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <router-link 
            to="/" 
            class="text-3xl font-bold text-white"
            @click.native="closeNavbar"
          >
            Vue Eats
          </router-link>
          <button 
            class="text-white leading-none px-3 block lg:hidden"
            @click="toggleNavbar"
          >
            <font-awesome-icon 
              v-if="!showMenu"
              class="text-white" 
              icon="fa-solid fa-bars" 
              size="2xl" 
            />
            <font-awesome-icon
              v-else
              class="text-white" 
              icon="fa-solid fa-xmark" 
              size="2xl" 
            />
          </button>
        </div>
        <div 
          :class="{'hidden': !showMenu, 'flex': showMenu}"
          class="pt-2 lg:pt-0 w-full lg:w-min bg-emerald-500 flex-col lg:flex-row lg:flex lg:flex-grow lg:items-center justify-end gap-1"
        >
          <router-link 
            to="/login"
            class="flex justify-center items-center rounded py-3 px-3 bg-blue-500 hover:bg-blue-600 text-white transition font-semibold"
            v-if="!getUser"
            @click.native="closeNavbar"
          >
            Iniciar sesión
          </router-link>
          <router-link 
            :to="getUser.isAdmin ? '/admin' : '/account'"
            class="flex justify-center items-center rounded py-3 px-3 bg-blue-500 hover:bg-blue-600 text-white transition font-semibold"
            v-if="getUser"
            @click.native="closeNavbar"
          >
            {{ getUser.isAdmin ? 'Admin': 'Cuenta' }}
          </router-link>
          <button 
            class="rounded py-3 px-3 bg-red-500 hover:bg-red-600 text-white transition font-semibold"
            v-if="getUser"
            @click="handlerLogoutUser"
          >
            Cerrar sesión
          </button>
          <router-link
            to="/cart"
            class="relative flex justify-center items-center rounded py-3 px-3 bg-emerald-100/5 hover:bg-emerald-100/10 transition text-white gap-1 font-semibold"
            @click.native="closeNavbar"
          >
            Carrito
            <font-awesome-icon icon="fa-solid fa-cart-shopping" size="lg" />
            <span 
              v-if="cartCounter > 0"
              class="flex justify-center items-center bg-black w-5 h-5 rounded-full text-sm font-bold absolute top-0 right-0"
            >
              {{ cartCounter }}
            </span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: "NavBar",
  data() {
    return {
      showModal: false,
      showMenu: false,
    };
  },
  methods: {
    ...mapActions("user", ["logoutUser"]),
    handlerLogoutUser(){
      this.logoutUser()
      this.closeNavbar()
      const path = this.$router.currentRoute.path
      if(path !== "/") this.$router.push("/")
    },
    confirmOrder() {
      this.closeNavbar()
      this.$emit("confirm-order")
    },
    toggleNavbar() {
      this.showMenu = !this.showMenu
    },
    closeNavbar() {
      this.showMenu = false
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
