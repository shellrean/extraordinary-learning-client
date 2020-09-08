import $axios from '@/core/services/api.service'

const state = () => ({
	standarts: [],
	standart: {},
	standart_page: 1
})

const mutations = {
	ASSIGN_DATA_STANDARTS(state, payload) {
		state.standarts = payload
	},
	ASSIGN_DATA_STANDART(state, payload) {
		state.standart = payload
	},
	SET_SANDART_PAGE(state, payload) {
		state.standart_page = payload
	}
}

const actions = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}