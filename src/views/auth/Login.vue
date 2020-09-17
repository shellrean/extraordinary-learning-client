<template>
	<div class="d-flex flex-column flex-root">
		<div class="login login-4 login-signin-on d-flex flex-row-fluid">
			<div class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat">
				<div class="login-form text-center p-7 position-relative overflow-hidden">	
					<div class="d-flex flex-center mb-15">
						<a href="#">
							<img :src="`${baseURL}/storage/${school.settings.logo}`"  class="max-h-75px" v-if="typeof school.settings.logo != 'undefined'">
							<img src="/img/logo.ico" class="max-h-75px" alt="" v-else />
							<img src="assets/media/logos/logo-letter-13.png" class="max-h-75px" alt="" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	data() {
		return {
			data: {
				email: '',
				password: ''
			}
		}
	},
	computed: {
		...mapGetters(['isAuth', 'isLoading', 'baseURL']),
		...mapState(['errors']),
		...mapState('setting',['school'])
	},
	methods: {
		...mapActions('auth', ['submit']),
		...mapActions('user', ['getUserLogin']),
		async postLogin() {
			try {
				await this.submit(this.data)
				if (this.isAuth) {
					this.getUserLogin()
					this.$router.push({ name: 'home' })
				}
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	async created() {
		if(this.isAuth) {
			this.$router.push({ name: 'home' })
		}
	}
}
</script>