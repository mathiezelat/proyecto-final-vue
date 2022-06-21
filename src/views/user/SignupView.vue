<template>
  <div class="max-w-2xl rounded mx-auto py-10 px-4 mt-10">
    <FormRegister />
        <div class="pt-10">
        <p class="text-center">
            ¿Ya tenés una cuenta?
            <router-link class="text-emerald-500" to="/login">
                Inicia sesión
            </router-link>
        </p>
    </div>
  </div>
</template>

<script>
import FormRegister from "@/components/user/FormRegister.vue";

export default {
  components: {
    FormRegister
  },
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    isUserLogged() {
      if(this.user) {
        this.$router.push("/")
      }
    }
  },
  mounted() {
    this.isUserLogged()
  }
}
</script>
