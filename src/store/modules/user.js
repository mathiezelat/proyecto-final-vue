export default {
    namespaced: true,
    state: {
        user: JSON.parse(localStorage.getItem("user")) || null
    },
    getters: {
        getUser: (state) => {
            return state.user
        }
    },
    mutations: {
        LOGIN_USER: (state, user) => {
            delete user.password
            state.user = user
            localStorage.setItem('user', JSON.stringify(user))
        },
        LOGOUT_USER: (state) => {
            state.user = null
            localStorage.removeItem('user')
        },
    },
    actions: {
        loginUser: (context, user) => {
            context.commit('LOGIN_USER', user)
        },
        logoutUser: (context) => {
            context.commit('LOGOUT_USER')
        }
    },
}