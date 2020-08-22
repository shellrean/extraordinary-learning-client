<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Peserta didik</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage peserta didik</span>
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
								Tambah peserta
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
					<div class="table-responsive-md" v-if="typeof students.data != 'undefined'">
						<b-table 
                        id="table-transition-example" 
                        :tbody-transition-props="transProps"
                        show-empty
                        :fields="fields"
                        :items="students.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="students.from+row.index"></span></span>
                        	</template>
                        	<template v-slot:cell(user)="row">
                        		<span style="width: 250px;">
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">									
                        					<img class="" src="/media/users/100_13.jpg" alt="photo" v-if="row.item.details != null && typeof row.item.details.avatar != 'undefined' && row.item.settings.avatar != ''">
                        					<span class="symbol-label font-size-h4 font-weight-bold" v-else>{{ row.item.name.charAt(0) }}</span>								
                        				</div>								
                        				<div class="ml-4">									
                        					<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.name"></div>									
                        					<a href="#" class="text-muted font-weight-bold" v-text="row.item.email"></a>								
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(status)="row">
                        		<span class="label label-lg font-weight-bold  label-light-info label-inline">{{ row.item.isactive == 0 ? 'In- active' : 'Active' }}</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item  @click="getUserData(row.item.id)" >Edit</b-dropdown-item>
									<b-dropdown-item @click="deleteStudent(row.item.id)">Hapus</b-dropdown-item>
								</b-dropdown>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="students.total"
					        :per-page="students.per_page"
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
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah peserta" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="student.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Email
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="email" class="form-control form-control-lg form-control-solid" v-model="student.email" :class="{ 'is-invalid' : errors.email }">
						<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label form-control-solid">
						Password
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="password" class="form-control form-control-lg form-control-solid" v-model="student.password" :class="{ 'is-invalid' : errors.password }">
						<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submitNewStudent" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-edit" title="Edit peserta" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="student.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Email
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="email" class="form-control form-control-lg form-control-solid" v-model="student.email" :class="{ 'is-invalid' : errors.email }">
						<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Status
					</label>
					<div class="col-lg-9 col-xl-6">
						<select class="form-control" v-model="student.isactive">
							<option value="1">Aktif</option>
							<option value="0">Tidak aktif</option>
						</select>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="updateData" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-import" title="Import peserta" size="lg">
			<b-form-file
		      v-model="file"
		      :state="Boolean(file)"
		      placeholder="Choose a file excel or drop it here..."
		      drop-placeholder="Drop file here..."
		    ></b-form-file>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="upload" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Upload' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination, BFormFile, BDropdown, BDropdownItem } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'UserDataMaster',
	components: {
		BButton, BTable, BPagination, BFormFile, BDropdown, BDropdownItem
	},
	data() {
		return {
			transProps: {
              name: 'flip-list'
            },
			data: {
				name: '',
				email: '',
				password: '',
			},
			file: null,
	        perPage: 10,
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'user', label: 'Peserta', shortable: true },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: 'Aksi' }
			],
			search: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('user',['student','students']),
		page: {
            get() {
                return this.$store.state.user.student_page
            },
            set(val) {
                this.$store.commit('user/SET_STUDENT_PAGE', val)
            }
        }
	},
	methods: {
		...mapActions('user', ['createNewStudent', 'getDataStudents','deleteUser', 'getStudent', 'updateStudent', 'importStudent']),
		changeData() {
			this.getDataStudents({ search: this.search, perPage: this.perPage })
		},
		clearForm() {
			this.data = {
				name: '',
				email: '',
				password: ''
			}
		},	
		async submitNewStudent() {
			try {
				await this.createNewStudent(this.data)
				this.changeData()
				this.$bvModal.hide('modal-create')
				this.clearForm()
				this.$store.commit('CLEAR_ERROR')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		deleteStudent(id) {
			this.$swal({
                title: 'Informasi',
                text: "Peserta akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                   try {
                   		await this.deleteUser(id)
                   		this.changeData()
                   } catch (error) {
                   		this.$bvToast.toast(error.message, errorToas())
                   }
                }
            })
		},
		async getUserData(id) {
			try {
				await this.getStudent(id)

				this.$bvModal.show('modal-edit')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async updateData() {
			try {
				await this.updateStudent()

				this.$bvModal.hide('modal-edit')
				this.changeData()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async upload() {
			try {
				let formData = new FormData()
				formData.append('file', this.file)

				await this.importStudent(formData)

				this.$bvModal.hide('modal-import')
				this.file = null

				this.changeData()
			} catch (error) {	
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	async created() {
		try {
			this.changeData()
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	watch: {
		page() {
			this.changeData()
		},
		search:  _.debounce(function (value) {
            this.changeData()
        }, 500),
		perPage() {
			this.changeData()
		}
	}
}
</script>