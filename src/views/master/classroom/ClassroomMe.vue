<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card mb-10">
				<div class="card-header p-4 d-flex justify-content-between">
					<div class="d-flex align-items-center">
						<div class="symbol symbol-45 symbol-light-primary mr-5">
							<span class="symbol-label">
								<i class="flaticon-clipboard text-primary"></i>
							</span>
						</div>
						<div class="d-flex flex-column flex-grow-1">
							<span class="text-dark-75 mb-1 font-size-lg font-weight-bolder">
								Kelas saya
							</span>
							<div class="d-flex">
								<div class="d-flex align-items-center pr-5">
									<span class="svg-icon svg-icon-md svg-icon-primary">
									</span>
									<span class="text-muted font-weight-bold">Kelas saya mengajar</span>
								</div>
							</div>
						</div>
					</div>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline">
							<b-button variant="primary" v-b-modal.modal-create>
								<i class="flaticon2-add-square"></i>
								Tambah kelas
							</b-button>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4" v-for="grade in groupedClass">
					<table class="table table-borderless table-sm">
						<tr v-for="classroom in grade">
							<td>
								<div class="card">
									<div class="card-header p-0 d-flex justify-content-between">
										<div class="d-flex align-items-center">
											<b-button squared class="mr-1" variant="light-success" size="sm" @click="getSchedules(classroom.id)" v-b-tooltip.hover title="Daftar jadwal">
												<i class="flaticon-list-2"></i>
											</b-button>
											<b-button squared class="mr-1" variant="light-primary" size="sm" @click="addSchedule(classroom.id)" v-b-tooltip.hover title="Tambah jadwal">
												<i class="flaticon-file-1"></i>
											</b-button>
											<b-button squared variant="light-danger" size="sm" @click="deleteClassroomSubject(classroom.id)" v-b-tooltip.hover title="Hapus kelas">
												<i class="flaticon2-trash"></i>
											</b-button>
										</div>
									</div>
								</div>
								<div class="card" >
								 	<div class="card-body p-4">
										<div class="d-flex align-items-center">
											<div class="d-flex flex-column flex-grow-1 font-weight-bold">
												<span class="text-dark mb-1 font-size-lg">
													{{ classroom.classroom.name }} - {{ classroom.classroom.grade }} 
												</span>
												<span class="text-muted">{{ classroom.subject.name }}</span>
											</div>
										</div>
										<router-link :to="{ name: 'master.classroom.dashboard', params: { id: classroom.classroom_id }}" class="stretched-link"></router-link>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="col-md-12" v-if="groupedClass.length == 0">
					<div class="text-center">
						<img src="/media/svg/banner/svg-nodata4.svg" style="max-width: 230px">
						<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">Tidak ada kelas, silakan tambah kelas anda mengajar terlebih dahulu</p>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah kelas">
			<form class="form">
				<div class="form-group">
					<label>Kelas</label>
					<v-select label="name" :reduce="item => item.id" :options="classrooms.data" v-model="data.classroom_id">
					</v-select>
				</div>
				<div class="form-group">
					<label>Matpel</label>
					<v-select label="name" :reduce="item => item.id" :options="subjects.data" v-model="data.subject_id">
					</v-select>
				</div>
			</form>
			<template v-slot:modal-footer="{ cancel }">
		      <b-button size="sm" variant="secondary" @click="cancel()" :disabled="isLoading">
		        Cancel
		      </b-button>
		      <b-button size="sm" variant="success" @click="submit" :disabled="isLoading">
		        {{ isLoading ? 'Processing...' : 'Simpan' }}
		      </b-button>
		    </template>
		</b-modal>
		<b-modal id="modal-schedule" size="xl" title="Jadwal" @hide="id_show = null">
			<template v-slot:modal-header="{ close }">
		    	<b-button variant="primary" @click="addSchedule(id_show)"><i class="flaticon2-add-square"></i> Tambah jadwal</b-button>
		    </template>
			<div class="container">
				<div class="row">
					<div class="col-md-4" v-for="days in filteredSchedules" >
						<div class="card">
							<div class="card-body p-4">
								<div class="d-flex align-items-center mb-2" v-for="schedule in days">
									<div class="d-flex flex-column flex-grow-1">
										<span class="text-dark-75 font-weight-bold font-size-lg mb-1">{{ schedule.day | dayIndex }}</span>
										<span class="text-muted font-weight-bold"><span class="badge badge-success">{{ schedule.from_time }}</span> - <span class="badge badge-secondary">{{ schedule.end_time }}</span></span>
									</div>
									<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
										<template v-slot:button-content>
											   <i class="flaticon-more"></i>
										</template>
										<b-dropdown-item @click="getSchedule(schedule.id)">Edit</b-dropdown-item>
										<b-dropdown-item @click="deleteSchedule(schedule.id)">Hapus</b-dropdown-item>
									</b-dropdown>
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-12" v-if="filteredSchedules.length === 0">
						Tidak ada data jadwal, buat jadwal terlebih dahulu
					</div>
				</div>
			</div>
			<template v-slot:modal-footer="{ ok, cancel, hide }">
				<b-button size="sm" variant="secondary" @click="cancel()">
			        Tutup
			    </b-button>
			</template>
		</b-modal>
		<b-modal id="modal-schedule-add" title="Jadwal" @hide="$store.commit('classroom/CLEAR_SCHEDULE')" no-close-on-backdrop>
			<div class="form-group">
				<label>Hari</label>
				<v-select label="name" :reduce="item => item.id" :options="days" v-model="schedule.day">
				</v-select>
				<div class="text-danger" v-if="errors.day">{{ errors.day[0] }}</div>
			</div>
			<div class="form-group">
				<label>Waktu mulai</label>
				<VueCtkDateTimePicker v-model="schedule.from_time" only-time format='HH:mm' formatted='HH:mm' label="Waktu mulai" id="wkt_mlai"/>
				<div class="text-danger" v-if="errors.from_time">{{ errors.from_time[0] }}</div>
			</div>
			<div class="form-group">
				<label>Waktu berakhir</label>
				<VueCtkDateTimePicker v-model="schedule.end_time" only-time format='HH:mm' formatted='HH:mm' label="Waktu berakhir" id="wkt_selesai"/>
				<div class="text-danger" v-if="errors.end_time">{{ errors.end_time[0] }}</div>
			</div>
			<template v-slot:modal-footer="{ ok, cancel, hide }">
			    <b-button size="sm" variant="secondary" @click="cancel()">
			        Cancel
			    </b-button>
				<b-button size="sm" variant="success" @click="submitSchedule" :disabled="isLoading">
			        {{ isLoading ? 'Processing...' : 'Simpan' }}
			    </b-button>
			</template>
		</b-modal>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { BButton, BDropdownItem, BDropdown } from 'bootstrap-vue'
