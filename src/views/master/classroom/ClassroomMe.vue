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
			<div class="row" v-if="typeof authenticated.name != 'undefined' && typeof authenticated.classroom != 'undefined'">
				<div class="col-md-5">
					<div class="card card-custom card-stretch gutter-b shadow-none">
						<div class="card-body d-flex p-0 card-header-right ribbon ribbon-clip ribbon-left">
							<div class="ribbon-target" style="top: 12px;">
								<span class="ribbon-inner bg-warning"></span>Wali kelas
							</div>
							<div class="flex-grow-1 bg-danger p-8 card-rounded flex-grow-1 bgi-no-repeat" 
							style="background-position: calc(100% + 0.5rem) bottom; background-size: auto 70%; background-image: url(/media/svg/banner/svg-coffe.svg)">
								<h4 class="text-inverse-primary mt-5 font-weight-bolder">
									{{ authenticated.classroom.name }} - {{ authenticated.classroom.group}} ({{ authenticated.classroom.grade}})
								</h4>
								<b-button variant="white" size="sm" @click="getStudents(authenticated.classroom.id)" :disabled="isLoading">Angggota kelas</b-button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-4" v-for="(grade, index) in groupedClass" :key="index"> 
					<table class="table table-borderless table-sm">
						<tr v-for="classroom in grade" :key="classroom.id">
							<td>
								<div class="card">
									<div class="card-header p-0 d-flex justify-content-between">
										<div class="d-flex align-items-center">
											<b-button squared class="mr-1" variant="light-success" size="sm" @click="getSchedules(classroom.id)" v-b-tooltip.hover title="Daftar jadwal" :disabled="isLoading">
												<i class="flaticon-list-2"></i> Jadwal
											</b-button>
											<b-button squared class="mr-1" variant="light-primary" size="sm" @click="addSchedule(classroom.id)" v-b-tooltip.hover title="Tambah jadwal" :disabled="isLoading">
												<i class="flaticon-file-1"></i> + Jadwal
											</b-button>
											<b-button squared class="mr-1" variant="light-warning" size="sm" @click="modalAbsent(classroom.id)" v-b-tooltip.hover title="Laporan absensi" :disabled="isLoading">
												<i class="flaticon-interface-10"></i> Laporan
											</b-button>
											<b-button squared variant="light-danger" size="sm" @click="deleteClassroomSubject(classroom.id)" v-b-tooltip.hover title="Hapus kelas" :disabled="isLoading">
												<i class="flaticon2-trash"></i> Hapus
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
					<div class="">
						<p class="text-muted 5 font-size-lg font-weight-normal pt-5 mb-2">Tidak ada kelas, silakan tambah kelas anda mengajar terlebih dahulu</p>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="Tambah kelas">
			<form class="form">
				<div class="form-group">
					<label>Kelas</label>
					<v-select label="name" :reduce="item => item.id" :options="classrooms.data" v-model="data.classroom_id" :filterable="false" @search="onSearchClassroom">
						<template slot="no-options">
					   	Cari kelas..
					  </template>
					</v-select>
				</div>
				<div class="form-group">
					<label>Matpel</label>
					<v-select label="name" :reduce="item => item.id" :options="subjects.data" v-model="data.subject_id" :filterable="false" @search="onSearchSubject">
						<template slot="no-options">
					   	Cari mata pelajaran..
					  </template>
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
			<template v-slot:modal-header="{  }">
		    	<b-button variant="primary" @click="addSchedule(id_show)"><i class="flaticon2-add-square"></i> Tambah jadwal</b-button>
		    </template>
			<div class="">
				<div class="row">
					<div class="col-md-4" v-for="(days,index) in filteredSchedules" :key="index">
						<div class="card">
							<div class="card-body p-4">
								<div class="d-flex align-items-center mb-2" v-for="schedule in days" :key="schedule.id">
									<div class="d-flex flex-column flex-grow-1">
										<span class="text-dark-75 font-weight-bold font-size-lg mb-1">{{ schedule.day | dayIndex }}</span>
										<span class="text-muted font-weight-bold"><span class="badge badge-success">{{ schedule.from_time }}</span> - <span class="badge badge-secondary">{{ schedule.end_time }}</span></span>
									</div>
									<b-dropdown  variant="link" toggle-class="text-decoration-none" no-caret  class="bg-hover-light-primary rounded-pill btn-icon">
										<template v-slot:button-content>
											   <span class="flaticon-squares-4"></span>
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
			<template v-slot:modal-footer="{ cancel }">
				<b-button  variant="secondary" @click="cancel()">
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
			<template v-slot:modal-footer="{cancel }">
			    <b-button size="sm" variant="secondary" @click="cancel()">
			        Cancel
			    </b-button>
				<b-button size="sm" variant="success" @click="submitSchedule" :disabled="isLoading">
			        {{ isLoading ? 'Processing...' : 'Simpan' }}
			    </b-button>
			</template>
		</b-modal>
		<b-modal id="modal-report-abcent" title="Laporan absensi" size="xl" hide-footer>
			<template v-slot:modal-header>
				<div class="input-icon">
					<select class="form-control" v-model="schedule_show_id">
						<option :value="schedule.id" v-for="schedule in schedules" :key="schedule.id">
							{{ schedule.day | dayIndex }} ({{ schedule.from_time.substring(0, 5) }} - {{ schedule.end_time.substring(0,5) }})
						</option>
					</select>
					<span>
						<i class="flaticon2-search-1 text-muted"></i>
					</span>
				</div>
				<div v-if="schedule_show_id != ''">
					<b-dropdown  variant="link" toggle-class="text-decoration-none" no-caret>
						<template v-slot:button-content>
							<b-button variant="light-primary" class="font-weight-bolder font-size-sm">
								<i class="flaticon-file-2"></i>
								Export/Cetak
							</b-button>
						</template>
						<b-dropdown-item @click="print">Cetak/Pdf</b-dropdown-item>
						<b-dropdown-item @click="download">Download excel</b-dropdown-item>
					</b-dropdown>
					<b-button v-b-modal.modal-1 variant="primary" v-b-tooltip.hover title="Fitler tanggal absensi">Filter tanggal
					</b-button>
				</div>
			</template>
			<div class="">
				
				<div class="table-responsive-md"  id="printMe">
					<table class="table table-bordered">
						<thead>
							<tr>
								<td width="50px">No</td>
								<td>Nama</td>
								<td>Kehadiran</td>
								<td>Status</td>
								<td>Keterangan</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(abcent,index) in abcents" :key="index">
								<td>{{ index+1 }}</td>
								<td>{{ abcent.user.name }}</td>
								<td>{{ abcent.isabcent == 1 ? 'Hadir' : 'Tidak hadir' }}</td>
								<td>{{ abcent.reason | textReason }}</td>
								<td>{{ abcent.desc }}</td>
							</tr>
							<tr v-if="abcents.length == 0">
								<td colspan="5">
									Tidak ada data ditanggal ini
								</td>
							</tr>
						</tbody>
					</table>
					<div class="d-flex align-items-center py-3">
						<div class="d-flex align-items-center" v-if="isLoading">
							<div class="mr-2 text-muted">Loading...</div>
							<div class="spinner spinner-primary mr-10"></div>
						</div>
					</div>
				</div>
			</div>
			<span class="badge badge-primary">Total {{ abcents.length }} data </span>
		</b-modal>
		<b-modal id="modal-1" title="Filter tanggal" hide-footer>
			<div class="form-group">
				<label>Tanggal</label>
			<div class="input-group mb-3">
				<input type="date" class="form-control" v-model="date_report"  name="">
  <div class="input-group-append">
    <button class="btn btn-primary" type="button" @click="filterDate"  :disabled="isLoading">
				{{ isLoading ? 'Processing...' : 'Filter' }}
		</button>
  </div>
