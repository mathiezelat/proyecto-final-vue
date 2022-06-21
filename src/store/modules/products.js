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

                const [data, categories] = await Promise.all([
                    api.getProducts(),
                    api.getCategories()
                ])

                result = data.map((product) => {
                    const { name } = categories.find(category => category.id === product.categoryId)
                    return { category: name, ...product }
                })

                if(result !== null) {
                    context.commit('SET_PRODUCTS', result)
                }
            } catch (error) {
                console.error(error);
            }
        }
    },
}
