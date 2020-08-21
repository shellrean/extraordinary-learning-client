<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="card card-custom">
					<div class="card-header">
						<h4>{{ active.name }}</h4>
					</div>
					<div class="card-body">
						<table class="table table-sm table-bordered">
							<tr>
								<td width="">Tanggal</td>
								<td>{{ datad.date }}</td>
							</tr>
							<tr>
								<td>Mulai</td>
								<td>{{ datad.start_time }}</td>
							</tr>
							<tr>
								<td>Alokasi waktu</td>
								<td>{{ Math.floor(datad.laam / 60) }} Menit</td>
							</tr>
						</table>
						<div class="alert bg-light-info mt-2" v-if="disabled">
							<p>Tomboh MULAI hanya akan muncul apabila waktu sekarang sudah melewati waktu mulai tes</p>
						</div>
						<b-button type="button" pills block @click="start" v-if="!disabled" :disabled="isLoading">
							{{ isLoading ? 'Processing...' : 'MULAI' }}
						</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton } from 'bootstrap-vue'

export default {
	name: 'WaitingExam',
	data() {
		return {
			disabled: true,
			time: '',
			starter: '',
			datad: {}
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('exam', ['active', 'schedules']),
		datad() {
			if(typeof this.active.exam_schedule_id != 'undefined' && this.schedules.length != 'undefined') {
				
				let index = this.schedules.map(item => item.id).indexOf(this.schedules.exam_schedule_id)
				if(index != -1) {
					this.datad = this.schedules[index]
				}
			}
		}
	},
	methods: {
		...mapActions('exam', ['startDoExam']),
		async start() {
			try {
				await this.startDoExam()
				this.$router.replace({
					name: 'exam.while'
				})
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		const date = new Date()
		const date = new Date()
        const ye = date.getFullYear()
        const mo = date.getMonth()
        const da = date.getDate()
        const mulai = this.datad.start_time
        const splicer = mulai.split(":")
        const h = parseInt(splicer[0])
        const i = parseInt(splicer[1])
        const s = parseInt(splicer[2])
        const rest = new Date(ye,mo,da,h,i,s)
        this.starter = rest
        this.startTime()
	},
	watch: {
		time() {
            if(this.starter < this.time) {
                this.disable = false
            }
        }
	}
}
</script>