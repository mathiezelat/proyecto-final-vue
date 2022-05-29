<template>
  <div
    class="
      flex flex-col
      font-sans
      h-96
      w-60
      overflow-hidden
      drop-shadow
      rounded
      bg-white
      border border-gray-300
    "
  >
    <div class="group h-full w-full relative">
      <img
        class="object-cover h-full w-full"
        :src="product.img"
        :alt="product.name"
      />
      <router-link
        :to="{ 
          name: 'product',
          params: { id: product.id } 
        }"
        class="
          flex
          items-center
          justify-center
          absolute
          h-full
          w-full
          inset-0
          invisible
          group-hover:visible
          bg-black/0
          hover:bg-black/20
          transition
        "
      >
        <button class="bg-white rounded py-2 px-4 font-semibold border">
          Ver producto
        </button>
      </router-link>
    </div>
    <div class="flex flex-col w-full justify-between gap-2 p-2">
      <div class="font-semibold">
        <p class="text-lg">
          {{ product.name }}
        </p>
        <p>$ {{ product.price }}</p>
      </div>
      <button class="button text-white" :class="buttonColor" @click="addToCart">
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
    cart: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      changeButton: false,
      buttonText: "Agregar al carrito",
      buttonColor: "agregar",
      counter: 1,
      isInCart: false,
    };
  },
  mounted() {
    this.isProductInCart()
  },
  methods: {
    addToCart() {
      if (this.counter > 0) {
        this.changeButton = true;
        this.buttonText = "Eliminar";
        this.buttonColor = "eliminar";
      } else {
        this.changeButton = false;
        this.buttonText = "Agregar al carrito";
        this.buttonColor = "agregar";
      }
      if(!this.isInCart) {
        this.isInCart = true
        this.$emit("add-to-cart", {
          productId: this.product.id,
          counter: this.counter,
        });
      } else {
        this.changeButton = false;
        this.buttonText = "Agregar al carrito"
        this.buttonColor = "agregar"
        this.isInCart = false
        this.$emit("add-to-cart", {
          productId: this.product.id,
          counter: 0,
        });
      }
    },
    isProductInCart() {
      const product = this.cart.find(product => product.id === this.product.id)
      if(product !== undefined) {
        this.isInCart = true
        this.changeButton = true;
        this.buttonText = "Eliminar";
        this.buttonColor = "eliminar";
      }
    }
  },
};
</script>
