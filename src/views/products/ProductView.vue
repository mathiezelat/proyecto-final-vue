<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-5 h-full w-full">
      <img
        class="object-cover h-full w-full rounded"
        :src="product.img"
        :alt="product.name"
      />
      <div class="flex flex-col h-full w-full justify-center">
        <div>
          <h1 class="font-bold text-4xl">
            {{ product.name }}
          </h1>
          <p class="font-medium text-lg">
            {{ product.category }}
          </p>
          <p class="font-semibold text-2xl">
            $ {{ product.price }}
          </p>
          <p class="text-lg font-base opacity-75">
            {{ product.detail }}
          </p>
        </div>
        <ProductCounter
          :productStock="product.stock"
          :quantity="counter"
          @emit-counter="updateCounter"
        />
        <p class="font-semibold" v-if="product.stock < 1">
          Sin Stock
        </p>
        <button
          class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
          "
          @click="updateCart({product, counter})"
          :disabled="product.stock < 1"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <div class="text-xl text-center pb-9" v-if="!isExistingProduct">
      <p>
        La producto no existe
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import api from "@/services/api.services.js"
import ProductCounter from "@/components/products/ProductCounter.vue"

export default {
  name: "ProductView",
  components: {
    ProductCounter,
  },
  metaInfo() {
    return {
      title: this.title
    }
  },
  data() {
    return {
      product: null,
      id: this.$route.params.id,
      changeButton: false,
      buttonText: "Agregar al carrito",
      buttonColor: "agregar",
      counter: 1,
      title: '...',
      isExistingProduct: true
    };
  },
  async created() {
    await this.getProduct()
    this.getInCart()
  },
  methods: {
    ...mapActions("cart", ["addToCart", "deleteToCart"]), 
    async getProduct() {
      this.product = this.getProductById(this.id)
      if(!this.product) {
        const product = await api.getProduct(this.id)
        if(product) {
          const { name } = await api.getCategory(product.categoryId)
          this.product = { category: name, ...product }
          this.title = this.product.name
        } else {
          this.isExistingProduct = false
        }
      } else {
        this.title = this.product.name
      }
    },
    updateCounter({ counter, buttonText, buttonColor }) {
      this.counter = counter;
      if (this.changeButton) {
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
      }
    },
    updateCart() {
      if(this.product.stock > 0) {
        if (this.counter > 0) {
          this.changeButton = true;
          this.buttonText = "Agregado"
          this.buttonColor = "agregado"
          this.addToCart({
            product: this.product,
            counter: this.counter,
          })
        } else {
          this.changeButton = false;
          this.buttonText = "Agregar al carrito"
          this.buttonColor = "agregar"
          this.deleteToCart(this.product)
        }
      }
    },
    getInCart() {
      const product = this.getInCartById(this.id)
      if(product !== undefined) {
        this.counter = product.quantity
        this.changeButton = true;
        this.buttonText = "Agregado";
        this.buttonColor = "agregado";
      }
    }
  },
  computed: {
    ...mapGetters("products", ["getProductById"]),
    ...mapGetters("cart", ["getCart", "getInCartById"])
  }
};
</script>
