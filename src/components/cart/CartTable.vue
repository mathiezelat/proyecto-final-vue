<template>
  <div class="container mx-auto flex flex-col items-end">
    <table class="table-fixed border-collapse w-full border border-slate-500">
      <thead>
        <tr>
          <th class="border border-slate-300">Producto</th>
          <th class="border border-slate-300">Cantidad</th>
          <th class="border border-slate-300">Precio</th>
          <th class="border border-slate-300">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in cart" :key="product.id">
          <td class="border border-slate-300 p-2 text-center">
            {{ product.name }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            {{ product.quantity }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            $ {{ product.price }}
          </td>
          <td class="border border-slate-300 p-2 text-center">
            $ {{ product.total }}
          </td>
        </tr>
      </tbody>
    </table>
    <p class="text-xl px-10">Total: $ {{ cartTotal }}</p>
  </div>
</template>

<script>
export default {
  name: "CartTable",
  props: {
    cart: {
      type: Array,
      require: true,
    },
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((acc, product) => acc + product.total, 0);
    },
  },
};
</script>

<style>
</style>