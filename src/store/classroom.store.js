import $axios from '@/core/services/api.service'

const state = () => ({
	classrooms: [],
	myclassrooms: []
})

const mutations = {
	ASSIGN_DATA_MY_CLASSROOMS(state, payload) {
		state.myclassrooms = payload
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
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}