import api from '@/services/api.services.js'

export default {
    namespaced: true,
    state: {
        categories: []
    },
    getters: {
        getCategories: (state) => {
            return state.categories
        }
    },
    mutations: {
        SET_CATEGORIES: (state, payload) => {
            state.categories = payload
        }
    },
    actions: {
        setCategories: async (context) => {
            try {
                let result = null

                const data = await api.getCategories()

                result = data

                if(result !== null) {
                    context.commit('SET_CATEGORIES', result)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}