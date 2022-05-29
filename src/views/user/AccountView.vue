<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <div v-if="user">
      <h1 class="text-4xl">¡Bienvenido, {{ user.email }}!</h1>
      <div v-if="orders.length > 0" class="py-5">
        <p class="text-2xl font-bold pb-2">Pedidos</p>
        <div class="flex flex-col-reverse justify-center gap-5">
          <div class="border-y py-2" v-for="order in orders" :key="order.id">
            <p class="text-xl font-semibold">Fecha {{ Date(order.createdAt) }}</p>
            <table
              class="table-fixed border-collapse w-full border border-slate-500"
            >
              <thead>
                <tr>
                  <th class="border border-slate-300">Producto</th>
                  <th class="border border-slate-300">Cantidad</th>
                  <th class="border border-slate-300">Precio</th>
                  <th class="border border-slate-300">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in order.products" :key="product.id">
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
            <p class="text-xl">Total: $ {{ order.total }}</p>
          </div>
        </div>
      </div>
      <p v-else>
          No tenés pedidos
      </p>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.services.js";

export default {
  name: "AccountView",
  props: {
    user: {
      type: Object,
    },
  },
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async getOrders() {
      if(this.user) {
        this.orders = await api.getOrders(this.user.id)
      } else {
        this.$router.push("login")
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
