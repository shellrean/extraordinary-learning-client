<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Kelas</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage Kelas</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="light-primary" v-b-modal.modal-import class="font-weight-bolder font-size-sm mr-2">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/PenAndRuller.svg"
						          />
						        </span>
								Import
							</b-button>
							<b-button variant="primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/Flatten.svg"
						          />
						        </span>
								Tambah kelas
							</b-button>
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
											<input type="text" class="form-control form-control-solid" placeholder="Search..." id="kt_datatable_search_query" v-model="search"/>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md" v-if="typeof classrooms.data != 'undefined'">
						<b-table 
                        show-empty
                        :fields="fields"
                        :items="classrooms.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="classrooms.from+row.index"></span></span>
                        	</template>
                        	<template v-slot:cell(classroom)="row">
                        		<span style="width: 250px;">
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-warning symbol-sm flex-shrink-0">					
                        					<span class="symbol-label font-size-h4 font-weight-bold">{{ row.item.grade }}</span>								
                        				</div>								
                        				<div class="ml-4">									
                        					<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.name"></div>									
                        					<a href="#" class="text-muted font-weight-bold text-hover-primary" v-text="row.item.group"></a>	
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-button size="sm" :to="{ name: 'master.classroom.dashboard', params: { id: row.item.id }}" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-buildings"></i></b-button>
                        		<b-button @click="getClassroom(row.item.id)" size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-edit"></i></b-button>
                        		<b-button @click="deleteClassroom(row.item.id)" size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-delete"></i></b-button>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="classrooms.total"
					        :per-page="classrooms.per_page"
					        :disabled="isLoading"
					        last-number
					      ></b-pagination>
					      <div class="d-flex align-items-center py-3">
								<div class="d-flex align-items-center" v-if="isLoading">
									<div class="mr-2 text-muted">Loading...</div>
									<div class="spinner spinner-primary mr-10"></div>
								</div>
								<select class="form-control form-control-sm text-primary font-weight-bold mr-4 border-0 bg-light-primary" style="width: 75px;" v-model.int="perPage">
									<option value="10">10</option>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="50">50</option>
									<option value="100">100</option>
								</select>
								<span class="text-muted">Menampilkan {{ classrooms.data.length }} dari {{ classrooms.total }} records</span>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah kelas" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="classroom.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Grade
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="number" class="form-control form-control-lg form-control-solid" v-model.number="classroom.grade" :class="{ 'is-invalid' : errors.grade }">
						<div class="invalid-feedback" v-if="errors.grade">{{ errors.grade[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Group
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="TEXT" class="form-control form-control-lg form-control-solid" v-model="classroom.group" :class="{ 'is-invalid' : errors.group }">
						<div class="invalid-feedback" v-if="errors.group">{{ errors.group[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Wali kelas
					</label>
					<div class="col-lg-9 col-xl-6">
						<select class="form-control form-control-lg form-control-solid" v-model="classroom.teacher_id">
							<option :value="teacher.id" v-for="teacher in teachers.data">{{ teacher.name }}</option>
						</select>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submitNewClassroom" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-edit" title="Edit kelas" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="classroom.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Grade
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="number" class="form-control form-control-lg form-control-solid" v-model.number="classroom.grade" :class="{ 'is-invalid' : errors.grade }">
						<div class="invalid-feedback" v-if="errors.grade">{{ errors.grade[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Group
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="TEXT" class="form-control form-control-lg form-control-solid" v-model="classroom.group" :class="{ 'is-invalid' : errors.group }">
						<div class="invalid-feedback" v-if="errors.group">{{ errors.group[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Wali kelas
					</label>
					<div class="col-lg-9 col-xl-6">
						<select class="form-control form-control-lg form-control-solid" v-model="classroom.teacher_id">
							<option :value="teacher.id" v-for="teacher in teachers.data">{{ teacher.name }}</option>
						</select>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submitNewClassroom" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-import" title="Import kelas" size="lg">
			<b-form-file
		      v-model="file"
		      :state="Boolean(file)"
		      placeholder="Choose a file excel or drop it here..."
		      drop-placeholder="Drop file here..."
		    ></b-form-file>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="importDataClassroom" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination, BFormFile } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'ClassroomData',
	components: {
		BButton, BTable, BPagination, BFormFile
	},
	data() {
		return {
			perPage: 10,
			search: '',
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'classroom', label: 'Nama' },
				{ key: 'actions', label: 'Aksi' }
			],
			file: null
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('classroom',['classrooms','classroom']),
		...mapState('user', ['teachers']),
		page: {
			get() {
				return this.$store.state.classroom.page
			},
			set(val) {
				this.$store.commit('classroom/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('classroom', ['getDataClassrooms', 'getDataClassroom', 'createNewClassroom', 'deleteDataClassroom', 'importClassroom']),
		...mapActions('user', ['getTeacherDataTable']),
		async changeData() {
			try {
				await this.getDataClassrooms({ perPage: this.perPage, search: this.search})
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submitNewClassroom() {
			try {
				await this.createNewClassroom()
				this.changeData()
				this.$bvModal.hide('modal-create')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submitUpdateClassroom() {
			try {
				await this.updateDataClassroom()
				
				
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		deleteClassroom(id) {
			this.$swal({
                title: 'Informasi',
                text: "Kelas akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
					try {
						await this.deleteDataClassroom(id)
						this.changeData()
					} catch (error) {
						this.$bvToast.toast(error.message, errorToas())
					}
                }
            })
		},
		async getClassroom(id) {
			try {
				await this.getDataClassroom(id)

				this.$bvModal.show('modal-edit')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async importDataClassroom() {
			try {
				let formData = new FormData()
				formData.append('file', this.file)

				await this.importClassroom(formData)
				this.$bvModal.hide('modal-import')
				this.file = null
				this.changeData()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		this.getTeacherDataTable({ perPage: 200 })
		this.changeData()
	},
	watch: {
		page() {
			this.changeData()
		},
		search: _.debounce(function(value) {
			this.changeData()
		}, 500),
		perPage() {
			this.changeData()
		}
	}
}
</script>