import $axios from '@/core/services/api.service'

const state = () => ({
	subjects: [],
	subject: {
		name: '',
		description: '',
		settings: {}
	},
	page: 1
})

const mutations = {
	ASSIGN_DATA_SUBJECTS(state, payload) {
		state.subjects = payload
	},
	ASSIGN_FORM_SUBJECT(state, payload) {
		state.subject = {
			name: payload.name,
			description: payload.description,
			settings: payload.settings
		}
	},
	CLEAR_FORM_SUBJECT(state, payload) {
		state.subject = {
			name: '',
			description: '',
			settings: {}
		}
	},
	SET_PAGE(state, payload) {
		state.page = payload
	}
}

const actions = {
	getDataSubjects({ commit, state }, payload) {
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		let search = typeof payload.search != 'undefined' ? payload.search : ''
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`subjects?page=${state.page}&perPage=${perPage}&q=${search}`)

				commit('ASSIGN_DATA_SUBJECTS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createNewSubject({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`subjects`, state.subject)

				commit('CLEAR_FORM_SUBJECT'),
				commit('CLEAR_ERROR', true, { root: true })
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				if (error.response && error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataSubject({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`subjects/${payload}`)

				commit('ASSIGN_FORM_SUBJECT', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	updateDataSubject({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.put(`subjects/${payload}`, state.subject)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	removeDataSubject({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.delete(`subjects/${payload}`)

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