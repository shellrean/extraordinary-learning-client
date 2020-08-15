import $axios from '@/core/services/api.service'

const state = () => ({
	tasks: [],
	classroom_tasks: [],
	page: 1,
	task: {
		title: '',
		body: '',
		type: '',
		isactive: ''
	}
})

const mutations = {
	ASSIGN_DATA_TASKS(state, payload) {
		state.tasks = payload
	},
	ASSIGN_DATA_CLASSROOM_TASKS(state, payload) {
		state.classroom_tasks = payload
	},
	ASSIGN_DATA_TASK(state, payload) {
		state.task = {
			title: payload.title,
			body: payload.body,
			type: payload.type,
			isactive: payload.isactive
		}
	},
	SET_PAGE(state, payload) {
		state.page = payload
	}
}

const actions = {
	getDataTasks({ commit, state }, payload) {
		let perPage = typeof payload.perPage != 'undefined' ? payload.perPage : 10
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`tasks?page=${state.page}&perPage=${perPage}`)

				commit('ASSIGN_DATA_TASKS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				resolve(error.response.data)
			}
		})
	},
	getDataTask({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`tasks/${payload}`)

				commit('ASSIGN_DATA_TASK', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataClassroomTasks({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/${payload}/task`)

				commit('ASSIGN_DATA_CLASSROOM_TASKS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createNewTask({ commit, state}, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`tasks`, state.task)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	shareeTask({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`tasks/${payload.id}/sharee`, payload.data)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	sendTask({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			let id = payload.id
			let data = payload.data
			try {
				let network = await $axios.post(`tasks/${id}/collect`, data, {
					headers: {
			            'content-type': 'multipart/form-data'
			        }
				})

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