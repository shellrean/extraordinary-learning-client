<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom shadow-none border">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
						<div class="d-flex align-items-center">
						<div class="symbol symbol-45 symbol-light-primary mr-5">
							<span class="symbol-label">
								<i class="flaticon2-crisp-icons text-primary"></i>
							</span>
						</div>
						<div class="d-flex flex-column flex-grow-1">
							<span class="text-dark-75 mb-1 font-size-lg font-weight-bolder">
							Hasil nilai tugas
							</span>
							<div class="d-flex">
								<div class="d-flex align-items-center pr-5">
									<span class="svg-icon svg-icon-md svg-icon-primary">
									</span>
									<span class="text-muted font-weight-bold">Hasil nilai tugas siswa</span>
								</div>
							</div>
						</div>
					</div>
					<div class="card-toolbar">
						<div class="">
							<router-link :to="{ name: 'task.index' }" class="btn btn-light-primary">
								<i class="flaticon2-left-arrow-1"></i>Kembali
							</router-link>
							<b-dropdown  variant="link" toggle-class="text-decoration-none" no-caret v-if="classroom_id != ''">
								<template v-slot:button-content>
									<b-button variant="primary" class="font-weight-bolder font-size-sm">
										<i class="flaticon-interface-11"></i>
										Export/Cetak
									</b-button>
								</template>
								<b-dropdown-item @click="print">Cetak/Pdf</b-dropdown-item>
								<b-dropdown-item>
									 <download-excel
	                                :data = "classroom_results"
	                                :fields="json_fields"
	                                :name="'Hasil tugas.xls'"
	                            >
	                                Download hasil ujian
	                            </download-excel>
								</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="mb-10">
						<div class="row align-items-center">
							<div class="col-lg-9 col-xl-8">
								<div class="row align-items-center">
									<div class="col-md-5 my-2 my-md-0">
										<!-- <div class="input-icon"> -->
											<!-- <span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div> -->
										<div class="input-group mb-3">
											<select class="form-control" v-model="classroom_id">
												<option :value="classroom.classroom.id" v-for="classroom in myclassrooms" :key="classroom.id">{{ classroom.classroom.name }}</option>
											</select>
											<div class="input-group-append">
									<button @click="getData" :disabled="isLoading" class="btn btn-primary">Tampilkan</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md" id="printMe">
						<b-table 
						bordered
                        id="table-transition-example" 
                        show-empty
                        :fields="fields"
                        :items="classroom_results"
                        >
                        	<template v-slot:cell(name)="row">
                        		<span>
                        			{{ row.item.student.name }}
                        		</span>
                        	</template>
                        	<template v-slot:cell(result)="row">
                        		<span>
                        			{{ row.item.result.point }}
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
import { BDropdown, BDropdownItem, BButton } from 'bootstrap-vue'
import downloadExcel from 'vue-json-excel';

export default {
	name: 'TaskResult',
	components: {
		BDropdownItem, BDropdown, BButton, downloadExcel
	},
	data: () => ({
		classroom_id: '',
		fields: [
			{ key: 'uid', label: 'NIS' },
			{ key: 'name', label:'Nama' },
			{ key: 'result', label: 'Hasil' }
		],
		json_fields: {
			'NIS': 'uid',
			'NAMA PESERTA DIDIK': 'name',
			'NILAI': 'result.point'
		}
	}),
	computed: {
		...mapGetters(['isLoading']),
		...mapState('task', ['classroom_results']),
		...mapState('classroom', ['myclassrooms'])
	},
	methods: {
		...mapActions('task', ['getDataClassroomTaskResults']),
		...mapActions('classroom', ['getDataClassromMine']),
		getData() {
			this.getDataClassroomTaskResults({ 
				task_id: this.$route.params.id,
				classroom_id: this.classroom_id
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		print () {
      		this.$htmlToPaper('printMe');
    	},
	},
	created() {
		this.getDataClassromMine()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>