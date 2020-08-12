import $axios from '@/core/services/api.service'

const state = () => ({
	lectures: [],
	comments: [],
	lecture: {
		title: '',
		body: '',
		subject_id: '',
		isactive: false
	},
	page: 1
})

const mutations = {
	ASSIGN_DATA_LECTURES(state, payload) {
		state.lectures = payload
	},
	ASSIGN_DATA_COMMENTS(state, payload) {
		state.comments = payload
	},
	ASSIGN_FORM(state, payload) {
		state.lecture = {
			title: payload.title,
			body: payload.body,
			subject_id: payload.subject_id,
			isactive: payload.isactive
		}
	},
	CLEAR_FORM_LECTURE(state, payload) {
		state.lecture = {
			title: '',
			body: '',
			subject_id: '',
			isactive: false
		}
	},
	SET_PAGE(state, payload) {
		state.page = payload
	}
}

const actions = {
	getDataLectures({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		let search = typeof payload.search != 'undefined' ? payload.search : ''

		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`lectures?page=${state.page}&perPage=${perPage}&q=${search}`)

				commit('ASSIGN_DATA_LECTURES', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createNewLecture({ commit, state }) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`lectures`, state.lecture)

				commit('CLEAR_ERROR', true, { root: true })
				commit('CLEAR_FORM_LECTURE', true)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				if (error.response && error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false , { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataLecture({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`lectures/${payload}`)

				commit('ASSIGN_FORM', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	deleteDataLecture({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.delete(`lectures/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	updateDataLecture({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.put(`lectures/${payload}`, state.lecture)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataComments({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`lectures/${payload}/comment`)

				commit('ASSIGN_DATA_COMMENTS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createNewComment({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`lectures/${payload.lecture_id}/comment`, payload)

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