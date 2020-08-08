<template>
	<div
	    id="kt_header_mobile"
	    class="header-mobile align-items-center"
	>
		<a href="/">
	      <img alt="Logo" src="/img/logo.ico" class="logo-sticky max-h-35px" />
	    </a>

	    <div class="d-flex align-items-center">
	    	<button
		        class="btn p-0 burger-icon burger-icon-left"
		        id="kt_aside_tablet_and_mobile_toggle"
		        ref="kt_aside_tablet_and_mobile_toggle"
		    >
		    	<span></span>
			</button>
			<button
		        class="btn btn-hover-text-primary p-0 ml-2"
		        id="kt_header_mobile_topbar_toggle"
		        ref="kt_header_mobile_topbar_toggle"
		    >
		        <span class="svg-icon svg-icon-xl">
		          <!--begin::Svg Icon | path:svg/icons/General/User.svg-->
		          <inline-svg class="svg-icon" src="/media/svg/icons/General/User.svg" />
		          <!--end::Svg Icon-->
		        </span>
		    </button>
	    </div>
	</div>
</template>
<script>
import KTLayoutHeaderTopbar from "@/assets/js/layout/base/header-topbar.js";

export default {
	name: 'HeaderMobile',
	mounted() {
	    // Init Header Topbar For Mobile Mode
	    KTLayoutHeaderTopbar.init(this.$refs["kt_header_mobile_topbar_toggle"]);
	},
}
</script>