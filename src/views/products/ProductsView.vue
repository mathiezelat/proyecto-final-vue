<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div v-if="isExistingCategory">
      <p class="text-xl font-medium py-2">
        {{ categoryName }}
      </p>
      <div class="flex flex-wrap gap-2">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          :cart="getCart"
        />
      </div>
    </div>
    <div class="text-xl text-center pb-9" v-else>
      <p>
        La categoria no existe
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/services/api.services.js";
import ProductCard from "@/components/products/ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    ProductCard,
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  data() {
    return {
      products: [],
      categories: [],
      category: null,
      categoryName: "",
      title: "Productos",
      isExistingCategory: true,
    };
  },
  async created() {
    await this.setProducts();
  },
  methods: {
    async setProducts() {
      this.products = this.getProducts;
      this.categories = this.getCategories;
      if (!this.products.length && !this.products.length) {
        const [products, categories] = await Promise.all([
          api.getProducts(),
          api.getCategories(),
        ]);
        this.products = products.map((product) => {
          const { name } = categories.find(
            (category) => category.id === product.categoryId
          );
          return { category: name, ...product };
        });
        this.categories = categories;
      }
      if (this.$route.query.category) {
        this.products = this.products.filter(
          (product) => product.categoryId === this.$route.query.category
        );
        this.category = this.categories.find(
          (category) => category.id === this.$route.query.category
        );
        this.categoryName = this.category?.name;
        this.title = this.categoryName;
      }
      if (this.category === undefined) {
        this.isExistingCategory = false;
      }
    },
  },
  computed: {
    ...mapGetters("products", ["getProducts"]),
    ...mapGetters("categories", ["getCategories"]),
    ...mapGetters("cart", ["getCart"]),
  },
};
</script>
