<template>
	<!-- begin:: Header
 	  v-bind:class="headerClasses" -->
 	<div
 	  id="kt_header"
 	  ref="kt_header"
 	  class="header header-fixed"
 	>
 		<div class="container d-flex align-items-stretch justify-content-between">
 			<!--begin::Left-->
 			<LeftMenu />
 			<!--end::Left-->
 			<!--begin::right-->
 			<TopBar />
 			<!--end::right-->
 		</div>
	</div>
</template>
<script>
import LeftMenu from "@/components/header/LeftMenu"
import TopBar from '@/components/header/TopBar'

export default {
	name: 'Header',
	components: {
		LeftMenu,
		TopBar
	}
}
</script>