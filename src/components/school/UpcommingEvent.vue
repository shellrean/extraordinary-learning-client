<template>
	<div class="card card-custom gutter-b">
		<!--begin::Header-->
		<div class="card-header border-0 pt-5">
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label font-weight-bolder text-dark">Kegiatan yang akan datang</span>
				<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar sekolah kegiatan yang akan datang</span>
			</h3>
		</div>
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body pt-2" v-if="public_events.length > 0">
			<!--begin::Item-->
			<div class="d-flex align-items-center mb-10" v-for="event in public_events"> 
				<!--end::Symbol-->
				<!--begin::Text-->
				<div class="symbol symbol-45 symbol-light mr-5">
					<span class="symbol-label">
						<span class="svg-icon svg-icon-lg svg-icon-primary">
							<i class="flaticon-calendar-2 text-primary"></i>
						</span>
					</span>
				</div>
				<div class="d-flex flex-column font-weight-bold">
					<router-link :to="{ name: 'event.view', params: { id: event.id }}" class="text-dark text-hover-primary mb-1 font-size-lg">{{ event.title }}</router-link>
					<span class="text-muted">{{ event.date }} / {{ event.time }}</span>
				</div>
				<!--end::Text-->
			</div>
			<!--end::Item-->
		</div>
		<div class="card-body" v-else>
			<div class="text-center">
				<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
			</div>
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