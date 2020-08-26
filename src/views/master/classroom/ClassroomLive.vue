<template>
	<div>
		<div class="d-flex flex-column-fluid">
			<div class="container">
				<div class="row">
					<div class="col-md-6">	
						<div class="card card-custom">
							<div class="card-header flex-wrap border-0 pt-6 pb-0">
									<h3 class="card-title align-items-start flex-column">
									<span class="card-label font-weight-bolder text-dark">Live Classroom  <span class="text-success">Online</span></span>
									<span class="text-muted mt-1 font-weight-bold font-size-sm">{{ classlive.created_at }}</span>
								</h3>
								<div class="card-toolbar" v-if="authenticated.role == '0' || authenticated.role == '1'">
									<div class="form-group">
										<button class="btn btn-light-primary mr-2" v-b-modal.modal-abcent>
											Lihat absen
										</button>
										<button class="btn btn-danger" @click="closeClass">
											Tutup Kelas
										</button>
									</div>
								</div>
							</div>
							<div class="card-body" v-html="classlive.body">
								
							</div>

						</div>
						<div class="card card-custom">
							<div class="card-body">
								<StudentComment />
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="card-body" v-if="typeof classlive.settings != 'undefined'">
							<youtube v-if="classlive.settings.type == 'youtube'" :video-id="videoId" ref="youtube" @playing="playing"></youtube>
							<iframe id="mainIframe" v-if="classlive.settings.type == 'zoom' && typeof authenticated.name != 'undefined'" :src="`https://zoom.us/wc/${classlive.settings.id_meet}/join?prefer=1&pwd=${classlive.settings.password}&&un=${authenticated.name}`" allow="microphone;camera"  sandbox="allow-forms allow-scripts allow-same-origin"  style="height: 100vh;width: 100%;"  frameborder="0"></iframe>
   									
								<!-- <LiveFrame /> -->
							
						</div>
						<StudentAttend/>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-abcent" title="Absen hari ini" size="xl" hide-footer>
			<VuePerfectScrollbar
				style="max-height: 70vh; position: relative;"
			>
			<b-table 
                show-empty
                :fields="fields"
                :items="filteredAbcent"
            >
            	<template v-slot:cell(no)="row">
                    <span style="width: 40px;">
                    	<span class="font-weight-bolder" v-text="row.index+1"></span>
                    </span>
                </template>
                <template v-slot:cell(isattend)="row">
                    <span class="badge badge-info">{{ row.item.isabcent ? 'Hadir' : 'Tidak hadir' }}</span>
                </template>
                <template v-slot:cell(type)="row">
                	{{ row.item.details != null && typeof row.item.details.type != 'undefined' ? row.item.details.type : '-' }}
                </template>
            </b-table>
			</VuePerfectScrollbar>
		</b-modal>
	</div>
</template>
<script>
// import LiveFrame from '@/components/classroom/LiveFrame'
import { mapGetters, mapState, mapActions } from 'vuex'
import StudentAttend from '@/components/classroom/StudentAttend'
import StudentComment from '@/components/classroom/StudentComment'
import { successToas, errorToas } from '@/core/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'ClassroomLive',
	data() {
		return {
			videoId: '',
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'user.name', label: 'Nama' },
				{ key: 'isattend', label: 'Status' },
				{ key: 'type', label: 'Keterangan'},
				{ key: 'desc', label: 'Detail' }
			]
		}
	},
	components: {
		StudentAttend,
		StudentComment,
		VuePerfectScrollbar,
		// LiveFrame
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('classroom',['classlive']),
		...mapState('abcent',['abcents']),
		...mapState('channel',['socket']),
		filteredAbcent() {
			return this.abcents.filter(item => item.user.role == '2')
		},
		player() {
      		// return this.$refs.youtube.player
    	}
	},
	methods: {
		...mapActions('classroom',['storeLiveClassroom', 'getDataliveClassroom', 'getDataStudents', 'stopLiveClassroom']),
		...mapActions('abcent',['getAbcentToday','storeAbcentToday']),
		playVideo() {
      		this.player.playVideo()
    	},
    	playing() {

    	},
    	closeClass() {
    		this.$swal({
                title: 'Informasi',
                text: "Kelas akan ditutup, pastikan seluruh siswa sudah terabsen",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#c3c3c3',
                confirmButtonText: 'Lanjutkan!'
            }).then(async (result) => {
                if (result.value) {
                   try {
                   		await this.stopLiveClassroom(this.$route.params.id)

                   		this.socket.emit('close_classroom')
                   		this.$router.push({ name: 'master.classroom.dashboard', params: { id: this.classlive.classroom_id }})
                   } catch (error) {
                   		this.$bvToast.toast(error.message, errorToas())
                   }
                }
            })
    	}
	},
	async created() {
		try {
			await this.getDataliveClassroom(this.$route.params.id)
			if(this.classlive.settings.type == 'youtube') {
				this.videoId = this.$youtube.getIdFromUrl(this.classlive.settings.link)
			}
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	watch: {
		async classlive() {
			try {
				if(this.authenticated.role == '1') {
					await this.getDataStudents(this.classlive.classroom_id)
				}
				await this.getAbcentToday({
					subject_id: this.classlive.subject_id,
					classroom_id: this.classlive.classroom_id
				})

				let index = this.abcents.map(function(item) { 
					return item.id; 
				}).indexOf(this.authenticated.id);

				if(index == '' || index == -1) {
					await this.storeAbcentToday({
						isabcent: true,
						subject_id: this.classlive.subject_id,
						classroom_id: this.classlive.classroom_id,
					})
				}
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>
<style>
.container-zoom {

}
</style>