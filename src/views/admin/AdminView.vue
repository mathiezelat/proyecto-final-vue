<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <h1 class="text-4xl font-bold">
        Admin
    </h1>
    <div class="py-4">
      <router-link :to="{
          name: 'categoryUpdate',
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
        Agregar categoria
      </router-link>
      <router-link :to="{
          name: 'productUpdate',
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
      <p class="text-xl font-semibold">Categorias</p>
            <table class="table-fixed border-collapse w-full border border-slate-500">
        <thead>
          <tr>
            <th class="border border-slate-300">Categoria</th>
            <th class="border border-slate-300">Imagen</th>
            <th class="border border-slate-300">Actualizar</th>
            <th class="border border-slate-300">Borrar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td class="border border-slate-300 p-2 text-center text-lg font-semibold">
              {{ category.name }}
            </td>
            <td>
              <img :src="category.img" :alt="category.name" >
            </td>
            <td class="border border-slate-300 p-2 text-center">
              <router-link :to="{
                name: 'categoryUpdate',
                params: { id: category.id, category } 
              }">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" size="xl" />
              </router-link>
            </td>
            <td class="border border-slate-300 p-2 text-center">
              <button @click="deleteCategory(category.id)">
                <font-awesome-icon icon="fa-solid fa-trash" size="xl" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <p class="text-xl font-semibold">Productos</p>
      <table class="table-fixed border-collapse w-full border border-slate-500">
        <thead>
          <tr>
            <th class="border border-slate-300">Producto</th>
            <th class="border border-slate-300">Categoria</th>
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
            <td class="border border-slate-300 p-2 text-center text-lg font-semibold">
            {{ getCategoryById(product.categoryId).name }}
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
                name: 'productUpdate',
                params: { id: product.id, product, category: getCategoryById(product.categoryId) } 
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
import { mapGetters } from 'vuex';
import api from "@/services/api.services.js"

export default {
    name: "AdminView",
    metaInfo: {
      title: 'Admin'
    },
    data() {
      return {
        products: [],
        categories: [],
      }
    },
    created() {
      this.setCategories()
      this.setProducts()
    },
    computed: {
      ...mapGetters("user", ["getUser"]),
    },
    methods: {
      async setProducts() {
        if(this.getUser?.isAdmin) {
            this.products = await api.getProducts()
        } else {
          this.$router.push("/login")
        }
      },
      async setCategories() {
        if(this.getUser?.isAdmin) {
            this.categories = await api.getCategories()
        } else {
          this.$router.push("/login")
        }
      },
      getCategoryById(categoryId) {
        return this.categories.find(category => category.id === categoryId)
      },
      async deleteProduct(productId) {
        await api.deleteProduct(productId)
        this.products = this.products.filter(product => product.id !== productId)
      },
      async deleteCategory(categoryId) {
        await api.deleteCategory(categoryId)
        this.categories = this.categories.filter(category => category.id !== categoryId)
      }
    },
}
</script>
