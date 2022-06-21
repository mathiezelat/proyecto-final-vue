<template>
  <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col justify-center items-center gap-2">
    <p class="text-xl font-medium">
        La página que intentas acceder no existe
    </p>
    <router-link to="/" class="
            py-2
            px-4
            font-bold
            border-2 border-black
            bg-black
            hover:bg-white
            text-white
            hover:text-black
            transition-colors
            disabled:opacity-75
            disabled:hover:bg-black
            disabled:hover:text-white
        ">
        Ir al inicio
    </router-link>
  </div>
</template>

<script>
export default {
    name: 'NotFound'
}
</script>
