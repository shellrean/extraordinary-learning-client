import $axios from '@/core/services/api.service'

const state = () => ({
	authenticated: {},
	teachers: {},
	page: 1
})

const mutations = {
	ASSING_USER_AUTH(state, payload) {
		state.authenticated = payload
	},
	ASSIGN_DATA_TABLE_TEACHER(state, payload) {
		state.teachers = payload
	},
	SET_PAGE(state, payload) {
		state.page = payload
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
	},
	createNewTeacher({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`user/teacher`, payload)
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
	getTeacherDataTable({ commit, state }, payload) {
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : ''
		let search = typeof payload.search != 'undefined' ? payload.search : ''
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`user/teacher?page=${state.page}&perPage=${perPage}&q=${search}`)
				commit('ASSIGN_DATA_TABLE_TEACHER', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	}
}

export default  {
	namespaced: true,
	state,
	mutations,
	actions
}