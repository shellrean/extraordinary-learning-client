<template>
	<div class="card card-custom gutter-b">
		<!--begin::Header-->
		<div class="card-header border-0 pt-5">
			<h3 class="card-title align-items-start flex-column">
				<span class="card-label font-weight-bolder text-dark">Kegiatang</span>
				<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar kegiatan sekolah</span>
			</h3>
			<div class="card-toolbar">
				<ul class="nav nav-pills nav-pills-sm nav-dark-75">
					<li class="nav-item">
						<a class="nav-link py-2 px-4 active font-weight-bolder" href="#">Yang akan datang</a>
					</li>
				</ul>
			</div>
		</div>
		<!--end::Header-->
		<!--begin::Body-->
		<div class="card-body pt-2" v-if="public_events.length > 0">
			<!--begin::Item-->
			<div class="d-flex align-items-center mb-10" v-for="event in public_events"> 
				<!--end::Symbol-->
				<!--begin::Text-->
				<div class="symbol symbol-45 symbol-light-info mr-5">
					<span class="symbol-label">
						<span class="svg-icon svg-icon-lg svg-icon-info">
							<i class="flaticon-calendar-with-a-clock-time-tools text-info"></i>
						</span>
					</span>
				</div>
				<div class="d-flex flex-column font-weight-bold mr-5">
					<router-link :to="{ name: 'event.view', params: { id: event.id }}" class="text-dark text-hover-info mb-1 font-size-lg">{{ event.title }}</router-link>
					<span class="text-muted">{{ event.location }}</span>
				</div>
				<div class="d-flex flex-column font-weight-bold">
					<span class="text-dark mb-1 font-size-lg">{{ event.date }}</span>
					<span class="text-muted">{{ event.time }}</span>
				</div>
				<!--end::Text-->
			</div>
			<!--end::Item-->
		</div>
		<div class="card-body" v-else>
			<div class="text-center">
				<img src="/media/svg/banner/svg-nodata3.svg" style="max-width: 130px">
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