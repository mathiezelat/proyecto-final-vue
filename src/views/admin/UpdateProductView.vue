<template>
  <div class="max-w-2xl rounded mx-auto py-10 mt-10 px-4">
    <form @submit.prevent="submitForm" class="max-w-xl mx-auto">
      <div class="grid grid-cols-1 gap-1 items-start relative">
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="name"> Nombre del producto </label>
          <input 
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.name.$error }"
            type="text" 
            id="name" 
            v-model.trim="$v.form.name.$model" 
          />
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.name.$dirty"
          >
            <p v-if="!$v.form.name.required">
              Nombre del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="detail"> 
            Detalles del producto 
          </label>
          <input
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.detail.$error }"
            type="text" 
            id="detail" 
            v-model.trim="$v.form.detail.$model" 
          />
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.detail.$dirty"
          >
            <p v-if="!$v.form.detail.required">
              Detalle del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="category"> 
            Categoria
          </label>
          <select
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
              w-full
              block
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.categoryId.$error }"
            id="category" 
            v-model.trim="$v.form.categoryId.$model" 
          >
            <option 
              v-for="category in categories" 
              :key="category.id" 
              :value="category.id">
                {{ category.name }}
              </option>
          </select>
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.categoryId.$dirty"
          >
            <p v-if="!$v.form.categoryId.required">
              Categoria del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="price">
              Precio del producto 
          </label>
          <input 
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.price.$error }"
            type="number" 
            id="price"  
            v-model.number="$v.form.price.$model" 
          />
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.price.$dirty"
          >
            <p v-if="!$v.form.price.required">
              Precio del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="stock">
              Stock del producto 
          </label>
          <input 
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.stock.$error }"
            type="number" 
            id="stock" 
            v-model.number="$v.form.stock.$model" 
          />
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.stock.$dirty"
          >
            <p v-if="!$v.form.stock.required">
              Stock del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="img" >
            URL de la imagen del producto
          </label>
          <input 
            class="
              rounded-md 
              border-gray-300 
              shadow-sm
              transition
              focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
            "
            :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.img.$error }"
            type="text" 
            id="img" 
            v-model.trim="$v.form.img.$model" 
          />
          <div 
            class="text-xs font-bold text-red-600 absolute bottom-0" 
            v-if="$v.form.img.$dirty"
          >
            <p v-if="!$v.form.img.required">
              URL de la imagen del producto es requerido
            </p>
            <p v-if="!$v.form.img.url">
              URL de la imagen es inválido
            </p>
          </div>
        </div>
        <div class="justify-self-center">
        <button type="submit" class="
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
        ">
          {{ buttonMessage }}
        </button>
      </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { required, url, numeric } from "vuelidate/lib/validators";
import api from "@/services/api.services.js";

export default {
  name: "UpdateProductView",
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        detail: "",
        categoryId: "",
        price: "",
        stock: "",
        img: "",
      },
      errorSubmit: false,
      errorMessage: "",
      categories: [],
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      detail: {
        required,
      },
      categoryId: {
        required,
        numeric
      },
      price: {
        required,
        numeric
      },
      stock: {
        required,
        numeric
      },
      img: {
        required,
        url
      }
    },
  },
  created() {
    this.getProduct()
    this.getCategories()
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    buttonMessage: {
      get() {
        return this.id !== "agregar"
          ? "Actualizar producto"
          : "Agregar producto";
      },
    },
  },
  methods: {
      async submitForm() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.errorSubmit = true
          this.errorMessage = "Campos inválidos"
        } else {
            const form = {
                name: this.form.name,
                detail: this.form.detail,
                categoryId: this.form.categoryId,
                price: Number(this.form.price),
                stock: Number(this.form.stock),
                img: this.form.img
            }
            if(this.id === 'agregar') {
                await api.saveProduct(form)
            } else {
                await api.updateProduct(this.id, form)
            }
            this.errorSubmit = false
            this.$router.push('/admin')
        }
      },
      async getProduct() {
        if(this.getUser?.isAdmin) {
            if(this.id !== 'agregar') {
              const product = await api.getProduct(this.id)
              if(product) {
                this.form = {
                  name: product.name,
                  detail: product.detail,
                  categoryId: product.categoryId,
                  price: product.price,
                  stock: product.stock,
                  img: product.img,
                }
              } else {
                this.$router.push("/admin")
              }
          }
        } else {
          this.$router.push("/login")
        }
      },
      async getCategories() {
          if(this.getUser?.isAdmin) {
            this.categories = await api.getCategories()
        } else {
          this.$router.push("/login")
        }
      }
  },
};
</script>
