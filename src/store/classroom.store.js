import $axios from '@/core/services/api.service'

const state = () => ({
	classrooms: [],
	classlives: [],
	classlive: {
	},
	myclassrooms: [],
	students: [],
	comments: []
})

const mutations = {
	ASSIGN_DATA_MY_CLASSROOMS(state, payload) {
		state.myclassrooms = payload
	},
	ASSIGN_DATA_CLASSLIVE(state, payload) {
		state.classlive = payload
	},
	ASSIGN_DATA_CLASSLIVES(state, payload) {
		state.classlives = payload
	},
	ASSIGN_CLASSLIVE_COMMENTS(state, payload) {
		state.comments = payload
	},
	ASSIGN_DATA_STUDENTS(state, payload) {
		state.students = payload
	}
}

const actions = {
	getDataClassromMine({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/mine`)

				commit('ASSIGN_DATA_MY_CLASSROOMS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataliveClassroom({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/live/${payload}`)

				commit('ASSIGN_DATA_CLASSLIVE', network.data.data)
				commit('SET_LOADING', false, { root: true})
				resolve(network.data)
			} catch (error) {	
				commit('SET_LOADING', false, { root: true })
				reject(network.data)
			}
		})
	},
	getDatalivesClassroom({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/${payload}/live`)

				commit('ASSIGN_DATA_CLASSLIVES', network.data.data)
				commit('SET_LOADING', false, { root: true})
				resolve(network.data)
			} catch (error) {	
				commit('SET_LOADING', false, { root: true })
				reject(network.data)
			}
		})
	},
	storeLiveClassroom({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms/${payload}/live`,state.classlive)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data.data)
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
				let network = await $axios.get(`classrooms/live/${payload}/comment`)

				commit('ASSIGN_CLASSLIVE_COMMENTS', network.data.data)
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true})
				reject(error.response.data)
			}
		})
	},
	createNewComment({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms/live/${payload.lecture_id}/comment`, payload)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataStudents({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/${payload}/student`)

				commit('ASSIGN_DATA_STUDENTS', network.data.data)
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