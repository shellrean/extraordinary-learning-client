<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Report absensi</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Laporan absensi hari ini</span>
					</h3>
					<div class="card-toolbar" v-if="classroom_id != ''">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="light-primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm mr-2" @click="download">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/PenAndRuller.svg"
						          />
						        </span>
								Export
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
											<select class="form-control form-control-solid" v-model="classroom_id">
												<option :value="classroom.id" v-for="classroom in myclassrooms">{{ classroom.classroom.name }} - {{ classroom.subject.name }}</option>
											</select>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="table-responsive-md">
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
								<tr v-for="(abcent,index) in abcents">
									<td>{{ index+1 }}</td>
									<td>{{ abcent.user.name }}</td>
									<td>{{ abcent.isabcent == 1 ? 'Hadir' : 'Tidak hadir' }}</td>
									<td>{{ abcent.details != null && typeof abcent.details.type != 'undefined' ? abcent.details.type : '-' }}</td>
									<td>{{ abcent.desc }}</td>
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
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { BButton } from 'bootstrap-vue'
import { errorToas, successToas } from '@/core/entities/notif'

export default {
	name: 'AbcentReport',
	components: {
		BButton
	},
	data() {
		return {
			classroom_id: '',
			search: '',
			data: null
		}
	},
	computed: {
		...mapGetters(['isLoading','baseURL']),
		...mapState('classroom', ['myclassrooms']),
		...mapState('abcent', ['abcents'])
	},
	methods: {
		...mapActions('classroom', ['getDataClassromMine']),
		...mapActions('abcent', ['getAbcentToday', 'downloadExcel']),
		async download() {
			try {
				await this.downloadExcel({
					classroom_id: this.data.classroom_id,
					subject_id: this.data.subject_id
				})
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		this.getDataClassromMine()
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	watch: {
		classroom_id(val) {
			if(val != '') {
				let data = this.myclassrooms.map(item => item.id).indexOf(val)
				if(data != -1) {
					this.data = this.myclassrooms[data]
					this.getAbcentToday({ subject_id: this.data.subject_id, classroom_id: this.data.classroom_id})
				}
			}
		}
	}
}
</script>