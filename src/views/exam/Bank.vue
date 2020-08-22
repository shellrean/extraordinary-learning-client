<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Banksoal</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Daftar bnaksoal</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline">
							<b-button variant="primary" v-b-modal.modal-create>
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/Flatten.svg"
						          />
						        </span>
								Tambah banksoal
							</b-button>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="table-responsive-md" v-if="typeof question_banks.data != 'undefined'">
						<b-table :fields="fields"
						  :items="question_banks.data">
							<template v-slot:cell(details)="row">
								<b-button size="sm" variant="white" @click="row.toggleDetails">
									<small>
										<i :class="row.detailsShowing ? 'flaticon2-cross' : 'flaticon2-right-arrow'" class="text-danger"></i>
									</small>
								</b-button>
							</template>
							<template v-slot:cell(code)="row">
								<span style="width: 250px;">
									<div class="d-flex flex-column flex-grow-1 font-weight-bold">
										<router-link :to="{ name: 'exam.bank.questions', params: { id: row.item.id } }" class="text-dark mb-1 font-size-lg text-hover-primary">
											{{ row.item.code }}
										</router-link>
										<span class="text-muted font-weight-bold">{{ row.item.subject.name }}</span>
									</div>
								</span>
							</template>
							<template v-slot:row-details="row">
								<div class="card">
									<div class="card-body">
										<div class="table-responsive-md">
											<table class="table table-bordered">
												<tr>
													<td width="150px">Jumlah PG</td>
													<td>
														<div class="d-flex justify-content-between">
															<span>
																{{ row.item.mc_count }}
															</span>
															<span class="badge badge-success">
																{{ row.item.percentage.mc }} %
															</span>
														</div>
													</td>
												</tr>
												<tr>
													<td>Jumlah esay</td>
													<td>
														<div class="d-flex justify-content-between">
															<span>
																{{ row.item.esay_count }}		
															</span>
															<span class="badge badge-success">
																{{ row.item.percentage.esay }} %
															</span>
														</div>
													</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
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
					        :total-rows="question_banks.total"
					        :per-page="question_banks.per_page"
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
		<b-modal id="modal-create" title="Tambah banksoal" @hide="$store.commit('question/CLEAR_QUESTION_BANK')" no-close-on-backdrop>
			<div class="form-group">
				<label>Mata pelajaran</label>
				<v-select label="name" :reduce="item => item.id" :options="subjects" v-model="question_bank.subject_id">
				</v-select>
				<span class="text-danger" v-if="errors.subject_id">{{ errors.subject_id[0] }}</span>
			</div>
			<div class="form-group">
				<label>Kode banksoal</label>
				<input type="text" class="form-control form-control-lg form-control-solid" :class="{ 'is-invalid' : errors.code }" v-model="question_bank.code">
				<div class="invalid-feedback" v-if="errors.code">{{ errors.code[0] }}</div>
			</div>
			<div class="form-group">
				<label>Jumlah soal pilihan ganda</label>
				<div class="input-group">
					<div class="input-group-prepend" v-show="question_bank.mc_count > 0">
						<button class="btn btn-light-primary" type="button" @click="question_bank.mc_count -= 1">
							<strong>-</strong>
						</button>
					</div>
					<input type="number" class="form-control form-control-lg form-control-solid" :class="{ 'is-invalid' : errors.mc_count }" v-model.number="question_bank.mc_count">
					<div class="input-group-append">
						<button class="btn btn-light-success" type="button" @click="question_bank.mc_count += 1">
							<strong>+</strong>
						</button>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label>Jumlah soal esay</label>
				<div class="input-group">
					<div class="input-group-prepend" v-show="question_bank.esay_count > 0">
						<button class="btn btn-light-primary" type="button" @click="question_bank.esay_count -= 1">
							<strong>-</strong>
						</button>
					</div>
					<input type="number" class="form-control form-control-lg form-control-solid" :class="{ 'is-invalid' : errors.esay_count }" v-model.number="question_bank.esay_count">
					<div class="input-group-append">
						<button class="btn btn-light-success" type="button" @click="question_bank.esay_count += 1">
							<strong>+</strong>
						</button>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group">
						<label>% Pilihan ganda</label>
						<input type="number" class="form-control form-control-lg form-control-solid" v-model.number="question_bank.percentage.mc" @input="checkTotal">
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<label>% Esay</label>
						<input type="number" class="form-control form-control-lg form-control-solid" v-model.number="question_bank.percentage.esay" @input="checkTotal">
					</div>
				</div>
			</div>
			<div class="alert bg-light-primary" v-show="total_error">
				Total harus 100 !!!
			</div>
			<template v-slot:modal-footer="{ cancel }">
				<b-button variant="primary" @click="submit" :disabled="isLoading" v-if="!total_error">
					{{ isLoading ? 'Processing...' : 'Simpan' }}
				</b-button>
				<b-button variant="secondary" @click="cancel()" :disabled="isLoading">
                	Tutup
             	</b-button>
			</template>
		</b-modal>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BDropdown, BDropdownItem, BPagination } from 'bootstrap-vue'
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
	name: 'ExamBank',
	components: {
		BButton, BDropdown, BDropdownItem, BPagination,
		VSelect
	},
	data: () => ({
		perPage: 10,
		total_error: false,
		fields: [
			{ key: 'details', label: 'Detail' },
			{ key: 'code', label: 'Kode' },
			{ key: 'actions' }
		]
	}),
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('question', ['question_banks','question_bank']),
		...mapState('classroom', ['myclassrooms']),
		page: {
			get() {
				return this.$store.state.question.question_banks_page
			},
			set(val) {
				this.$store.commit('question/SET_QUESTION_BANKS_PAGE', val)
			}
		},
		subjects() {
			return this.myclassrooms.map((item) => {
				return {
					id: item.subject.id,
					name: item.subject.name
				}
			})
		}
	},
	methods: {
		...mapActions('question',['getDataQuestionBanks', 'createDataQuestionBank', 'getDataQuestionBank', 'deleteDataQuestionBank', 'updateDataQuestionBank']),
		...mapActions('classroom', ['getDataClassromMine']),
		changeData() {
			this.getDataQuestionBanks({ perPage: this.perPage })
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		submit() {
			if(typeof this.question_bank.id != 'undefined') {
				this.updateDataQuestionBank()
				.then((res) => {
					this.$bvToast.toast('Banksoal diupdate', successToas())
					this.changeData()
					this.$bvModal.hide('modal-create')
				})
				return;
			}
			this.createDataQuestionBank()
			.then((res) => {
				this.$bvToast.toast('Banksoal ditambahkan', successToas())
				this.changeData()
				this.$bvModal.hide('modal-create')
			})
		},
		checkTotal() {
			let total = this.question_bank.percentage.mc + this.question_bank.percentage.esay
			this.total_error = total != 100 ? true : false
		},
		getData(id) {
			this.getDataQuestionBank(id)
			.then((res) => {
				this.$bvModal.show('modal-create')
			})
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		deleteData(id) {
			this.$swal({
                title: 'Informasi',
                text: "Bnksoal akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
            	if(result.value) {
            		try {
            			await this.deleteDataQuestionBank(id)
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
		this.getDataClassromMine()
	},
	watch: {
		
	}
}
</script>