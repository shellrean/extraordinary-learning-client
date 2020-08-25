<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Hasil ulangan</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">hasil ulangan  siswa</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
							<router-link :to="{ name: 'exam.schedule' }" class="btn btn-light-primary mr-2">
								<i class="flaticon2-left-arrow-1"></i>Kembali
							</router-link>
							<button @click="print" class="btn btn-primary mb-1">Cetak data</button>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="mb-10">
						<div class="row align-items-center">
							<div class="col-lg-9 col-xl-8">
								<div class="row align-items-center">
									<div class="col-md-4 my-2 my-md-0">
										<div class="input-icon">
											<select class="form-control form-control-solid" v-model="classroom_id">
												<option :value="classroom.classroom.id" v-for="classroom in myclassrooms">{{ classroom.classroom.name }}</option>
											</select>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
									<button :disabled="isLoading"  @click="retreiveData" class="btn btn-light-primary px-6 font-weight-bold">Tampilkan</button>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md" id="printMe">
						<b-table 
                        show-empty
                        :fields="fields"
                        :items="results"
                        >

                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
                    		<div class="d-flex align-items-center py-3">
								<div class="d-flex align-items-center" v-if="isLoading">
									<div class="mr-2 text-muted">Loading...</div>
									<div class="spinner spinner-primary mr-10"></div>
								</div>
							</div>
                    	</div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { errorToas, successToas } from '@/core/entities/notif'

export default {
	name: 'PointResult',
	data() {
		return {
			classroom_id: '',
			fields: [
				{ key: 'student.name', label: 'Nama' },
				{ key: 'correct_mc', label: 'Pg benar' },
				{ key: 'null', label: 'Kosong' },
				{ key: 'point_esay', label: 'Point esay' },
				{ key: 'result', label: 'Hasil akhir' }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('result', ['results']),
		...mapState('classroom', ['myclassrooms'])
	},
	methods: {
		...mapActions('result', ['getDataResults']),
		...mapActions('classroom', ['getDataClassromMine']),
		retreiveData() {
			this.getDataResults({
				classroom_id: this.classroom_id,
				exam_schedule_id: this.$route.params.id
			})
			.catch((error) => {

			})
		},
		print () {
      		this.$htmlToPaper('printMe');
    	}
	},	
	created() {
		this.getDataClassromMine()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>
<style scoped>
@media print {
    @page {
        size: landscape;
    }
}
</style>