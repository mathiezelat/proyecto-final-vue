<template>
  <div class="max-w-7xl border rounded mx-auto px-4 py-4">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-5 h-full w-full">
      <img
        class="object-cover h-full w-full rounded"
        :src="product.img"
        :alt="product.name"
      />
      <div class="flex flex-col h-full w-full justify-center">
        <div class="font-semibold">
          <h1 class="text-4xl">
            {{ product.name }}
          </h1>
          <p class="text-2xl">$ {{ product.price }}</p>
          <p class="text-lg font-normal">
            {{ product.detail }}
          </p>
        </div>
        <ProductCounter
          :productStock="product.stock"
          :quantity="counter"
          @emit-counter="updateCounter"
        />
        <button
          class="
            py-2
            px-4
            font-semibold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
          "
          @click="addToCart"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.services.js";
import ProductCounter from "@/components/products/ProductCounter.vue";

export default {
  name: "ProductView",
  components: {
    ProductCounter,
  },
  props: {
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      product: null,
      id: this.$route.params.id,
      changeButton: false,
      buttonText: "Agregar al carrito",
      buttonColor: "agregar",
      counter: 1
    };
  },
  methods: {
    async getProduct() {
      this.product = await api.getProduct(this.id);
    },
    updateCounter({ counter, buttonText, buttonColor }) {
      this.counter = counter;
      if (this.changeButton) {
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
      }
    },
    addToCart() {
      if (this.counter > 0) {
        this.changeButton = true;
        this.buttonText = "Agregado";
        this.buttonColor = "agregado";
      } else {
        this.changeButton = false;
        this.buttonText = "Agregar al carrito";
        this.buttonColor = "agregar";
      }
      this.$emit("add-to-cart", {
        productId: this.product.id,
        counter: this.counter,
      });
    },
    isProductInCart() {
      const product = this.cart.find(product => product.id === this.id) 
      if(product !== undefined) {
        this.counter = product.quantity
        this.changeButton = true;
        this.buttonText = "Agregado";
        this.buttonColor = "agregado";
      }
    }
  },
  mounted() {
    this.getProduct()
    this.isProductInCart()
  },
};
</script>
