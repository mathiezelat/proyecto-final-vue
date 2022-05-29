<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <h1 class="text-4xl font-bold">
        Admin
    </h1>
    <div class="py-4">
      <router-link :to="{
          name: 'update',
          params: { id: 'agregar' } 
        }"
        class="
          py-2
          px-4
          font-semibold
          hover:text-slate-900
          text-white
          border-2
          hover:border-slate-900
          hover:bg-white
          bg-slate-900
          transition-colors
        "
      >
        Agregar producto
      </router-link>
    </div>
    <div>
      <p class="text-xl font-semibold">Productos</p>
      <table class="table-fixed border-collapse w-full border border-slate-500">
        <thead>
          <tr>
            <th class="border border-slate-300">Producto</th>
            <th class="border border-slate-300">Imagen</th>
            <th class="border border-slate-300">Precio</th>
            <th class="border border-slate-300">Stock</th>
            <th class="border border-slate-300">Actualizar</th>
            <th class="border border-slate-300">Borrar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td class="border border-slate-300 p-2 text-center text-lg font-semibold">
              {{ product.name }}
            </td>
            <td>
              <img :src="product.img" :alt="product.name" >
            </td>
            <td class="border border-slate-300 p-2 text-center text-lg font-semibold">
              $ {{ product.price }}
            </td>
            <td class="border border-slate-300 p-2 text-center text-lg font-semibold">
              {{ product.stock }}
            </td>
            <td class="border border-slate-300 p-2 text-center">
              <router-link :to="{
                name: 'update',
                params: { id: product.id, product } 
              }">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" />
              </router-link>
            </td>
            <td class="border border-slate-300 p-2 text-center">
              <button @click="deleteProduct(product.id)">
                <font-awesome-icon icon="fa-solid fa-trash" size="xl" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.services.js"

export default {
    name: "AdminView",
    props: {
      user: {
        type: Object
      }
    },
    data() {
      return {
        products: []
      }
    },
    methods: {
      async getProducts() {
        if(this.user?.isAdmin) {
          this.products = await api.getProducts()
        } else {
          this.$router.push("/login")
        }
      },
      async deleteProduct(productId) {
        await api.deleteProduct(productId)
        this.products = this.products.filter(product => product.id !== productId)
      }
    },
    mounted() {
      this.getProducts()
    }
}
</script>