</div>
			</div>
		</b-modal>
		<b-modal id="modal-student" title="Siswa kelas" hide-footer size="lg">
			<div class="input-group mb-3">
				<div class="input-group-prepend">
			    <span class="input-group-text"><i class="flaticon-avatar"></i></span>
			  </div>
			  <input type="text" class="form-control" placeholder="Masukkan NIS" v-model="uid">
			  <div class="input-group-append">
			    <button class="btn btn-primary" type="button" @click="addToClassroom(authenticated.classroom.id)" :disabled="isLoading"><i class="flaticon-app"></i>Tambah</button>
			  </div>
			</div>
			<div class="table-responsive">
				<VuePerfectScrollbar
					class="aside-menu scroll liveclass_comment"
					style="max-height: 50vh; position: relative;"
				>
				<table class="table table-bordered table-stripped">
					<tr  v-for="(student, index) in students" :key="student.id">
						<td>{{ index+1 }}</td>
						<td>{{ student.student.uid }}</td>
						<td>
							{{ student.student.name }} <br>
							{{ student.student.email }}
						</td>
						<td width="110px">
							<b-button size="sm" variant="secondary" @click="deleteFromClassroom(student.student.id, authenticated.classroom.id)" :disabled="isLoading">
								<i class="flaticon2-trash"></i> Hapus
							</b-button>
						</td>
					</tr>
					<tr v-if="students.length === 0">
						<td colspan="4">Tidak ada siswa dikelas ini</td>
					</tr>
				</table>
				</VuePerfectScrollbar>
			</div>
			<span class="badge badge-primary">Total {{ students.length }} data</span>
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
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import _ from 'lodash'

