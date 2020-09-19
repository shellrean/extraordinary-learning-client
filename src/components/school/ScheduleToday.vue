<template>
	<div class="card card-custom gutter-b shadow-none border">
		<div class="card-header align-items-center border-0 mt-4">
			<h3 class="card-title align-items-start flex-column">
				<span class="font-weight-bolder text-dark">Jadwal hari ini</span>
				<span class="text-muted mt-3 font-weight-bold font-size-sm">
					<span class="badge badge-light" v-b-tooltip.hover title="Jumlah jadwal hari ini">{{ schedules.length }} terjadwal hari ini</span>
				</span>
			</h3>
			<div class="card-toolbar">
			</div>
		</div>
		<div class="card-body pt-4">
			<div class="timeline timeline-5 mt-3">
				<div class="timeline-item align-items-start" v-for="schedule in schedules" :key="schedule.id">
					<div class="timeline-label font-weight-bolder text-dark-75 font-size-lg">{{ schedule.from_time.substring(0,5) }}</div>
					<div class="timeline-badge">
						<i class="flaticon2-crisp-icons-1 text-success icon-xl"></i>
					</div>
					<div class="font-weight-mormal font-size-lg timeline-content text-muted pl-3">
						{{ schedule.classroom_name }} - {{ schedule.subject_name }} <br>
						Berakhir pada {{ schedule.end_time.substring(0,5) }}
					</div>
				</div>
			</div>
			<span v-if="schedules.length === 0">Tidak ada jadwal mengajar hari ini</span>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
	name: 'ScheduleToday',
	computed: {
		...mapState('classroom',['schedules'])
	},
	methods: {
		...mapActions('classroom', ['getDataSchedulesToday'])
	},
	created() {
		this.getDataSchedulesToday()
		.catch((error) => {

		})
	}
}
</script>