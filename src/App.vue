<template>
  <div id="app">
    <NavBar />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import NavBar from "@/components/NavBar.vue"
import FooterComponent from "@/components/FooterComponent.vue"

export default {
  name: "App",
  components: {
    NavBar,
    FooterComponent
  },
  metaInfo: {
    title: 'Inicio',
    titleTemplate: '%s | Vue Eats'
  },
  created() {
    this.setCategories()
    this.setProducts()
    if(this.getUser) this.setOrders(this.getUser.id)
  },
  methods: {
    ...mapActions("products", ["setProducts"]),
    ...mapActions("categories", ["setCategories"]),
    ...mapActions("orders", ["setOrders"]),
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
  }
};
</script>


<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 
nav {
  padding: 30px;
} */

/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */
/* 
nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
