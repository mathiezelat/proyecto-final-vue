<template>
  <div class="home">
    <div class="flex flex-wrap justify-center gap-2">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        :cart="cart"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "HomeView",
  props: {
    products: {
      type: Array,
      required: true
    },
    cart: {
      type: Array,
      required: true
    }
  },
  components: {
    ProductCard,
  },
  methods: {
    addToCart({productId, counter}) {
      this.$emit("add-to-cart", {
        productId,
        counter,
      });
    },
  }
};
</script>
