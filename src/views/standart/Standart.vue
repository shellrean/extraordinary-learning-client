<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card mb-10">
				<div class="card-header p-4 d-flex justify-content-between">
					<div class="d-flex align-items-center">
						<div class="symbol symbol-45 symbol-light-primary mr-5">
							<span class="symbol-label">
								<i class="flaticon-open-box text-primary"></i>
							</span>
						</div>
						<div class="d-flex flex-column flex-grow-1">
							<span class="text-dark-75 mb-1 font-size-lg font-weight-bolder">
								Perangkat pengajaran
							</span>
							<div class="d-flex">
								<div class="d-flex align-items-center pr-5">
									<span class="svg-icon svg-icon-md svg-icon-primary">
									</span>
									<span class="text-muted font-weight-bold">Daftar perangkat pengajaran</span>
								</div>
							</div>
						</div>
					</div>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline">
							<b-button variant="primary" v-b-modal.modal-create>
								<i class="flaticon2-add-square"></i>
								Tambah perangkat
							</b-button>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-8" v-if="typeof standarts.data != 'undefined'">
					<div class="card" v-for="(row,index) in standarts.data" :key="index">
						<div class="card-header p-4 pb-0">
							<div class="d-flex align-items-center">
								<b-button size="sm" variant="white" v-b-toggle="'standart_'+row.id" v-b-tooltip.hover title="Toggle list standart">
					 				<i class="flaticon2-indent-dots"></i>
					 			</b-button>
					 			<div class="d-flex flex-column flex-grow-1">
					 				<div>
						 				<span class="badge badge-primary">
						 					{{ row.type }}
						 				</span>
					 				</div>
					 			</div>
					 			<div>
					 				<b-button variant="white" size="sm" v-b-tooltip.hover title="Edit standart" @click="getData(row.id)">
					 					<small><i class="flaticon2-contract"></i> Edit</small>
					 				</b-button>
									<b-button variant="white" size="sm" v-b-tooltip.hover title="Tambah standart" @click="addChildStandart(row.id)">
										<small><i class="flaticon-add-circular-button"></i> Tambah</small>
									</b-button>
									<b-button variant="white" size="sm" v-b-tooltip.hover title="Hapus standart" @click="deleteStandart(row.id)">
										<small><i class="flaticon2-trash"></i></small>
									</b-button>
					 			</div>
							</div>
						</div>
						<b-collapse :id="'standart_'+row.id">
						 	<div class="card-body p-4">
						 		<div v-html="row.body">
					 			</div>
					 			<table class="table table-sm table-borderless">
					 				<tr v-for="(child, index) in row.children" :key="'standart_child_'+index">
					 					<td width="20px">{{ child.code }}</td>
					 					<td v-html="child.body"></td>
					 					<td width="120">
					 						<b-button variant="white" size="sm" v-b-tooltip.hover title="Edit standart" @click="getData(child.id)"><small><i class="flaticon2-contract"></i> Edit</small></b-button>
											<b-button variant="white" size="sm" v-b-tooltip.hover title="Hapus standart" @click="deleteStandart(child.id)"><small><i class="flaticon2-trash"></i></small></b-button>
					 					</td>
					 				</tr>
					 			</table>
						 	</div>
					 	</b-collapse>
					</div>
					<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					    <b-pagination
					      v-model="page"
					      :total-rows="standarts.total"
					      :per-page="standarts.per_page"
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
							<span class="badge badge-primary">Total {{ standarts.total }} data</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Perangkat pengajaran" size="lg" @hide="$store.commit('standart/CLEAR_DATA_STANDART')">
			<div class="form-group">
				<label>Type</label>
				<input type="text" class="form-control form-control-lg form-control-solid" v-model="standart.type"/>
			</div>
			<div class="form-group">
				<label>Nomor</label>
				<input type="text" class="form-control form-control-lg form-control-solid" v-model="standart.code"/>
			</div>
			<div class="form-group">
				<label>Body</label>
				<ckeditor v-model="standart.body" v-if="showEditor" :config="editorConfig" type="inline"></ckeditor>
			</div>
			<template v-slot:modal-footer="{ ok, cancel, hide }">
		      	<b-button variant="secondary" @click="cancel()" :disabled="isLoading">
		        	Cancel
		      	</b-button>
				<b-button variant="success" @click="submit" :disabled="isLoading">
		        	{{ isLoading ? 'Processing...' : 'Simpan' }}
		      	</b-button>
			</template>
		</b-modal>
	</div>
</template>
<script>
	import { mapState, mapGetters, mapActions } from 'vuex'
	import { successToas, errorToas } from '@/core/entities/notif'
	import { BButton, BCollapse, BPagination } from 'bootstrap-vue'
	import store from '@/store'

	export default {
		name: 'Standart',
		components: {
			BButton, BCollapse, BPagination
		},
		data() {
			return {
				perPage: 10,
				editorConfig: {
					allowedContent: true,
					fileTools_requestHeaders: {
				        'Accept': 'application/json',
				        'Authorization' : 'Bearer '+store.state.token
				    },
				    height: 200,
				    extraPlugins : 'justify,sourcedialog',
				    FloatingPanelsZIndex : 100001
				}
			}
		},
		computed: {
			...mapGetters(['isLoading']),
			...mapState('standart',['standart','standarts']),
			page: {
				get() {
					return this.$store.state.standart.standart_page
				},
				set(val) {
					this.$store.commit('standart/SET_SANDART_PAGE', val)
				}
			}
		},
		methods: {
			...mapActions('standart', ['getDataStandart','getDataStandarts','createDataStandart','updateDataStandart','deleteDataStandart']),
			changeData() {
				this.getDataStandarts({ perPage: this.perPage })
				.catch((error) => {
					this.$bvToast.toast(error.message, errorToas())
				})
			},
			async submit() {
				try {
					if(typeof this.$store.state.standart.standart.id != 'undefined') {
						await this.updateDataStandart()
					} else {
						await this.createDataStandart()
					}
					this.changeData()
					this.$bvToast.toast('Perangkat pengajaran berhasil disimpan', successToas())
					this.$bvModal.hide('modal-create')
				} catch (error) {
					this.$bvToast.toast(error.message, errorToas())
				}
			},
			async getData(id) {
				try {
					await this.getDataStandart(id)

					this.$bvModal.show('modal-create')
				} catch (error) {
					this.$bvToast.toast(error.message, errorToas())
				}
			},
			addChildStandart(id) {
				this.$store.state.standart.standart.standart_id = id
				this.$bvModal.show('modal-create')
			},
			deleteStandart(id) {
				this.$swal({
	                title: 'Informasi',
	                text: "Perangkat akan dihapus beserta dengan data yang terkait",
	                icon: 'warning',
	                showCancelButton: true,
	                confirmButtonColor: '#3085d6',
	                cancelButtonColor: '#c3c3c3',
	                confirmButtonText: 'Lanjutkan!'
	            }).then(async (result) => {
	                if (result.value) {
	                	try {
	                		await this.deleteDataStandart(id)
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
			this.editorConfig.filebrowserUploadUrl = `${this.baseURL}/api/v1/file?`
			this.showEditor = true
		},
		watch: {
			perPage() {
				this.changeData()
			},
			page() {
				this.changeData()
			}
		}
	}
</script>
<style >
	div[contenteditable] {
    outline: 1px solid #616161;
}
</style>