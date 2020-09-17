<template>
	<div class="d-flex flex-column flex-root">
		<div class="login login-4 login-signin-on d-flex flex-row-fluid">
			<div class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat" style="background-image: url('/img/bg/bg-3.jpg');">
				<div class="login-form text-center p-7 position-relative overflow-hidden">	
					<div class="d-flex flex-center mb-15">
						<a href="#">
							<img :src="`${baseURL}/storage/${school.settings.logo}`"  class="max-h-75px" v-if="typeof school.settings != 'undefined' && typeof school.settings.logo != 'undefined'">
							<img src="/img/logo.ico" class="max-h-75px" alt="" v-else />
						</a>
					</div>
					<div class="login-signin">
						<div class="mb-20">
							<h3>Sign In To Application</h3>
							<div class="text-muted font-weight-bold">Masukan email dan password anda:</div>
							<div class="alert alert-custom alert-light-danger fade show mb-5" role="alert" v-if="errors.invalid">
								<div class="alert-icon">
									<i class="flaticon-warning"></i>
								</div>
								<div class="alert-text">{{ errors.invalid }}</div>
								<div class="alert-close">
									<button type="button" class="close" data-dismiss="alert" aria-label="Close">
										<span aria-hidden="true">
											<i class="ki ki-close"></i>
										</span>
									</button>
								</div>
							</div>
						</div>
						<form class="form" @submit.prevent="postLogin">
							<div class="form-group mb-5">
								<input class="form-control h-auto form-control-solid py-4 px-8" type="text" placeholder="Email" name="username" autocomplete="off" :class="{ 'is-invalid' : errors.email }" v-model="data.email"/>
								<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
							</div>
							<div class="form-group mb-5">
								<input class="form-control h-auto form-control-solid py-4 px-8" type="password" placeholder="Password" name="password" :class="{ 'is-invalid' : errors.password }" v-model="data.password"/>
								<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
							</div>
							<button class="btn btn-primary font-weight-bold px-9 py-4 my-3 " :disabled="isLoading" >
								{{ isLoading ? 'Processing...' : 'Sign In' }}
							</button>
						</form>
						<div class="mt-10">
							<span class="opacity-70">Extraordinary v1.0.1-Elementary School</span>
						</div>
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