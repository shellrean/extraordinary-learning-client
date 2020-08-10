import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './core/plugins/bootstrap-vue'
import './core/plugins/inline-svg'
import './core/plugins/metronic'
import './core/plugins/ck-editor'

Vue.config.productionTip = false

import { mapActions, mapGetters } from 'vuex'

new Vue({
  router,
  store,
  render: h => h(App),
  computed: {
  	...mapGetters(['isAuth'])
  },
  methods: {
    ...mapActions('user', ['getUserLogin']),
  	...mapActions(['getConfig'])
  },
  async created() {
  	await this.getConfig()
  	if (this.isAuth) {
  		try {
        await this.getUserLogin()
  		} catch (error) {
  			
  		}
  	}
  }
}).$mount('#app')
