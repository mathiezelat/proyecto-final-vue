p<template>
  <modal
    name="cart-modal"
    :adaptive="true"
    :min-width="200"
    :min-height="200"
    :scrollable="true"
    :reset="true"
    width="60%"
    height="auto"
  >
    <div class="flex flex-col p-2">
      <div class="flex justify-end pb-2">
        <button class="border rounded py-1 px-3" @click="hide">
          <font-awesome-icon icon="fa-solid fa-xmark" size="xl" />
        </button>
      </div>
      <div class="flex flex-col" v-if="cart.length > 0">
        <CartTable :cart="cart" />
        <button 
          class="border rounded py-2 px-4"
          v-if="cart.length > 0 && user" 
          @click="confirmOrder"
        >
          Confirmar Compra
        </button>
      </div>
      <p class="text-xl text-center pb-9" v-else>
        No hay productos en el carrito
      </p>
    </div>
  </modal>
</template>

<script>
import CartTable from "@/components/cart/CartTable.vue";

export default {
  name: "CustomModal",
  components: {
    CartTable,
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
    user: {
      type: Object,
    },
  },
  methods: {
    hide() {
      this.$modal.hide("cart-modal");
    },
    confirmOrder() {
      this.$emit("confirm-order")
    }
  },
};
</script>
