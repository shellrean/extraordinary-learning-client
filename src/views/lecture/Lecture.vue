<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Materi Pembelajaran</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage materi pembelajaran</span>
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
							<b-button variant="primary" :to="{ name: 'lecture.add' }">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/Flatten.svg"
						          />
						        </span>
								Tambah materi
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
					<div class="table-responsive-md" v-if="typeof lectures.data != 'undefined'">
						<b-table 
                        id="table-transition-example" 
                        show-empty
                        :fields="fields"
                        :items="lectures.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="lectures.from+row.index"></span></span>
                        	</template>

                        	<template v-slot:cell(status)="row">
                        		<span class="label label-lg font-weight-bold  label-light-info label-inline">{{ row.item.isactive == 0 ? 'In- active' : 'Active' }}</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-edit"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2" :to="{ name: 'lecture.view', params: { id: row.item.id }}"><i class="flaticon-medical"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-delete"></i></b-button>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="lectures.total"
					        :per-page="lectures.per_page"
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
								<span class="text-muted">Menampilkan {{ lectures.data.length }} dari {{ lectures.total }} records</span>
							</div>
					    </div>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'LectureDataMaster',
	components: {
		BButton, BTable, BPagination
	},
	data() {
		return {
			search: '',
			perPage: 10,
	        fields: [
				{ key: 'no', label: '#' },
				{ key: 'title', label: 'Title', shortable: true },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: 'Aksi' }
			],
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('lecture', {
			lectures: state => state.lectures
		}),
		page: {
            get() {
                return this.$store.state.lecture.page
            },
            set(val) {
                this.$store.commit('lecture/SET_PAGE', val)
            }
        },
	},
	methods: {
		...mapActions('lecture', ['getDataLectures']),
		async changeData() {
			try {
				await this.getDataLectures({ perPage: this.perPage, search: this.search })
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		this.changeData()
	},
	watch: {
		perPage() {
			this.changeData()
		},
		search:  _.debounce(function (value) {
            this.changeData()
        }, 500),
        page() {
        	this.changeData()
        }
	}
}
</script>