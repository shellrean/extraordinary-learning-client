<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card card-custom">
					<div class="card-body">
						<form @submit.prevent="submit">
							<div v-if="schedules && schedules.length > 0">
								<div class="form-group">
									<label>Jadwal ujian</label>
									<select class="form-control" v-model="data.exam_schedule_id">
										<option :value="schedule.id" v-for="schedule in schedules" :key="schedule.id">{{ schedule.name }}</option>
									</select>
								</div>
								<div class="form-group">
									<b-button variant="primary" type="submit" block :disabled="isLoading">
										{{ isLoaing ? 'Processing...' : 'Submit' }}
									</b-button>
								</div>
							</div>
							<div v-else>
								<div class="alert alert-custom alert-light-primary fade show mb-5">
									<div class="alert-icon">
										<i class="flaticon-warning"></i>
									</div>
									<div class="alert-text">Tidak ada jadwal ujian saat ini</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton } from 'bootstrap-vue'

export default {
	name: 'ExamStudentDashboard',
	components: {
		BButton
	},
	data() {
		return {
			data: {
				exam_schedule_id: ''
			}
		}
	},
	computed: {
		...mapState('exam', ['schedules']),
		...mapState('user', ['authenticated']),
	},
	methods: {
		...mapActions('exam_schedule', ['storeDataExamAnswer']),
		async submit() {
			try {
				await this.storeDataExamAnswer(this.data)
				await this.getDataExamActive()
				this.$router.replace({ name: 'exam.prepare' })
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>