import { successToas, errorToas } from '@/core/entities/notif'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import VSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

export default {
	name: 'SubjectMe',
	components: {
		BButton, BDropdownItem, BDropdown,
		VueCtkDateTimePicker, VSelect
	},
	data() {
		return {
			data: {
				subject_id: null,
				classroom_id: null,
			},
			days: [
				{ id: 1, name: 'Senin' },
				{ id: 2, name: 'Selasa' },
				{ id: 3, name: 'Rabu' },
				{ id: 4, name: 'Kamis' },
				{ id: 5, name: 'Jumat' },
				{ id: 6, name: 'Sabtu' }
			],
			id_show: null
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('classroom',['myclassrooms', 'classrooms', 'schedule', 'schedules']),
		...mapState('subject', ['subjects']),
		...mapState('user', ['authenticated']),
		groupedClass() {
			let group = this.myclassrooms.reduce((r, a) => {
				r[a.classroom.grade] = [...r[a.classroom.grade] || [], a];
			 	return r;
			}, {});
			return Object.values(group)
		},
		filteredSchedules() {
			let group = this.schedules.reduce((r, a) => {
				r[a.day] = [...r[a.day] || [], a];
			 	return r;
			}, {});
			return Object.values(group)
		}
	},
	filters: {
		dayIndex(i){
			let days= [
				{ id: 1, name: 'Senin' },
				{ id: 2, name: 'Selasa' },
				{ id: 3, name: 'Rabu' },
				{ id: 4, name: 'Kamis' },
				{ id: 5, name: 'Jumat' },
				{ id: 6, name: 'Sabtu' }
			]
			let index = days.map(item => item.id).indexOf(parseInt(i))
			if(index !== -1) {
				return days[index].name
			}
			return 'Day not found'
		}
	},
	methods: {
		...mapActions('classroom', ['getDataClassromMine','getDataClassrooms', 'createNewClassroomSubject', 'deleteDataClassroomSubject', 'updateDataSchedule', 'createDataSchedule', 'getDataSchedules', 'getDataSchedule', 'deleteDataSchedule']),
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
				this.$bvToast.toast('Kelas berhasil disimpan', successToas())
				this.clearForm()
				this.changeData()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submitSchedule() {
			try {
				if(typeof this.schedule.id != 'undefined') {
					await this.updateDataSchedule()
				} else {
					await this.createDataSchedule()
				}
				if(this.id_show != null) {
					this.getSchedules(this.id_show)
				}
				this.$bvModal.hide('modal-schedule-add')
				this.$bvToast.toast('Jadwal berhasil disimpan', successToas())
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
						this.$bvToast.toast('Kelas berhasil dihapus', successToas())
						this.changeData()
					} catch (error) {	
						this.$bvToast.toast(error.message, errorToas())
					}
            	}	
            })
		},
		async deleteSchedule(id) {
			this.$swal({
                title: 'Informasi',
                text: "Jadwal akan dihapus beserta dengan data yang terkait",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
            	if (result.value) {
					try {
						await this.deleteDataSchedule(id)
						this.$bvToast.toast('Jadwal berhasil dihapus', successToas())
						if(this.id_show != null) {
							this.getSchedules(this.id_show)
						}
					} catch (error) {	
						this.$bvToast.toast(error.message, errorToas())
					}
            	}	
            })
		},
		async getSchedules(id) {
			try {
				await this.getDataSchedules(id)
				this.id_show = id
				this.$bvModal.show('modal-schedule')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async getSchedule(id) {
			try {
				await this.getDataSchedule(id)
				this.$bvModal.show('modal-schedule-add')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		addSchedule(id) {
			this.schedule.classroom_subject_id = id
			this.$bvModal.show('modal-schedule-add')
		}
	},
	created() {
		this.changeData()
		this.getDataSubjects({ perPage: 200 })
		this.getDataClassrooms({ perPage: 100 })
	}
}
</script>