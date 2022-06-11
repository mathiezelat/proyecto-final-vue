<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div class="flex flex-wrap gap-2">
      <ProductCard
        v-for="product in getProducts"
        :key="product.id"
        :product="product"
        :cart="getCart"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "HomeView",
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    ...mapGetters("cart", ["getCart"])
  }
};
</script>
