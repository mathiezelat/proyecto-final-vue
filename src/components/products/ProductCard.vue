<template>
  <div class="card">
    <img :src="product.img" :alt="product.name" />
    <div>
      <p class="font-semibold text-lg">
        {{ product.name }}
      </p>
      <p class="font-semibold">$ {{ product.price }}</p>
      <p>Disponibles: {{ product.stock }}</p>
      <ProductCounter
        :productStock="product.stock"
        @emit-counter="updateCounter"
      />
      <button class="button text-white" :class="buttonColor" @click="addToCart">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import ProductCounter from "@/components/products/ProductCounter.vue";
export default {
  name: "ProductCard",
  components: {
    ProductCounter,
  },
  props: {
    product: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      changeButton: false,
      buttonText: "Agregar al carrito",
      buttonColor: "agregar",
      counter: 1,
    };
  },
  methods: {
    updateCounter({ counter, buttonText, buttonColor }) {
      this.counter = counter;
      if (this.changeButton) {
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
      }
    },
    addToCart() {
      if (this.counter > 0) {
        this.changeButton = true;
        this.buttonText = "Agregado";
        this.buttonColor = "agregado";
      } else {
        this.changeButton = false;
        this.buttonText = "Agregar al carrito";
        this.buttonColor = "agregar";
      }
      this.$emit("add-to-cart", {
        productId: this.product.id,
        counter: this.counter,
      });
    },
  },
};
</script>

<style scoped>
.card {
  @apply flex flex-col font-sans h-96 w-60 overflow-hidden drop-shadow rounded bg-white border border-gray-300;
}

.card > img {
  @apply object-cover h-full w-full;
}

.card > div {
  @apply flex flex-col w-full justify-between gap-2 p-2;
}

.button {
  @apply w-full border rounded p-2;
}

.agregar {
  @apply bg-green-500;
}

.agregado {
  @apply bg-blue-500;
}

.actualizar {
  @apply bg-yellow-500;
}

.eliminar {
  @apply bg-red-500;
}
</style>