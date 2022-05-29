import axios from "axios"

const apiUrl = process.env.VUE_APP_API_URL

const api = {
    getUsers: async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/users`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    getUser: async (userId) => {
        try {
            const { data } = await axios.get(`${apiUrl}/users/${userId}`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    loginUser: async (email, password) => {
        try {
            const users = await api.getUsers()
            const user = users.find(user => user.email === email && user.password === password)
            return user
        } catch (error) {
            console.error(error)
        }
    },
    isUserExists: async(email) => {
        try {
            const users = await api.getUsers()
            const userEmail = users.find(user => user.email === email)
            return userEmail !== undefined
        } catch (error) {
            console.error(error)
        }
    },
    createUser: async (email, password) => {
        try {
            const { data } = await axios.post(`${apiUrl}/users`, {email, password})
            return data
        } catch (error) {
            console.error(error)
        }
    },
    getProducts: async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/products`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    getProduct: async (productId) => {
        try {
            const { data } = await axios.get(`${apiUrl}/products/${productId}`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    saveProduct: async (newProduct) => {
        try {
            const { data } = await axios.post(`${apiUrl}/products`, newProduct)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    updateProduct: async (productId, newProduct) => {
        try {
            const { data } = await axios.put(`${apiUrl}/products/${productId}`, newProduct)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    deleteProduct: async (productId) => {
        try {
            const { data } = await axios.delete(`${apiUrl}/products/${productId}`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    getOrders: async (userId) => {
        try {
            const { data } = await axios.get(`${apiUrl}/users/${userId}/orders`)
            return data
        } catch (error) {
            console.error(error)
        }
    },
    saveOrder: async (userId, newOrder) => {
        try {
            const { data } = await axios.post(`${apiUrl}/users/${userId}/orders`, newOrder)
            return data
        } catch (error) {
            console.error(error)
        }
    }
}

export default api