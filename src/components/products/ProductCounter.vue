<template>
  <div class="flex justify-center">
    <button class="px-2" @click="restar">-</button>
    <div class="px-2">
      {{ counter }}
    </div>
    <button class="px-2" @click="sumar">+</button>
  </div>
</template>

<script>
export default {
  name: "ProductCounter",
  props: {
    productStock: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      counter: 1,
      buttonColor: "agregar",
      buttonText: "Agregar al carrito",
    };
  },
  methods: {
    restar() {
      if (this.counter > 0) {
        this.counter--;

        if (this.counter === 0) {
          this.buttonColor = "eliminar";
          this.buttonText = "Eliminar";
        } else {
          this.buttonColor = "actualizar";
          this.buttonText = "Actualizar";
        }

        this.$emit("emit-counter", {
          counter: this.counter,
          buttonColor: this.buttonColor,
          buttonText: this.buttonText,
        });
      }
    },
    sumar() {
      if (this.counter < this.productStock) {
        this.counter++;
        this.buttonColor = "actualizar";
        this.buttonText = "Actualizar";

        this.$emit("emit-counter", {
          counter: this.counter,
          buttonColor: this.buttonColor,
          buttonText: this.buttonText,
        });
      }
    },
  },
};
</script>

<style>
</style>