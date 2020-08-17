import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import PerfectScrollbar from "perfect-scrollbar";
window.PerfectScrollbar = PerfectScrollbar;
import Permissions from './core/mixins/permission.js'

import './core/plugins/bootstrap-vue'
import './core/plugins/inline-svg'
import './core/plugins/metronic'
import './core/plugins/ck-editor'
import './core/plugins/perfect-scrollbar'
import './core/plugins/youtube'
import './core/plugins/sweetalert.js'

Vue.config.productionTip = false
Vue.mixin(Permissions)

import { mapActions, mapGetters } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

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
  created() {
  	if (this.isAuth) {
      this.getUserLogin()
      .catch((error) => {
  			this.$bvToast.toast(error.message, errorToas())
      })
  	}
  }
}).$mount('#app')