export default {
	name: 'SubjectMe',
	components: {
		BButton, BDropdownItem, BDropdown,
		VueCtkDateTimePicker, VSelect, VuePerfectScrollbar
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
			reasons: [
				"-",
				"Tanpa keterangan",
				"Sakit",
				"Izin",
				"Masalah"
			],
			id_show: null,
			schedule_show_id: '',
			date_report: null,
			uid: ''
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('classroom',['myclassrooms', 'classrooms', 'schedule', 'schedules', 'students']),
		...mapState('subject', ['subjects']),
		...mapState('user', ['authenticated']),
		...mapState('abcent', ['abcents']),
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
		},
		textReason(i) {
			let reasons = [
				"-",
				"Tanpa keterangan",
				"Sakit",
				"Izin",
				"Masalah"
			];
			return reasons[parseInt(i)];
		}
	},
	methods: {
		...mapActions('classroom', ['getDataClassromMine','getDataClassrooms', 'createNewClassroomSubject', 'deleteDataClassroomSubject', 'updateDataSchedule', 'createDataSchedule', 'getDataSchedules', 'getDataSchedule', 'deleteDataSchedule', 'getDataStudents', 'addUserToClassroom', 'deleteUserFromClassroom']),
		...mapActions('subject', ['getDataSubjects']),
		...mapActions('abcent', ['getAbcentToday', 'downloadExcel']),
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
		},
		async modalAbsent(id) {
			try {
				await this.getDataSchedules(id)
				this.id_show = id
				this.$bvModal.show('modal-report-abcent')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		print () {
      		this.$htmlToPaper('printMe');
    	},
    	async filterDate() {
    		try {
				if(this.classroom_id != '') {
					this.getAbcentToday({ 
						schedule_id: this.schedule_show_id,
						date: this.date_report
					})
					this.$bvModal.hide('modal-1')
				}
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
    	},
    	async download() {
			try {
				await this.downloadExcel({
					schedule_id: this.schedule_show_id,
					date: this.date_report
				})
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async getStudents(id) {
			try {
				await this.getDataStudents(id)
				this.$bvModal.show('modal-student')
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async addToClassroom(id) {
			try {
				await this.addUserToClassroom({
					classroom_id: id,
					data: {
						uid: this.uid
					}
				})
				this.getDataStudents(id)
				this.$bvToast.toast('Siswa berhasil ditambahkan ke kelas', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async deleteFromClassroom(id, classroom_id) {
			this.$swal({
                title: 'Informasi',
                text: "Siswa akan dihapus dari kelas ini",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
            	if (result.value) {
					try {
						await this.deleteUserFromClassroom(id)

						this.getDataStudents(classroom_id)
						this.$bvToast.toast('Siswa berhasil dihapus dari kelas', successToas())
					} catch (error) {
						this.$bvToast.toast(error.message, errorToas())
					}
            	}
            })
		},
		onSearchSubject(search, loading) {
	      loading(true);
	      this.searchSubject(loading, search, this);
	    },
	    searchSubject: _.debounce((loading, search, vm) => {
	    	vm.getDataSubjects({ perPage: 50, search: escape(search) })
	    	.then((res) => {
	    		loading(false)
	    	})
	    }, 350),
	    onSearchClassroom(search, loading) {
	      loading(true);
	      this.searchClassroom(loading, search, this);
	    },
	    searchClassroom: _.debounce((loading, search, vm) => {
	    	vm.getDataClassrooms({ perPage: 50, search: escape(search) })
	    	.then((res) => {
	    		loading(false)
	    	})
	    }, 350),
	},
	created() {
		this.changeData()
	},
	watch: {
		schedule_show_id(val) {
			this.getAbcentToday({
				schedule_id: val,
				date: this.date_report
			})
		}
	}
}
</script>
<style>
@media print {
    @page {
        size: landscape;
    }
}
</style>