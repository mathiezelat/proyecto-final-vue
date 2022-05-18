<template>
  <div class="relative bg-blue-200">
    <nav class="max-w-7xl mx-auto px-4 py-4">
      <div class="flex justify-between">
        <p class="text-2xl">Vue Desserts CH MEL</p>
        <button
          class="rounded py-2 px-4 bg-red-500 text-white"
          @click="openModal"
        >
          {{ cartCounter }}
        </button>
      </div>
    </nav>
    <CartModal v-model="showModal" :cart="cart" />
  </div>
</template>

<script>
import { $vfm } from "vue-final-modal";
import CartModal from "@/components/cart/CartModal.vue";

export default {
  name: "NavBar",
  components: {
    CartModal,
  },
  props: {
    cart: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      $vfm.show("cartModal");
    },
  },
  computed: {
    cartCounter() {
      return this.cart.reduce((acc, product) => acc + product.quantity, 0);
    },
  },
};
</script>

<style>
.button {
  @apply border rounded;
}
</style>