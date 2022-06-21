<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div class="py-2">
      <p class="text-xl font-medium">
        Categorias
      </p>
      <div class="flex gap-2 py-2 overflow-auto">
        <router-link
          v-for="category in getCategories"
          :key="category.id"
          :to="{
            name: 'products',
            query: { category: category.id }
          }"
          class="
            flex-none w-36 h-36 lg:w-48 lg:h-48 
            rounded shadow hover:shadow-md transition
            hover:brightness-95
            overflow-hidden
            relative
          "
        >
          <p class="absolute bottom-2 left-0 right-0 px-2 text-xs lg:text-base font-semibold bg-black text-white">
            {{ category.name }}
          </p>
          <img 
            :src="category.img" 
            :alt="category.name"
            class="object-cover w-full h-full"
          >
        </router-link >
      </div>
    </div>
    <div class="py-2">
      <p class="text-xl font-medium">
        Productos
      </p>
      <div class="flex flex-wrap gap-2 py-2">
        <ProductCard
          v-for="product in getProducts"
          :key="product.id"
          :product="product"
          :cart="getCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import ProductCard from "@/components/products/ProductCard.vue"

export default {
  name: "HomeView",
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("cart", ["getCart"]),
  }
};
</script>
