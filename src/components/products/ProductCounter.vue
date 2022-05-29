<template>
  <div class="flex my-2">
    <button class="px-2 py-1 border-2 border-black bg-black hover:bg-white text-white hover:text-black transition-colors" @click="restar">
      <font-awesome-icon icon="fa-solid fa-minus" size="lg" />
    </button>
    <div class="px-3 py-1 font-bold border-y-2 border-black">
      {{ counter }}
    </div>
    <button class="px-2 py-1 border-2 border-black bg-black hover:bg-white text-white hover:text-black transition-colors" @click="sumar">
      <font-awesome-icon icon="fa-solid fa-plus" size="lg" />
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCounter",
  props: {
    productStock: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number
    }
  },
  data() {
    return {
      counter: this.quantity,
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
    }
  },
};
</script>
