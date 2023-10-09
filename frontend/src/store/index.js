import Vuex from 'vuex';
import http from '../http'

const state = {
    user: null,
    token: localStorage.getItem('token') || '',
};

const getters = {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_TOKEN(state, token) {
        http.defaults.headers.common['Authorization'] = token;
        state.token = token;
        localStorage.setItem('token', token);
    },
    LOGOUT(state) {
        state.user = null;
        state.token = '';
        localStorage.removeItem('token');
        delete http.defaults.headers.common['Authorization'];
    },
};

const actions = {
    async login({ commit }, credentials) {
        try {
            const response = await http.post('/api/login', credentials);
            const { user, token } = response.data;
            commit('SET_USER', user);
            commit('SET_TOKEN', token.trim());

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async register({ commit }, userData) {
        try {
            const response = await http.post('/api/register', userData);

            // If registration is successful, commit a mutation or take any necessary action
            commit('SET_USER', response.data.user);
            commit('SET_TOKEN', response.data.token);

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async logout({ commit }) {
        commit('LOGOUT');
    },
    async genrateData({ commit }) {
        try {
            const response = await http.post('/api/generate-data');

            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async getData({ commit }) {
        try {
            const response = await http.get('/api/fetch-data');

            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});