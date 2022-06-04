<template>
  <div
    class="
      flex flex-col
      font-sans
      h-96
      w-60
      overflow-hidden
      drop-shadow
      rounded
      bg-white
      border border-gray-300
    "
  >
    <div class="group h-full w-full relative">
      <img
        class="object-cover h-full w-full"
        :src="product.img"
        :alt="product.name"
      />
      <router-link
        :to="{ 
          name: 'product',
          params: { id: product.id } 
        }"
        class="
          flex
          items-center
          justify-center
          absolute
          h-full
          w-full
          inset-0
          invisible
          group-hover:visible
          bg-black/0
          hover:bg-black/20
          transition
        "
      >
        <button class="bg-white rounded py-2 px-4 font-semibold border">
          Ver producto
        </button>
      </router-link>
    </div>
    <div class="flex flex-col w-full justify-between gap-2 p-2">
      <div class="font-semibold">
        <p class="text-lg">
          {{ product.name }}
        </p>
        <p>$ {{ product.price }}</p>
      </div>
      <button class="button text-white" 
        :class="buttonColor" 
        @click="updateToCart()"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      changeButton: false,
      buttonText: "Agregar al carrito",
      buttonColor: "agregar",
      counter: 1,
      isInCart: false,
    };
  },
  mounted() {
    this.getInCart()
  },
  methods: {
    ...mapActions("cart", ["addToCart", "deleteToCart"]),
    updateToCart() {
      if (this.counter > 0) {
        this.changeButton = true;
        this.buttonText = "Eliminar"
        this.buttonColor = "eliminar"
      } else {
        this.changeButton = false
        this.buttonText = "Agregar al carrito"
        this.buttonColor = "agregar"
      }
      if(!this.isInCart) {
        this.isInCart = true
        this.addToCart({
          product: this.product,
          counter: this.counter,
        })
      } else {
        this.changeButton = false;
        this.buttonText = "Agregar al carrito"
        this.buttonColor = "agregar"
        this.isInCart = false
        this.deleteToCart(this.product)
      }
    },
    getInCart() {
      const product = this.getInCartById(this.product.id)
      if(product) {
        this.counter = product.quantity
        this.changeButton = true
        this.buttonText = "Eliminar"
        this.buttonColor = "eliminar"
        this.isInCart = true
      }
    }
  },
  computed: {
    ...mapGetters("cart", ["getInCartById"])
  }
};
</script>
