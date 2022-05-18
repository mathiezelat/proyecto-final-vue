<template>
  <div id="app">
    <NavBar :cart="cart" />
    <div class="container mx-auto my-2 px-4 flex gap-4 justify-center">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="updateCart"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavBar from "@/components/NavBar.vue";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "App",
  components: {
    NavBar,
    ProductCard,
  },
  data() {
    return {
      products: [],
      cart: [],
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    async getProducts() {
      try {
        const response = await axios.get("./data/products.json");
        this.products = await response.data;
      } catch (error) {
        console.error(error);
      }
    },
    updateCart({productId, counter}) {
      const productInCart = this.cart.find(
        (product) => product.id === productId
      );
      if (counter > 0) {
        if (productInCart) {
          productInCart.quantity = counter;
          productInCart.total = productInCart.quantity * productInCart.price;
        } else {
          const productInProducts = this.products.find(
            (product) => product.id === productId
          );
          const newProductForCart = { ...productInProducts };

          this.cart.push({
            ...newProductForCart,
            quantity: counter,
            total: newProductForCart.price * counter,
          });
        }
      } else {
        this.cart = this.cart.filter(product => product.id !== productId)
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
