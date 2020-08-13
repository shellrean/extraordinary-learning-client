import $axios from '@/core/services/api.service'

const state = () => ({
	abcents: []
})

const mutations = {
	ASSIGN_DATA_ABCENTS(state, payload) {
		state.abcents = payload
	}
}

const actions = {
	storeAbcentToday({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post('abcents', payload)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getAbcentToday({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`abcents/subject/${payload.subject_id}/classroom/${payload.classroom_id}/today`)

				commit('ASSIGN_DATA_ABCENTS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}