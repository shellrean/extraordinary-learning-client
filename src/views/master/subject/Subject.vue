<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Mata Pelajaran</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage Mata pelajaran</span>
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
								Tambah matpel
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
					<div class="table-responsive-md" v-if="typeof subjects.data != 'undefined'">
						<b-table 
                        show-empty
                        :fields="fields"
                        :items="subjects.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="subjects.from+row.index"></span></span>
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
					        :total-rows="subjects.total"
					        :per-page="subjects.per_page"
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
								<span class="text-muted">Menampilkan {{ subjects.data.length }} dari {{ subjects.total }} records</span>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah matpel" size="lg">
			<form class="form pt-9">
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Nama
					</label>
					<div class="col-lg-9 col-xl-6">
						<input type="text" class="form-control form-control-lg form-control-solid" v-model="subject.name" :class="{ 'is-invalid' : errors.name }">
						<div class="invalid-feedback" v-if="errors.name">{{ errors.email[0] }}</div>
					</div>
				</div>
				<div class="form-group row">
					<label class="col-xl-3 col-lg-9 text-right col-form-label">
						Deskripsi
					</label>
					<div class="col-lg-9 col-xl-6">
						<textarea  class="form-control form-control-lg form-control-solid" v-model="subject.description" :class="{ 'is-invalid' : errors.description }"></textarea>
						<div class="invalid-feedback" v-if="errors.description">{{ errors.email[0] }}</div>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submitNewSubject" :disabled="isLoading">
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
import { BButton, BTable, BPagination } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'SubjectData',
	components: {
		BButton, BTable, BPagination
	},
	data() {
		return {
			perPage: 10,
			search: '',
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'name', label: 'Nama' },
				{ key: 'actions', label: 'Aksi' }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('subject', {
			subjects: state => state.subjects,
			subject: state => state.subject
		}),
		page: {
			get() {
				return this.$store.state.subject.page
			},
			set(val) {
				this.$route.commit('subject/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('subject', ['getDataSubjects', 'createNewSubject']),
		async changeData() {
			try {
				await this.getDataSubjects({ perPage: this.perPage, search: this.search})
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submitNewSubject() {
			try {
				await this.createNewSubject()
				this.changeData()
				this.$bvModal.hide('modal-create')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
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