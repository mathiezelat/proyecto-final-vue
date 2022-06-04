import api from '@/services/api.services.js'

export default {
    namespaced: true,
    state: {
        orders: [],
    },
    getters: {
        getOrders: (state) => {
            return state.orders
        }
    },
    mutations: {
        SET_ORDERS: (state, payload) => {
            state.orders = payload
        },
        ADD_ORDER: (state, payload) => {
            state.orders.push(payload)
        }
    },
    actions: {
        setOrders: async (context, userId) => {
            let result = null
            const data = await api.getOrders(userId)
            result = data

            if(result !== null) {
                context.commit('SET_ORDERS', result)
            }
        },
        addOrder: async (context, newOrder) => {
            context.commit('ADD_ORDER', newOrder)
        }
    }
}