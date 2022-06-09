<template>
  <form class="max-w-xl mx-auto" @submit.prevent="submitForm">
    <div class="grid grid-cols-1 gap-1 items-start relative">
      <div class="grid grid-cols-1 gap-1 pb-5 relative">
        <label class="text-lg" for="name">Nombre</label>
        <input
          type="text" 
          class="
            rounded-md 
            border-gray-300 
            shadow-sm
            transition
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          "
          :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.name.$error }"
          id="name"
          v-model.trim="$v.form.name.$model" 
        />
        <div class="text-xs font-bold text-red-600 absolute bottom-0" v-if="$v.form.name.$dirty">
          <p v-if="!$v.form.name.required">
            Nombre es requerido
          </p>
          <p v-if="!$v.form.name.alpha">
            Nombre es inválido
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-1 pb-5 relative">
        <label class="text-lg" for="email">Correo electrónico</label>
        <input
          type="email" 
          class="
            rounded-md 
            border-gray-300 
            shadow-sm
            transition
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          "
          :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.email.$error }"
          id="email"
          v-model.trim="$v.form.email.$model" 
        />
        <div class="text-xs font-bold text-red-600 absolute bottom-0" v-if="$v.form.email.$dirty">
          <p v-if="!$v.form.email.required">
            Correo electrónico es requerido
          </p>
          <p v-if="!$v.form.email.email">
            Correo electrónico es inválido
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-1 pb-5 relative">
        <label class="text-lg" for="password">
          Contraseña
        </label>
        <input
          type="password"
          class="
            rounded-md 
            border-gray-300 
            shadow-sm
            transition
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          "
          :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.password.$error }"
          id="password"
          v-model.trim="$v.form.password.$model"
        />
        <div class="text-xs font-bold text-red-600 absolute bottom-0" v-if="$v.form.password.$dirty">
          <p v-if="!$v.form.password.required">
            Contraseña es requerido
          </p>
          <p v-if="!$v.form.password.minLength">
            Contraseña tiene que tener al menos {{ $v.form.password.$params.minLength.min }} caracteres
          </p>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-1 pb-5 relative">
        <label class="text-lg" for="confirmPassword">
          Confirmar contraseña
        </label>
        <input
          type="password"
          class="
            rounded-md 
            border-gray-300 
            shadow-sm
            transition
            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
          "
          :class="{'border-red-300 focus:border-red-500 focus:ring-red-200 focus:ring-opacity-50': $v.form.confirmPassword.$error }"
          id="confirmPassword"
          v-model.trim="$v.form.confirmPassword.$model"
        />
        <div class="text-xs font-bold text-red-600 absolute bottom-0" v-if="$v.form.confirmPassword.$dirty">
          <p v-if="!$v.form.confirmPassword.sameAsPassword">
            Confimar contraseña debe ser idéntica a la contraseña
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
          Registrarse
        </button>
      </div>
      <div class="text-xs font-bold text-red-600 py-2 text-center justify-self-center absolute -bottom-10" v-if="errorSubmit">
        <p>{{errorMessage}}</p>
      </div>
    </div>
  </form>
</template>

<script>
import { required, minLength, email, alpha, sameAs } from "vuelidate/lib/validators";
import api from "@/services/api.services.js";

export default {
  name: "FormRegister",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: null,
      },
      errorSubmit: false,
      errorMessage: ""
    };
  },
  validations: {
    form: {
      name: {
        required,
        alpha
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(7),
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      }
    },
  },
  methods: {
    resetForm() {
      Object.keys(this.form).forEach((key) => (this.form[key] = ""));
    },
    async submitForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.errorSubmit = true;
        this.errorMessage = "Campos inválidos"
      } else {
        const isUserExists = await api.isUserExists(this.form.email)
        if(isUserExists) {
          this.errorSubmit = true;
          this.errorMessage = "Ya existe un usuario con ese correo electrónico"
        } else {
          this.errorSubmit = false
          await api.createUser(this.form.name, this.form.email, this.form.password)
          this.$v.$reset()
          this.resetForm()
          this.$router.push("/login")
        }
      }
    },
  },
};
</script>
