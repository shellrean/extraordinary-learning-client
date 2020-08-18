<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Tugas saya</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage tugas saya</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="primary" :to="{ name: 'task.add' }">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/Flatten.svg"
						          />
						        </span>
								Tambah tugas
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
					<div class="table-responsive-md" v-if="typeof tasks.data != 'undefined'">
						<b-table 
                        id="table-transition-example" 
                        show-empty
                        :fields="fields"
                        :items="tasks.data"
                        >
                       		 <template v-slot:cell(title)="row">
                        		<span>
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-primary symbol-sm flex-shrink-0">					
                        					<span class="symbol-label font-size-h4 font-weight-bold ">
                        						<i class="flaticon-edit-1 text-primary"></i>
                        					</span>								
                        				</div>								
                        				<div class="ml-4 d-flex flex-column">									
                        					<router-link :to="{ name: 'task.view', params: { id: row.item.id }}" class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" v-text="row.item.title">
                        						
                        					</router-link>
                        					<span class="text-primary">Batas {{ row.item.lastsubmit }}</span>				
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
	                        	<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item :to="{ name: 'task.check', params: { id: row.item.id }}">Koreksi</b-dropdown-item>
									<b-dropdown-item :to="{ name: 'task.result', params: { id: row.item.id }}">Hasil</b-dropdown-item>
									<b-dropdown-item :to="{ name: 'task.edit', params: { id: row.item.id }}">Edit</b-dropdown-item>
									<b-dropdown-item @click="deleteTask(row.item.id)">Hapus</b-dropdown-item>
								</b-dropdown>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="tasks.total"
					        :per-page="tasks.per_page"
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
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination, BDropdown, BDropdownItem} from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'LectureDataMaster',
	components: {
		BButton, BTable, BPagination, BDropdown, BDropdownItem
	},
	data() {
		return {
			search: '',
			perPage: 10,
	        fields: [
				{ key: 'title', label: 'Title', thStyle: { display: 'none'} },
				{ key: 'actions', label: 'Aksi', thStyle: { display: 'none'} }
			],
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('task', ['tasks']),
		page: {
            get() {
                return this.$store.state.task.page
            },
            set(val) {
                this.$store.commit('task/SET_PAGE', val)
            }
        },
	},
	methods: {
		...mapActions('task', ['getDataTasks', 'deleteDataTask']),
		async changeData() {
			try {
				await this.getDataTasks({ perPage: this.perPage, search: this.search })
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		deleteTask(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tugas akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                	try {
                		await this.deleteDataTask(id)
                		this.changeData()
                	} catch (error) {
                		this.$bvToast.toast(error.message, errorToas())
                	}
                }
            })
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