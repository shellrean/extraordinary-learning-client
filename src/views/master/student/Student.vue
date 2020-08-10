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
							<b-button variant="light-primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm mr-2">
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
					<div class="table-responsive-md" v-if="typeof teachers.data != 'undefined'">
						<b-table 
                        id="table-transition-example" 
                        :tbody-transition-props="transProps"
                        show-empty
                        :fields="fields"
                        :items="teachers.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="teachers.from+row.index"></span></span>
                        	</template>
                        	<template v-slot:cell(user)="row">
                        		<span style="width: 250px;">
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-warning symbol-sm flex-shrink-0">									
                        					<img class="" src="/media/users/100_13.jpg" alt="photo" v-if="row.item.details != null && typeof row.item.details.avatar != 'undefined' && row.item.settings.avatar != ''">
                        					<span class="symbol-label font-size-h4 font-weight-bold" v-else>{{ row.item.name.charAt(0) }}</span>								
                        				</div>								
                        				<div class="ml-4">									
                        					<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.name"></div>									
                        					<a href="#" class="text-muted font-weight-bold text-hover-primary" v-text="row.item.email"></a>								
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(status)="row">
                        		<span class="label label-lg font-weight-bold  label-light-info label-inline">{{ row.item.isactive == 0 ? 'In- active' : 'Active' }}</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-edit"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-medical"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-delete"></i></b-button>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="teachers.total"
					        :per-page="teachers.per_page"
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
								<span class="text-muted">Menampilkan {{ teachers.data.length }} dari {{ teachers.total }} records</span>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah guru" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="data.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Email
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="email" class="form-control form-control-lg form-control-solid" v-model="data.email" :class="{ 'is-invalid' : errors.email }">
						<div class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label form-control-solid">
						Password
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="password" class="form-control form-control-lg form-control-solid" v-model="data.password" :class="{ 'is-invalid' : errors.password }">
						<div class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</div>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submitNewTeacher" :disabled="isLoading">
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
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'UserDataMaster',
	components: {
		BButton, BTable, BPagination
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
	        perPage: 10,
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'user', label: 'User', shortable: true },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: 'Aksi' }
			],
			search: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('user', {
			teachers: state => state.teachers
		}),
		page: {
            get() {
                return this.$store.state.user.page
            },
            set(val) {
                this.$store.commit('user/SET_PAGE', val)
            }
        }
	},
	methods: {
		...mapActions('user', ['createNewTeacher', 'getTeacherDataTable']),
		clearForm() {
			this.data = {
				name: '',
				email: '',
				password: ''
			}
		},	
		async submitNewTeacher() {
			try {
				await this.createNewTeacher(this.data)
				this.getTeacherDataTable({ search: this.search, perPage: this.perPage })
				this.$bvModal.hide('modal-create')
				this.clearForm()
				this.$store.commit('CLEAR_ERROR')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	async created() {
		try {
			 this.getTeacherDataTable({ search: this.search, perPage: this.perPage })
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	watch: {
		page() {
			this.getTeacherDataTable({ search: this.search, perPage: this.perPage })
		},
		search:  _.debounce(function (value) {
            this.getTeacherDataTable({ search: this.search, perPage: this.perPage })
        }, 500),
		perPage() {
			this.getTeacherDataTable({ search: this.search, perPage: this.perPage })
		}
	}
}
</script>