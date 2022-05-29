<template>
  <div class="max-w-2xl rounded shadow-sm mx-auto py-10 mt-10 border">
    <FormLogin @user-login="userLogin" />
    <div class="pt-10">
        <p class="text-center">
            ¿No tenés una cuenta?
            <router-link class="text-emerald-500" to="/signup">
                Registrate
            </router-link>
        </p>
    </div>
  </div>
</template>

<script>
import FormLogin from "@/components/user/FormLogin.vue";

export default {
  components: {
    FormLogin
  },
  props: {
    user: {
      type: Object
    }
  },
  methods: {
    userLogin(user) {
      this.$emit("user-login", user)
    },
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

