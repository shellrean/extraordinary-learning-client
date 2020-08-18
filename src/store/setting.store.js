import $axios from '@/core/services/api.service'

const state = () => ({
	setting: {}
})

const mutations = {
	ASSIGN_DATA_SETTING(state, payload) {
		state.setting = {
			name: payload.name ? payload.name : '',
			settings: payload.settings ? payload.settings : {}
		}
	}
}

const actions = {
	getDataSetting({ commit }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.get(`settings/${payload}`)
				commit('ASSIGN_DATA_SETTING', network.data.data)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	storeDataSetting({ commit, state }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`settings`, state.setting)
				commit('SET_LOADING', false, { root: true })
				resolve(network.data)
			} catch (error) {
				commit('SET_LOADING', false, { root: true })
				reject(error.response.data)
			}
		})
	},
	storeDataSettingLogo({ commit, state }, payload) {
		return new Promise(async(resolve, reject) => {
			try {
				commit('SET_LOADING', true, { root: true })
				let network = await $axios.post(`settings/logo`, payload, {
					headers: {
			            'content-type': 'multipart/form-data'
			        }
				})
				commit('ASSIGN_DATA_SETTING', network.data.data)
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