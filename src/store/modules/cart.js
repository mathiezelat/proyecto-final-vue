export default {
    namespaced: true,
    state: {
        cart: JSON.parse(localStorage.getItem("cart")) || []
    },
    getters: {
        getCart: (state) => {
            return state.cart
        },
        getInCartById: (state) => (id) => {
            return state.cart.find(cart => cart.id === id)
        }
    },
    mutations: {
        ADD_TO_CART: (state, {product, counter}) => {
            const inCart = state.cart.find(({id}) => id === product.id)

            if(inCart) {
                inCart.quantity = counter
                inCart.total = inCart.price * counter
            } else {
                state.cart.push({
                    ...product,
                    quantity: counter,
                    total: product.price * counter
                })
            }

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        DELETE_TO_CART: (state, product) => {
            state.cart.splice(state.cart.indexOf(product), 1)

            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        EMPTY_CART: (state) => {
            state.cart = []

            localStorage.removeItem('cart')
        }
    },
    actions: {
        addToCart: ({commit}, product) => {
            commit('ADD_TO_CART', product)
        },
        deleteToCart: ({commit}, product) => {
            commit('DELETE_TO_CART', product)
        },
        emptyCart: ({commit}) => {
            commit('EMPTY_CART')
        }
    },
}