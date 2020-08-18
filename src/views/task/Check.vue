<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Koreksi tugas</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Koreksi tugas siswa</span>
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
									<button :disabled="isLoading"  @click="getData" class="btn btn-light-primary px-6 font-weight-bold">Tampilkan</button>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md">
						<b-table 
                        id="table-transition-example" 
                        show-empty
                        :fields="fields"
                        :items="classroom_submit_tasks"
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
                        					<a href="#" @click.prevent="showData(row.item.id)" class="text-dark-75 text-hover-primary font-weight-bolder font-size-lg mb-0" v-text="row.item.student.name"></a>
                        					<span class="text-muted">{{ row.item.created_at }}</span>
                        				</div>
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
	                        	<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item @click="deleteAssignment(row.item.id)">Hapus</b-dropdown-item>
								</b-dropdown>
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
			<b-modal id="modal-assign" title="Tugas siswa" size="lg">
				<VuePerfectScrollbar
			      style="max-height: 60vh; position: relative;"
			    >
			    	<div  v-if="typeof use_data.content != 'undefined'">
						<img :src="`${baseURL}/storage/attachment/${file}`" class="img-thumbnail" v-for="file in use_data.content.file">
			    	</div>
				</VuePerfectScrollbar>
				<div class="form-group mb-3">
				  <input type="number" max-number="100" class="form-control form-control-lg form-control-solid" placeholder="Nilai: 0 - 100" v-model="point">
				</div>
				<template v-slot:modal-footer="{ cancel }">
			      <b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
			        {{ isLoading ? 'Processing...' : 'Simpan' }}
			      </b-button>
			    </template>
			</b-modal>
		</div>
	</div>
</template>
<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapState, mapGetters, mapActions } from 'vuex'
import { errorToas, successToas } from '@/core/entities/notif'
import { BButton, BDropdown, BDropdownItem} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'TaskCheck',
	components: {
		BButton, BDropdown, BDropdownItem, VueSlickCarousel, VuePerfectScrollbar
	},
	data: () => ({
		classroom_id: '',
		fields: [
			{ key: 'name', thStyle: { display: 'none' }},
			{ key: 'actions', thStyle: { display: 'none'} }
		],
		setting: {
		  "lazyLoad": "ondemand",
		  "dots": true,
		  "fade": true,
		  "infinite": true,
		  "speed": 500,
		  "slidesToShow": 1,
		  "slidesToScroll": 1
		},
		use_data: {},
		point: 0
	}),
	computed: {
		...mapGetters(['isLoading','baseURL']),
		...mapState('task', ['classroom_submit_tasks'])
	},
	methods: {
		...mapActions('task', ['getDataUncheckedTask', 'deleteDataStudentTask', 'createNewTaskResult']),
		deleteFromList(id) {
			let index = this.classroom_submit_tasks.map(item => item.id).indexOf(id)
			this.classroom_submit_tasks.splice(index, 1)
		},
		getData() {
			this.getDataUncheckedTask({ 
				task_id: this.$route.params.id,
				classroom_id: this.classroom_id
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		deleteAssignment(id) {
			this.$swal({
                title: 'Informasi',
                text: "Tugas siswa akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
            	if(result.value) {
            		try {
            			await this.deleteDataStudentTask(id)
            			let index = this.classroom_submit_tasks.map(item => item.id).indexOf(id)
            			this.classroom_submit_tasks.splice(index,1)
            		} catch (error) {
            			this.$bvToast.toast(error.message, errorToas())
            		}
            	}
            })
		},
		showData(id) {
			let index = this.classroom_submit_tasks.map(item => item.id).indexOf(id)
			this.use_data = this.classroom_submit_tasks[index]
			this.$bvModal.show('modal-assign')
		},
		async submit() {
			try {
				await this.createNewTaskResult({
					student_task_id: this.use_data.id,
					point: this.point
				})
				this.$bvModal.hide('modal-assign')
				this.point = 0
				this.deleteFromList(this.use_data.id)
				this.$bvToast.toast('Nilai berhasil disimpan', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>