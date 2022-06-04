import api from '@/services/api.services.js'

export default {
    namespaced: true,
    state: {
        products: []
    },
    getters: {
        getProducts: (state) => {
            return state.products
        },
        getProductById: (state) => (id) => {
            return state.products.find(product => product.id === id)
        }
    },
    mutations: {
        SET_PRODUCTS: (state, payload) => {
            state.products = payload
        }
    },
    actions: {
        setProducts: async (context) => {
            try {
                let result = null
                const data = await api.getProducts()
                result = data

                if(result !== null) {
                    context.commit('SET_PRODUCTS', result)
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
}
