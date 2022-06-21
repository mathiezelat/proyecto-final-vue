<template>
  <div class="mx-auto w-full flex flex-col pb-2 items-center justify-center">
    <div class="flex py-5 border-b w-full" v-for="product in cart" :key="product.id">
      <div>
        <img 
          class="h-full sm:h-28 w-32 object-cover rounded"
          :src="product.img" 
          :alt="product.name"
        >
      </div>
      <div class="flex justify-between flex-wrap w-full px-2">
        <div class="flex flex-col items-start xs:w-2/5 sm:w-1/2">
            <div class="flex gap-2">
              <p class="text-lg font-semibold">
                {{ product.name }}
              </p>
              <button class="" @click="deleteToCart(product)">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
            <p class="text-sm opacity-85">
              {{ product.category }}
            </p>
            <p class="text-sm opacity-80">
              {{ product.detail }}
            </p>
        </div>
        <div class="flex justify-start items-start gap-2">
            <button class="px-1 bg-black rounded text-white disabled:opacity-0" @click="subtractFromCart(product)" :disabled="product.quantity <= 1">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
            <p>
              {{ product.quantity }}
            </p>
            <button class="px-1 bg-black rounded text-white disabled:opacity-0" @click="sumToCart(product)" :disabled="product.quantity >= product.stock">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
        </div>
        <div class="flex items-start w-20">
          <p class="font-medium">
            ${{product.total}}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-end w-full">
      <p class="text-xl px-10 py-2 font-bold">
        Total $ {{ cartTotal }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  name: "CartTable",
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  methods: {
    ...mapActions("cart", ["addToCart", "deleteToCart"]),
    sumToCart(product) {
      if(product.quantity < product.stock) {
        this.addToCart({
          product,
          counter: ++product.quantity,
        })
      }
    },
    subtractFromCart(product) {
      if(product.quantity > 1) {
        this.addToCart({
          product,
          counter: --product.quantity,
        })
      }
    }
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((acc, product) => acc + product.total, 0);
    },
  },
};
</script>
