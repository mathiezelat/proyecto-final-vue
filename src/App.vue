<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import NavBar from "@/components/NavBar.vue"

export default {
  name: "App",
  components: {
    NavBar,
  },
  created() {
    this.setProducts()
    if(this.getUser) this.setOrders(this.getUser.id)
  },
  methods: {
    ...mapActions("products", ["setProducts"]),
    ...mapActions("orders", ["setOrders"]),
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
  }
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
