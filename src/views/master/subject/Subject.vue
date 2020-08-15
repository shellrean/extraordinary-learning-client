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
                        		<b-button @click="getSubject(row.item.id)" size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2" :disabled="isLoading"><i class="flaticon-edit"></i></b-button>
                        		<b-button @click="deleteSubject(row.item.id)" size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2" :disabled="isLoading"><i class="flaticon-delete"></i></b-button>
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
						<textarea  class="form-control form-control-lg form-control-solid" v-model="subject.description" :class="{ 'is-invalid' : errors.description }" placeholder="Optional"></textarea>
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

		<b-modal id="modal-update" title="Edit matpel" size="lg">
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
						<textarea  class="form-control form-control-lg form-control-solid" v-model="subject.description" :class="{ 'is-invalid' : errors.description }" placeholder="Optional"></textarea>
						<div class="invalid-feedback" v-if="errors.description">{{ errors.email[0] }}</div>
					</div>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="updateSubject" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		    </template>
		</b-modal>

		<b-modal id="modal-import" title="Import matpel" size="lg">
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination, BFormFile } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'SubjectData',
	components: {
		BButton, BTable, BPagination, BFormFile
	},
	data() {
		return {
			perPage: 10,
			search: '',
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'name', label: 'Nama' },
				{ key: 'actions', label: 'Aksi' }
			],
			file: null
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
				this.$store.commit('subject/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('subject', ['getDataSubjects', 'createNewSubject', 'removeDataSubject', 'getDataSubject', 'updateDataSubject', 'importDataSubject']),
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
		},
		deleteSubject(id) {
			this.$swal({
                title: 'Informasi',
                text: "Mata pelajaran akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                   try {
                   		await this.removeDataSubject(id)
                   		this.changeData()
                   } catch (error) {
                   		this.$bvToast.toast(error.message, errorToas())
                   }
                }
            })
		},
		async getSubject(id) {
			try {
				await this.getDataSubject(id)
				this.$bvModal.show('modal-update')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async updateSubject() {
			try {
				await this.updateDataSubject()
				this.changeData()
				this.$bvModal.hide('modal-update')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async upload() {
			try {
				let formData = new FormData()
				formData.append('file', this.file)

				await this.importDataSubject(formData)
				this.$bvModal.hide('modal-import')
				this.file = null

				this.changeData()
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