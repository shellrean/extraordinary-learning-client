<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Informasi</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage informasi sekolah</span>
					</h3>
					<div class="card-toolbar"> 
						<b-button variant="primary" v-b-modal.modal-info> 
							Tambah informasi
						</b-button>
					</div>
				</div>
				<div class="card-body">
					<div class="card-responsive-md" v-if="typeof infos.data != 'undefined'">
						<b-table 
                        show-empty
                        :fields="fields"
                        :items="infos.data"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;">
                        			<span class="font-weight-bolder" v-text="infos.from+row.index"></span>
                        		</span>
                        	</template>
                        	<template v-slot:cell(info)="row">
                        		<span style="width: 250px;">
                        			<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.title"></div>									
                        			<a href="#" class="text-muted font-weight-bold" v-text="row.item.created_at"></a>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item @click="getData(row.item.id)">Edit</b-dropdown-item>
									<b-dropdown-item @click="deleteData(row.item.id)">Hapus</b-dropdown-item>
								</b-dropdown>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="infos.total"
					        :per-page="infos.per_page"
					        :disabled="isLoading"
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
		<b-modal id="modal-info" title="Informasi"  @hide="$store.commit('info/CLEAR_INFO')" no-close-on-backdrop>
			<div class="form-group">
				<label>Judul</label>
				<input type="text" class="form-control form-control-lg form-control-solid" v-model="info.title" :class="{ 'is-invalid' : errors.title }">
			</div>
			<div class="form-group">
				<label>Kontent</label>
				<textarea class="form-control form-control-lg form-control-solid" v-model="info.body" :class="{ 'is-invalid' : errors.body }"></textarea>
			</div>
			<hr>
			<b-form-checkbox v-model="info.status" value="1" switch>
				{{info.status == 1 ? 'Aktif' : 'Tidak aktif' }}
			</b-form-checkbox>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="primary" @click="submit" :disabled="isLoading">
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
import { mapGetters, mapActions, mapState } from 'vuex'
import { BButton, BPagination, BDropdown, BDropdownItem, BFormCheckbox } from 'bootstrap-vue'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'InfoData',
	components: {
		BButton, BPagination, BDropdownItem, BDropdown, BFormCheckbox
	},
	data() {
		return {
			perPage: 10,
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'info', label: 'Informasi' },
				{ key: 'actions', label: 'Aksi' }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('info' ,['info','infos']),
		page: {
			get() {
				return this.$store.state.info.page
			},
			set(val) {
				this.$store.commit('info/SET_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('info' ,['getDataInfos', 'getDataInfo', 'createDataInfo', 'updateDataInfo', 'deleteDataInfo']),
		async changeData() {
			try {
				await this.getDataInfos({ perPage: this.perPage })
			} catch(error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submit() {
			try {
				if(typeof this.info.id != 'undefined') {
					await this.updateDataInfo()
				} else {
					await this.createDataInfo()
				}
				this.changeData()
				this.$bvModal.hide('modal-info')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async getData(id) {
			try {
				await this.getDataInfo(id)
				this.$bvModal.show('modal-info')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async deleteData(id) {
			this.$swal({
	            title: 'Informasi',
	            text: "Informasi akan dihapus",
	            icon: 'warning',
	            showCancelButton: true,
	            confirmButtonColor: '#3085d6',
	            cancelButtonColor: '#c3c3c3',
	            confirmButtonText: 'Lanjutkan!'
	        }).then(async (result) => {
	        	if(result.value) {
	        		try {
	        			await this.deleteDataInfo(id)
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
		page() {
			this.changeData()
		},
		perPage() {
			this.changeData()
		}
	}
}
</script>