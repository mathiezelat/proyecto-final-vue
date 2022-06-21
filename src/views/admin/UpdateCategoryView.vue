<template>
  <div class="max-w-2xl rounded mx-auto py-10 mt-10 px-4">
    <form @submit.prevent="submitForm" class="max-w-xl mx-auto">
      <div class="grid grid-cols-1 gap-1 items-start relative">
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="name"> 
            Nombre de la categoria 
          </label>
          <input
            class="
              rounded-md
              border-gray-300
              shadow-sm
              transition
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
            :class="{
              'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50':
                $v.form.name.$error,
            }"
            type="text"
            id="name"
            v-model.trim="$v.form.name.$model"
          />
          <div
            class="text-xs font-bold text-red-600 absolute bottom-0"
            v-if="$v.form.name.$dirty"
          >
            <p v-if="!$v.form.name.required">
              Categoria del producto es requerido
            </p>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-1 pb-5 relative">
          <label class="text-lg" for="img">
            URL de la imagen de la categoria
          </label>
          <input
            class="
              rounded-md
              border-gray-300
              shadow-sm
              transition
              focus:border-indigo-300
              focus:ring
              focus:ring-indigo-200
              focus:ring-opacity-50
            "
            :class="{
              'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50':
                $v.form.img.$error,
            }"
            type="text"
            id="img"
            v-model.trim="$v.form.img.$model"
          />
          <div
            class="text-xs font-bold text-red-600 absolute bottom-0"
            v-if="$v.form.img.$dirty"
          >
            <p v-if="!$v.form.img.required">
              URL de la imagen de la categoria es requerido
            </p>
            <p v-if="!$v.form.img.url">URL de la imagen es inválido</p>
          </div>
        </div>
        <div class="justify-self-center">
          <button
            type="submit"
            class="
              py-2
              px-4
              font-semibold
              hover:text-slate-900
              text-white
              border-2
              hover:border-slate-900 hover:bg-white
              bg-slate-900
              transition-colors
            "
          >
            {{ buttonMessage }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { required, url } from "vuelidate/lib/validators";
import api from "@/services/api.services.js";

export default {
  name: "UpdateProductView",
  data() {
    return {
      id: this.$route.params.id,
      form: {
        name: "",
        img: "",
      },
      errorSubmit: false,
      errorMessage: "",
    };
  },
  validations: {
    form: {
      name: {
        required,
      },
      img: {
        required,
        url,
      },
    },
  },
  created() {
    this.getCategories();
  },
  computed: {
    ...mapGetters("user", ["getUser"]),
    buttonMessage: {
      get() {
        return this.id !== "agregar"
          ? "Actualizar categoria"
          : "Agregar categoria";
      },
    },
  },
  methods: {
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorSubmit = true;
        this.errorMessage = "Campos inválidos";
      } else {
        const form = {
          name: this.form.name,
          img: this.form.img,
        };
        if (this.id === "agregar") {
          await api.saveCategory(form);
        } else {
          await api.updateCategory(this.id, form);
        }
        this.errorSubmit = false;
        this.$router.push("/admin");
      }
    },
    async getCategories() {
      if (this.getUser?.isAdmin) {
        if (this.id !== "agregar") {
          const category = await api.getCategory(this.id);
          if (category) {
            this.form = {
              name: category.name,
              img: category.img,
            };
          } else {
            this.$router.push("/admin");
          }
        }
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
