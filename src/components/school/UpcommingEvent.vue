<template>
	<div class="card card-custom gutter-b">
		<!--begin::Header-->
		<div class="card-header border-0 pt-5">
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label font-weight-bolder text-dark">Kegiatan yang akan datang</span>
			</h3>
		</div>
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body pt-2">
			<!--begin::Item-->
			<div class="d-flex align-items-center mb-10" v-for="event in public_events"> 
				<!--end::Symbol-->
				<!--begin::Text-->
				<div class="d-flex flex-column font-weight-bold">
					<a href="#" class="text-dark text-hover-primary mb-1 font-size-lg">{{ event.title }}</a>
					<span class="text-muted">{{ event.date }} / {{ event.time }}</span>
				</div>
				<!--end::Text-->
			</div>
			<!--end::Item-->
		</div>
		<!--end::Body-->
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	naem: 'UpcommingEvent',
	computed: {
		...mapState('event', ['public_events'])
	},
	methods: {
		...mapActions('event', ['getDataEventPublic'])
	},
	created() {
		this.getDataEventPublic()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>