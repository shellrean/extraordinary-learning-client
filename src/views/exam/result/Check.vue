<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Koreksi jawaban esay</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar jawaban siswa belum dikoreksi</span>
					</h3>
					<div class="card-toolbar">
						<router-link :to="{ name: 'exam.schedule' }" class="btn btn-light-primary mr-2">
							<i class="flaticon2-left-arrow-1"></i>Kembali
						</router-link>
					</div>
				</div>
				<div class="card-body">
					<VuePerfectScrollbar
						style="max-height: 60vh; position: relative;"
					>
					<div class="table-responsive-md">
						<table class="table table-bordered">
							<tr>
								<th width="40%" class="bg-primary text-white">Pertanyaan</th>
								<th width="40%" class="bg-primary text-white">Jawaban</th>
								<th width="20%" class="bg-primary text-white">Point</th>
							</tr>
							<tr v-for="(check,index) in checks">
								<td v-html="check.question.question"></td>
								<td v-html="check.esay"></td>
								<td>
									<div class="input-group mb-3">
										<input type="number" class="form-control" step="0.1" max="1" min="0" v-model.number="checks[index].point">
										<div class="input-group-append">
											<button class="btn btn-outline-secondary" type="button" @click="submit(index)">Simpan</button>
										</div>
									</div>
								</td>
							</tr>
						</table>
					</div>
					</VuePerfectScrollbar>
					<div class="d-flex align-items-center" v-if="isLoading">
						<div class="mr-2 text-muted">Loading...</div>
						<div class="spinner spinner-primary mr-10"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'CheckEsayAnswer',
	components: {
		VuePerfectScrollbar
	},
	data() {
		return {

		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('result', ['checks'])
	},
	methods: {
		...mapActions('result', ['getDataChecks', 'storeDataCheck']),
		async submit(index) {
			try {
				await this.storeDataCheck({
					val: this.checks[index].point,
					id: this.checks[index].id
				})
				this.checks.splice(index,1)
			} catch (error) {
				
			}
		}
	},
	created() {
		this.getDataChecks(this.$route.params.id)
		.catch((error) => {

		})
	}
}
</script>