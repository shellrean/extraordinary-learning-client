<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-6">
				<div class="card card-custom">
					<div class="card-header flex-wrap border-0 pt-6 pb-0">
						<div class="d-flex align-items-center">
							<div class="symbol symbol-45 symbol-light-primary mr-5">
								<span class="symbol-label">
									<i class="flaticon2-crisp-icons text-primary"></i>
								</span>
							</div>
							<div class="d-flex flex-column flex-grow-1">
								<span class="text-dark-75 mb-1 font-size-lg font-weight-bolder">
									Jadwal ujian
								</span>
								<div class="d-flex">
									<div class="d-flex align-items-center pr-5">
										<span class="svg-icon svg-icon-md svg-icon-primary">
										</span>
										<span class="text-muted font-weight-bold">Daftar ujian yang dapat diikuti</span>
									</div>
								</div>
							</div>
						</div>
						<div class="card-toolbar">
							<div class="form-group">
								<router-link :to="{ name: 'home' }" class="btn btn-light-primary mr-2">
									<i class="flaticon2-layers"></i>Dashboard
								</router-link>
							</div>
						</div>
					</div>
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
										{{ isLoading ? 'Processing...' : 'Submit' }}
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
		...mapGetters(['isLoading']),
		...mapState('exam', ['schedules']),
		...mapState('user', ['authenticated']),
	},
	methods: {
		...mapActions('exam', ['createDataExam', 'getDataExamActive']),
		async submit() {
			try {
				await this.createDataExam(this.data)
				await this.getDataExamActive()
				this.$router.replace({ name: 'exam.prepare' })
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>