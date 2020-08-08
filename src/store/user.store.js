import $axios from '@/core/services/api.service'

const state = () => ({
	authenticated: {},
})

const mutations = {
	ASSING_USER_AUTH(state, payload) {
		state.authenticated = payload
	}
}

const actions = {
	getUserLogin({ commit }) {
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`user-authenticated`)

				commit('ASSING_USER_AUTH', network.data.data)
				resolve(network.data)
			} catch (error) {
				reject(error.response.data)
			}
		})
	}
}