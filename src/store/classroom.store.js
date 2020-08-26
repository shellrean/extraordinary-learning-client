import $axios from '@/core/services/api.service'

const state = () => ({
	classrooms: [],
	classroom: {},
	classlives: [],
	classlive: {
		settings: {
			
		}
	},
	myclassrooms: [],
	students: [],
	comments: [],
	subjects: [],
	page: 1
})

const mutations = {
	ASSIGN_DATA_CLASSROOMS(state, payload) {
		state.classrooms = payload
	},
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
	},
	ASSIGN_DATA_CLASSROOM(state, payload) {
		state.classroom = payload
	},
	ASSIGN_DATA_SUBJECTS(state, payload) {
		state.subjects = payload
	},
	CLEAR_CLASSROOM(state, payload) {
		state.classroom = {}
	},
	SET_PAGE(state, payload) {
		state.page = payload
	}
}

const actions = {
	getDataClassrooms({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms`)

				commit('ASSIGN_DATA_CLASSROOMS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataClassroom({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.get(`classrooms/${payload}`)

				commit('ASSIGN_DATA_CLASSROOM', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	deleteDataClassroom({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.delete(`classrooms/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)				
			}
		})
	},
	createNewClassroom({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms`, state.classroom)

				commit('CLEAR_CLASSROOM')
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createNewClassroomSubject({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms/mine`, payload)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	deleteDataClassroomSubject({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.delete(`classrooms/mine/${payload}`)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	importClassroom({ commit }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async (resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms/import`, payload)

				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
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
	stopLiveClassroom({ commit, state }, payload) {
		commit('SET_LOADING', true, { root: true })
		return new Promise(async(resolve, reject) => {
			try {
				let network = await $axios.post(`classrooms/live/${payload}/stop`)

				commit('SET_LOADING' ,false, { root: true })
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
				let network = await $axios.post(`classrooms/live/${payload.classroom_live_id}/comment`, payload)

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
	},
	joinClassroom({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`classrooms/join`, payload)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				if (error.response.status == 422) {
					commit('SET_ERRORS', error.response.data.errors, { root: true })
				}
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	getDataTeacherSubject({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`classrooms/subject/mine`)

				commit('ASSIGN_DATA_SUBJECTS', network.data.data)
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