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
		</div>
	</div>
</template>
<script>
import KTLayoutQuickUser from "@/assets/js/layout/extended/quick-user.js";
import KTOffcanvas from "@/assets/js/components/offcanvas.js";

export default {
	name: 'KTQuickUser',
	mounted() {
    	KTLayoutQuickUser.init(this.$refs["kt_quick_user"]);
  	},
}
</script>