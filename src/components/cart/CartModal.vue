<template>
  <div>
    <vue-final-modal
      name="cartModal"
      v-slot="{ close }"
      v-bind="$attrs"
      classes="flex justify-center items-center"
      content-class="relative flex flex-col p-10 max-h-full mx-4 p-4 border border-gray-300 shadow rounded bg-white"
      v-on="$listeners"
    >
      <div class="flex-grow overflow-y-auto">
        <CartTable v-if="cart.length > 0" :cart="cart" />
        <p v-else>No hay productos en el carrito</p>
      </div>
      <button
        class="absolute top-0 right-0 mt-2 mr-2 px-2 border rounded"
        @click="close"
      >
        x
      </button>
    </vue-final-modal>
  </div>
</template>

<script>
import { $vfm, VueFinalModal } from "vue-final-modal";
import CartTable from "@/components/cart/CartTable.vue";

export default {
  name: "CustomModal",
  components: {
    VueFinalModal,
    CartTable,
  },
  props: {
    cart: {
      type: Array,
    },
  },
  methods: {
    close() {
      $vfm.hide("cartModal");
    },
  },
};
</script>

<style>
</style>