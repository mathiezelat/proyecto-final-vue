<template>
  <div class="container mx-auto flex flex-col items-center justify-center">
    <table class="table-fixed border-collapse w-full border border-slate-500">
      <thead>
        <tr>
          <th class="border border-slate-300">Producto</th>
          <th class="border border-slate-300">Cantidad</th>
          <th class="border border-slate-300">Precio</th>
          <th class="border border-slate-300">Subtotal</th>
          <th class="border border-slate-300">Borrar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart" :key="product.id">
          <td class="border border-slate-300 p-2 text-center">
            {{ product.name }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            <button class="px-1 bg-black rounded text-white disabled:opacity-0" @click="subtractFromCart(product)" :disabled="product.quantity <= 1">
              <font-awesome-icon icon="fa-solid fa-minus" />
            </button>
            <span>
              {{ product.quantity }}
            </span>
            <button class="px-1 bg-black rounded text-white disabled:opacity-0" @click="sumToCart(product)" :disabled="product.quantity >= product.stock">
              <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
          </td>
          <td class="border border-slate-300 p-2 text-center">
            $ {{ product.price }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            $ {{ product.total }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            <button @click="deleteToCart(product)">
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-xl px-10 py-2">
      Total: $ {{ cartTotal }}
    </p>
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
