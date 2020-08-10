<template>
	<div class="topbar-item">
		<div
      		class="btn btn-icon w-auto btn-clean d-flex align-items-center btn-lg px-2"
      		id="kt_quick_user_toggle"
    	>
    		<span class="svg-icon svg-icon-xl">
		      <!--begin::Svg Icon | path:svg/icons/General/User.svg-->
		      <inline-svg class="svg-icon" src="/media/svg/icons/General/User.svg" />
		      <!--end::Svg Icon-->
		    </span>
    	</div>
    	<div
	      id="kt_quick_user"
	      ref="kt_quick_user"
	      class="offcanvas offcanvas-right p-10"
	    >
	    	<div
		    	class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
		    >
		    	<h3 class="font-weight-bold m-0">
		    		User Profile
		    		<small class="text-muted font-size-sm ml-2">12 messages</small>
		    	</h3>
		    	<a
		          href="#"
		          class="btn btn-xs btn-icon btn-light btn-hover-primary"
		          id="kt_quick_user_close"
		        >
		          <i class="flaticon2-cross text-muted"></i>
		        </a>

			</div>
			<div class="offcanvas-content pr-5 mr-n5 scroll ps ps--active-y" style="height: 529px; overflow: hidden;">
				<!--begin::Header-->
				<div class="d-flex align-items-center mt-5">
					<div class="symbol symbol-100 mr-5">
						<div class="symbol-label" style="background-image:url('assets/media/users/300_21.jpg')"></div>
						<i class="symbol-badge bg-success"></i>
					</div>
					<div class="d-flex flex-column">
						<a href="#" class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">James Jones</a>
						<div class="text-muted mt-1">Application Developer</div>
						<div class="navi mt-2">
							<a href="#" class="navi-item">
								<span class="navi-link p-0 pb-2">
									<span class="navi-icon mr-1">
										</span>
									</span>
									<span class="navi-text text-muted text-hover-primary">jm@softplus.com</span>
								</span>
							</a>
							<a href="#" class="btn btn-sm btn-light-primary font-weight-bolder py-2 px-5" @click="logout" :disabled="isLoading">{{ isLoading ? 'Processing...': 'Sign Out' }}</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
	name: 'KTQuickUser',
	mounted() {
    	KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  	},
  	computed: {
  		...mapGetters(['isLoading'])
  	},
  	methods: {
  		...mapActions('auth',['loggedOut']),
  		async logout() {
  			await this.loggedOut()
  			localStorage.removeItem('token')
            this.$store.state.token = localStorage.getItem('token')
            this.$router.push('/login')
  		}
  	}
}
</script>