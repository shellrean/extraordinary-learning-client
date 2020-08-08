<template>
	<div class="d-flex flex-column flex-root">
			<!--begin::Login-->
			<div class="login login-2 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white" id="kt_login">
				<!--begin::Aside-->
				<div class="login-aside order-2 order-lg-1 d-flex flex-row-auto position-relative overflow-hidden">
					<!--begin: Aside Container-->
					<div class="d-flex flex-column-fluid flex-column justify-content-between py-9 px-7 py-lg-13 px-lg-35">
						<!--begin::Logo-->
						<a href="#" class="text-center pt-2">
							<img src="assets/media/logos/logo.png" class="max-h-75px" alt="" />
						</a>
						<!--end::Logo-->
						<!--begin::Aside body-->
						<div class="d-flex flex-column-fluid flex-column flex-center">
							<!--begin::Signin-->
							<div class="login-form login-signin py-11">
								<!--begin::Form-->
								<form class="form" novalidate="novalidate" id="kt_login_signin_form" @submit.prevent="postLogin">
									<!--begin::Title-->
									<div class="text-center pb-8">
										<h2 class="font-weight-bolder text-dark font-size-h2 font-size-h1-lg">Dian E Learning Login</h2>
										<span class="text-muted font-weight-bold font-size-h4">login dengan username dan password yang anda miliki</span>
									</div>
									<div class="alert alert-danger" v-if="errors.invalid">
										<strong>Error</strong> <br>
										{{ errors.invalid }}
									</div>
									<!--end::Title-->
									<!--begin::Form group-->
									<div class="form-group">
										<label class="font-size-h6 font-weight-bolder text-dark">Email</label>
										<input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="text" name="username" autocomplete="off" :class="{ 'is-invalid' : errors.email }" v-model="data.email" />
										<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
									</div>
									<!--end::Form group-->
									<!--begin::Form group-->
									<div class="form-group">
										<div class="d-flex justify-content-between mt-n5">
											<label class="font-size-h6 font-weight-bolder text-dark pt-5">Password</label>
										</div>
										<input class="form-control form-control-solid h-auto py-7 px-6 rounded-lg" type="password" name="password" autocomplete="off" :class="{ 'is-invalid' : errors.password }" v-model="data.password"/>
										<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }} </div>
									</div>
									<!--end::Form group-->
									<!--begin::Action-->
									<div class="text-center pt-2">
										<button id="kt_login_signin_submit" :disabled="isLoading" type="submit" class="btn btn-dark font-weight-bolder font-size-h6 px-8 py-4 my-3">{{ isLoading ? 'Processsing...' : 'Sign In' }}</button>
									</div>
									<!--end::Action-->
								</form>
								<!--end::Form-->
							</div>
							<!--end::Signin-->
							
						</div>
						<!--end::Aside body-->
					</div>
					<!--end: Aside Container-->
				</div>
				<!--begin::Aside-->
				<!--begin::Content-->
				<div class="content order-1 order-lg-2 d-flex flex-column w-100 pb-0" style="background-color: #B1DCED;">
					<!--begin::Title-->
					<div class="d-flex flex-column justify-content-center text-center pt-lg-40 pt-md-5 pt-sm-5 px-lg-0 pt-5 px-7">
						<h3 class="display4 font-weight-bolder my-7 text-dark" style="color: #986923;">SMK NUSANTARA 1</h3>
						<p class="font-weight-bolder font-size-h2-md font-size-lg text-dark opacity-70">Jl. Nusantara 1, Jakarta Selatan
						<br />Dian E learning App</p>
					</div>
					<!--end::Title-->
					<!--begin::Image-->
					<div class="content-img d-flex flex-row-fluid bgi-no-repeat bgi-position-y-bottom bgi-position-x-center" style="background-image: url('/media/svg/banner/login-visual-2.svg');"></div>
					<!--end::Image-->
				</div>
				<!--end::Content-->
			</div>
			<!--end::Login-->
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
		...mapGetters(['isAuth', 'isLoading']),
		...mapState(['errors'])
	},
	methods: {
		...mapActions('auth', ['submit']),
		...mapActions('user', ['getUserLogin']),
		async postLogin() {
			try {
				await this.submit(this.data)
				if (this.isAuth) {
					this.$router.push({ name: 'home' })
				}
			} catch (error) {

			}
		}
	},
	async created() {
		if(this.isAuth) {
			this.$router.push({ name: 'home' })
		}
	},
	destroy() {
		this.getUserLogin()
	}
}
</script>