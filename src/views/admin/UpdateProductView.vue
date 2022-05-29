<template>
  <div class="max-w-2xl rounded shadow-sm mx-auto py-10 mt-10 border">
    <form @submit.prevent="submitForm" class="max-w-xl mx-auto">
      <div class="grid grid-cols-1 gap-1 items-start relative">
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="name"> Nombre del producto </label>
          <input type="text" id="name" v-model.trim="$v.form.name.$model" />
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
          <input type="text" id="detail" v-model.trim="$v.form.detail.$model" />
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
          <label class="text-lg" for="price">
              Precio del producto 
          </label>
          <input type="number" id="price"  v-model.number="$v.form.price.$model" />
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
          <input type="number" id="stock" v-model.number="$v.form.stock.$model" />
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
          <input type="text" id="img" v-model.trim="$v.form.img.$model" />
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
import { required, url, numeric } from "vuelidate/lib/validators";
import api from "@/services/api.services.js";

export default {
  name: "UpdateProductView",
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        detail: "",
        price: "",
        stock: "",
        img: "",
      },
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
  computed: {
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
        this.$v.$touch();
        if (this.$v.$invalid) {
            console.log('Formulario inválido')
        } else {
            const form = {
                name: this.form.name,
                detail: this.form.detail,
                price: Number(this.form.price),
                stock: Number(this.form.stock),
                img: this.form.img
            }
            if(this.id === 'agregar') {
                await api.saveProduct(form)
            } else {
                await api.updateProduct(this.id, form)
            }
            this.$router.push('/admin')
            console.log('Formulario válido')
        }
      },
      async getProduct() {
        if(this.user?.isAdmin) {
            if(this.id !== 'agregar') {
              const product = await api.getProduct(this.id)
            if(product) {
              this.form = {
                name: product.name,
                detail: product.detail,
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
      }
  },
  mounted() {
    this.getProduct()
  }
};
</script>
