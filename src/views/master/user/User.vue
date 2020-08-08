<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Teachers</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage teachers in your school</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="light-primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm mr-2">
								<i class="flaticon-download"></i>
								Export
							</b-button>
							<b-button variant="primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm">
								<i class="flaticon-plus"></i>
								New Record
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
											<input type="text" class="form-control form-control-solid" placeholder="Search..." id="kt_datatable_search_query" />
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
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="row.item.id"></span></span>
                        	</template>
                        	<template v-slot:cell(user)="row">
                        		<span style="width: 250px;">
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-sm flex-shrink-0">									
                        					<img class="" src="/media/users/100_13.jpg" alt="photo">								
                        				</div>								
                        				<div class="ml-4">									
                        					<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.name"></div>									
                        					<a href="#" class="text-muted font-weight-bold text-hover-primary" v-text="row.item.email"></a>								
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(status)="row">
                        		<span class="label label-lg font-weight-bold  label-light-info label-inline">Active</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-edit"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-medical"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-delete"></i></b-button>
                        	</template>
                    	</b-table>
                    	<div class="mt-3">
					      <b-pagination
					        v-model="currentPage"
					        :total-rows="rows"
					        :per-page="perPage"
					        last-number
					      ></b-pagination>
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
			rows: 100,
	        perPage: 1,
	        currentPage: 5,
			users: {
				data: [
					{ name: 'Shellrean' }
				]
			},
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'user', label: 'User', shortable: true },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: 'Aksi' }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('user', {
			teachers: state => state.teachers
		})
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
			await this.getTeacherDataTable({})
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	}
}
</script>