<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Hasil nilai tugas</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Hasil nilai tugas siswa</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
							<router-link :to="{ name: 'task.index' }" class="btn btn-primary mr-2">
								<i class="flaticon2-left-arrow-1"></i>Kembali
							</router-link>
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
												<option value="1">12 TKJ</option>
											</select>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
									<button @click="getData" :disabled="isLoading" class="btn btn-light-primary px-6 font-weight-bold">Tampilkan</button>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md">
						<b-table 
                        id="table-transition-example" 
                        show-empty
                        :fields="fields"
                        :items="classroom_results"
                        >
                        	<template v-slot:cell(name)="row">
                        		<span>
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">
                        					<span class="symbol-label font-size-h4 font-weight-bold ">
                        						{{ row.item.student.name.charAt(0) }}
                        					</span>
                        				</div>
                        				<div class="ml-4 d-flex flex-column">
                        					<span class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.student.name"></span>
                        				</div>
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(result)="row">
                        		<span>
                        			<div class="d-flex align-items-center">
                        				<span class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.result.point"></span>
                        			</div>
                        		</span>
                        	</template>
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
	name: 'TaskResult',
	components: {

	},
	data: () => ({
		classroom_id: '',
		fields: [
			{ key: 'name', thStyle: { display: 'none' }},
			{ key: 'result', thStyle: { display: 'none' }}
		]
	}),
	computed: {
		...mapGetters(['isLoading']),
		...mapState('task', ['classroom_results'])
	},
	methods: {
		...mapActions('task', ['getDataClassroomTaskResults']),
		getData() {
			this.getDataClassroomTaskResults({ 
				task_id: this.$route.params.id,
				classroom_id: this.classroom_id
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		}
	}
}
</script>