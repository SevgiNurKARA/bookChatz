import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    initializeAuth({ commit }) {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
          commit('setUser', user)
        }
      },
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:8000/users/login', credentials)
        const user = response.data
        commit('setUser', user)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout({ commit }) {
      commit('setUser', null)
      // Clear user from localStorage
      localStorage.removeItem('user')
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    user: state => state.user,
    userId: state => state.user ? state.user.id : null
  }
  
})