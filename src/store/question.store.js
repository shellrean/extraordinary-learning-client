import $axios from '@/core/services/api.service'

const state = () => ({
	question_bank: {
		subject_id: null,
		code: null,
		mc_option_count: 4,
		mc_count: 0,
		esay_count: 0,
		percentage: {
			mc: 100,
			esay: 0
		}
	},
	question_banks: [],
	question_banks_page: 1
})

const mutations = {
	ASSIGN_QUESTION_BANKS(state, payload) {
		state.question_banks = payload
	},
	ASSIGN_QUESTION_BANK(state, payload) {
		state.question_bank = payload
	},
	SET_QUESTION_BANKS_PAGE(state, payload) {
		state.question_banks_page = payload
	},
	CLEAR_QUESTION_BANK(state) {
		state.question_bank = {
			subject_id: null,
			code: null,
			mc_option_count: 4,
			mc_count: 0,
			esay_count: 0,
			percentage: {
				mc: 100,
				esay: 0
			}
		}
	}
}

const actions = {
	getDataQuestionBanks({ commit, state }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				let perPage = payload.perPage
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`question_banks?page${state.question_banks_page}&perPage=${perPage}`)
				
				commit('ASSIGN_QUESTION_BANKS', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	createDataQuestionBank({ commit, state }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`question_banks`, state.question_bank)

				commit('CLEAR_QUESTION_BANK')
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
	getDataQuestionBank({ commit, state }, payload) {
		return new Promise(async (resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`question_banks/${payload}`)

				commit('ASSIGN_QUESTION_BANK', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	deleteDataQuestionBank({ commit }, payload) {
		return new Promise(async (resolve, reject) => {
			try {

			} catch (error) {
				
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