<template>
	<div>
		<loading :active.sync="loadPage" 
	    :is-full-page="true" :loader="'bars'" :color="'#F64E60'"></loading>
		<div class="d-flex flex-column flex-root" v-if="typeof authenticated.id != 'undefined'">
			<!-- begin:: Header Mobile -->
		    <KTHeaderMobile></KTHeaderMobile>
		    <!-- end:: Header Mobile -->

		    <!-- begin::Body -->
		    <div class="d-flex flex-row flex-column-fluid page" id="kt_body_content">

		    	<!-- begin:: Aside -->
		    	<KTAside></KTAside>
		    	<!-- end:: Aside -->

		    	<div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
		    		<!-- begin:: Header -->
			        <KTHeader></KTHeader>
			        <!-- end:: Header -->

			    	<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
			    		<router-view />
			    	</div>

			    	<KTFooter></KTFooter>
			    </div>
		    </div>
		</div>
	</div>
</template>
<script>
import KTAside from '@/components/aside/Aside'
import KTHeader from '@/components/header/Header'
import KTFooter from '@/components/footer/Footer'
import KTHeaderMobile from '@/components/header/HeaderMobile'
import { mapGetters, mapState } from 'vuex'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
	name: 'Master',
	components: {
		KTHeader,
		KTAside,
		KTFooter,
		KTHeaderMobile,
		Loading
	},
	computed: {
		...mapGetters(['loadPage']),
		...mapState('user', ['authenticated'])
	}
}
</script>