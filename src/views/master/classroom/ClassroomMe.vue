<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-6">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Kelas saya</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Kelas saya mengajar</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/Flatten.svg"
						          />
						        </span>
								Tambah kelas
							</b-button>
						</div>
					</div>
				</div>
				<div class="card-body">	
					<div class="row" v-if="typeof authenticated.name != 'undefined' && typeof authenticated.classroom != 'undefined'">
						<div class="col-md-5">
							<div class="card card-custom card-stretch gutter-b">
								<div class="card-body d-flex p-0">
									<div class="flex-grow-1 bg-primary p-8 card-rounded flex-grow-1 bgi-no-repeat" style="background-position: calc(100% + 0.5rem) bottom; background-size: auto 70%; background-image: url(/media/svg/banner/svg-coffe.svg)">
										<h4 class="text-inverse-primary mt-2 font-weight-bolder">{{ authenticated.classroom.name }} - {{ authenticated.classroom.group}} ({{ authenticated.classroom.grade}})</h4>
										<p class="text-inverse-primary my-6">Kode: {{ authenticated.classroom.invitation_code }} 
										<br>Bagikan kode kelas hanya kepada murid anda</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row mt-2">
						<div class="col-md-4" v-for="grade in groupedClass">
							<div class="d-flex align-items-center mb-10" v-for="classroom in grade">
								<div class="symbol symbol-40 symbol-light-primary mr-5">
									<div class="symbol-label">
										{{ classroom.classroom.grade }}
									</div>
								</div>
								<div class="d-flex flex-column flex-grow-1 font-weight-bold">
									<router-link  :to="{ name: 'master.classroom.dashboard', params: { id: classroom.classroom_id }}" class="text-dark mb-1 font-size-lg text-hover-primary">
										{{ classroom.classroom.name }}
									</router-link>
									<span class="text-muted">{{ classroom.subject.name }}</span>
								</div>
								<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
									<template v-slot:button-content>
									    <i class="flaticon-more"></i>
									</template>
									<b-dropdown-item @click="deleteClassroomSubject(classroom.id)">Hapus</b-dropdown-item>
								</b-dropdown>
							</div>
						</div>
						<div class="col-md-12" v-if="groupedClass.length == 0">
							<div class="text-center">
								<img src="/media/svg/banner/svg-nodata4.svg" style="max-width: 130px">
								<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">Tidak ada kelas</p>
							</div>
						</div>
					</div>
					<div class="d-flex align-items-center" v-if="isLoading">
						<div class="mr-2 text-muted">Loading...</div>
						<div class="spinner spinner-primary mr-10"></div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah kelas">
			<form class="form">
				<div class="form-group">
					<label>Kelas</label>
					<select class="form-control form-control-lg form-control-solid" v-model="data.classroom_id">
						<option :value="classroom.id" v-for="classroom in classrooms.data">{{ classroom.name }}</option>
					</select>
				</div>
				<div class="form-group">
					<label>Matpel</label>
					<select class="form-control form-control-lg form-control-solid" v-model="data.subject_id">
						<option :value="subject.id" v-for="subject in subjects.data">{{ subject.name }}</option>
					</select>
				</div>
			</form>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { BButton, BDropdownItem, BDropdown } from 'bootstrap-vue'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'SubjectMe',
	components: {
		BButton, BDropdownItem, BDropdown
	},
	data() {
		return {
			data: {
				subject_id: null,
				classroom_id: null
			}
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('classroom',['myclassrooms', 'classrooms']),
		...mapState('subject', ['subjects']),
		...mapState('user', ['authenticated']),
		groupedClass() {
			let group = this.myclassrooms.reduce((r, a) => {
				r[a.classroom.grade] = [...r[a.classroom.grade] || [], a];
			 	return r;
			}, {});
			return Object.values(group)
		}
	},
	methods: {
		...mapActions('classroom', ['getDataClassromMine','getDataClassrooms', 'createNewClassroomSubject', 'deleteDataClassroomSubject']),
		...mapActions('subject', ['getDataSubjects']),
		clearForm() {
			this.data = {
				subject_id: null,
				classroom_id: null
			}
		},
		async changeData() {
			try {
				await this.getDataClassromMine()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submit() {
			try {
				await this.createNewClassroomSubject(this.data)
				this.$bvModal.hide('modal-create')
				this.clearForm()
				this.changeData()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async deleteClassroomSubject(id) {
			this.$swal({
                title: 'Informasi',
                text: "Kelas akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
            	if (result.value) {
					try {
						await this.deleteDataClassroomSubject(id)
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
		this.getDataSubjects({ perPage: 200 })
		this.getDataClassrooms({ perPage: 100 })
	}
}
</script>