<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Soal</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage soal</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline">
							<router-link :to="{ name: 'exam.bank' }" class="btn btn-light-primary mr-2">
								<i class="flaticon2-left-arrow-1"></i>Kembali
							</router-link>
							<b-dropdown  variant="link" toggle-class="text-decoration-none" no-caret>
								<template v-slot:button-content>
									<b-button variant="primary" class="font-weight-bolder font-size-sm">
										<span class="svg-icon svg-icon">
								          <inline-svg
								            class="svg-icon"
								            src="/media/svg/icons/Design/Flatten.svg"
								          />
								        </span>
										Tambah soal
									</b-button>
								</template>
								<b-dropdown-item :to="{ name: 'exam.bank.question.add', params: { id: $route.params.id} }">Form input</b-dropdown-item>
								<b-dropdown-item @click="">Import file (.docx)</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="table-responsive-md" v-if="typeof questions.data != 'undefined'">
						<b-table 
                        show-empty
                        small
                        :fields="fields"
                        :items="questions.data"
                        >
                        	<template v-slot:cell(details)="row">
                        		<div style="width: 40px">	
								<b-button size="sm" variant="white" @click="row.toggleDetails">
									<small>
										<i :class="row.detailsShowing ? 'flaticon2-cross' : 'flaticon2-right-arrow'" class="text-danger"></i>
									</small>
								</b-button>
                        		</div>
							</template>
                        	<template v-slot:cell(no)="row">
                        		<div class="text-dark-75 font-size-lg mb-0">
                        			{{ row.item.type == '1' ? 'Pilihan ganda' : 'Esay' }}
                        		</div>
                        	</template>
                        	<template v-slot:row-details="row">
                        		<div class="card">
                        			<div class="card-body">
										<div class="table-responsive-md">
											<div v-html="row.item.question">
												
											</div>
											<table class="table" v-if="row.item.options != ''">
												<tr v-for="(option, index) in row.item.options" :key="index">
													<td width="20px">
														<i class="flaticon2-correct text-success" v-if="option.correct == '1'"></i>
													</td>
													<td>
														<div v-html="option.body"></div>
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
									<b-dropdown-item :to="{ name: 'exam.bank.question.edit', params: {id: $route.params.id, id_question: row.item.id} }">Edit</b-dropdown-item>
									<b-dropdown-item @click="deleteData(row.item.id)">Hapus</b-dropdown-item>
								</b-dropdown>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <b-pagination
					      	pills 
					        v-model="page"
					        :total-rows="questions.total"
					        :per-page="questions.per_page"
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
import { mapState, mapActions, mapGetters } from 'vuex'
import { BButton, BDropdown, BDropdownItem, BPagination } from 'bootstrap-vue'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'ExamBankQuestion',
	components: {
		BButton, BDropdown, BDropdownItem,BPagination
	},
	data: () => ({
		perPage: 10,
		fields: [
			{ key: 'details', label: 'Detail' },
			{ key: 'no', label: 'Tipe soal' },
			{ key: 'actions', label: 'Aksi' }
		]
	}),
	computed: {
		...mapGetters(['isLoading']),
		...mapState('question', ['questions']),
		page: {
			get() {
				return this.$store.state.question.questions_page
			},
			set(val) {
				this.$store.commit('question/SET_QUESTIONS_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('question', ['getDataQuestions', 'deleteDataQuestion']),
		changeData() {
			this.getDataQuestions({ id: this.$route.params.id, perPage: this.perPage })
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		},
		deleteData(id) {
			this.$swal({
                title: 'Informasi',
                text: "Soal akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                	try {
                		await this.deleteDataQuestion(id)
                		this.changeData()
                		this.$bvToast.toast('Soal berhasil dihapus', successToas())
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