<template>
	<div>
		<div :class="bg ? 'container-fluid' : ''" v-if="typeof classlive.settings != 'undefined' && classlive.settings.type == 'jitsi'">	
			<div class="card " :class="bg ? 'bg-dark' : ''" v-if="typeof classlive.settings != 'undefined'">
				<div class="text-center" :class="bg ? 'card-body' : ''">
					<vue-jitsi-meet
						ref="jitsiRef"
					   	domain="meet.jit.si"
						:options="jitsiOptions"
					></vue-jitsi-meet>
				</div>
			</div>
		</div>
		<div class="d-flex flex-column-fluid">
			<div class="container">
				<div class="row">
					<div class="col-md-6">	
						<div class="card card-custom">
							<div class="card-header flex-wrap border-0 pt-6 pb-0">
									<h3 class="card-title align-items-start flex-column">
									<span class="card-label font-weight-bolder text-dark">Kelas langsung <span class="text-success">Online</span></span>
									<span class="text-muted mt-1 font-weight-bold font-size-sm">{{ classlive.created_at }}</span>
								</h3>
								<div class="card-toolbar" v-if="authenticated.role == '0' || authenticated.role == '1'">
									<div class="form-group">
										<button class="btn btn-light-primary mr-2" v-b-modal.modal-abcent v-b-tooltip.hover title="Lihat absensi hari ini">
											<i class="flaticon2-indent-dots"></i> Lihat absen
										</button>
										<button class="btn btn-light-danger" @click="closeClass" v-b-tooltip.hover title="Tutup kelas pada hari ini">
											<i class="flaticon2-rocket-1"></i> Tutup Kelas
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
						<div class="card-body" v-if="typeof classlive.settings != 'undefined' && classlive.settings.type == 'youtube'">
							<youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube>
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
                	{{ row.item.reason | textReason }}
                </template>
            </b-table>
			</VuePerfectScrollbar>
		</b-modal>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import StudentAttend from '@/components/classroom/StudentAttend'
import StudentComment from '@/components/classroom/StudentComment'
import { successToas, errorToas } from '@/core/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { JitsiMeet } from '@mycure/vue-jitsi-meet';

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
			],
			width: '',
			height: '',
			bg: true,
			reasons: [
				"-",
				"Tanpa keterangan",
				"Sakit",
				"Izin",
				"Masalah"
			]
		}
	},
	components: {
		StudentAttend,
		StudentComment,
		VuePerfectScrollbar,
		VueJitsiMeet: JitsiMeet
	},
	filters: {
		textReason(i) {
			let reasons = [
				"-",
				"Tanpa keterangan",
				"Sakit",
				"Izin",
				"Masalah"
			]
			return reasons[parseInt(i)];
		}
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

    	},
    	jitsiOptions () {
    		return {
      			width: this.width,
    			height: window.innerHeight-300,
        		roomName: this.classlive.settings.id_meet,
        		noSSL: false,
        		userInfo: {
          		email: this.authenticated.email,
          		displayName: this.authenticated.name,
        	},
        	configOverwrite: {
          		enableNoisyMicDetection: false,
       	 		prejoinPageEnabled: false,
       	 		fileRecordingsEnabled: false,
				liveStreamingEnabled: false,
        	},
        	interfaceConfigOverwrite: {
          		SHOW_JITSI_WATERMARK: false,
          		SHOW_WATERMARK_FOR_GUESTS: false,
          		SHOW_CHROME_EXTENSION_BANNER: false
        	},
        	onload: this.onIFrameLoad
      	};
    },
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
    	},
    	onIFrameLoad () {
      		// do stuff
    	},
	},
	async created() {
		try {
			this.channel = 'classlive_'+this.$route.params.id
			if(window.innerWidth >= 1200) {
				this.width = 1130
			} else if(window.innerWidth >= 992) {
				this.width = 900
			} else if(window.innerWidth >= 768) {
				this.width = 690
			} else {
				this.width = window.innerWidth-20
				this.bg = false
			}
			await this.getDataliveClassroom(this.$route.params.id)
			if(this.classlive.settings.type == 'youtube') {
				this.videoId = this.$youtube.getIdFromUrl(this.classlive.settings.link)
			}
		} catch (error) {
			if(error.code === 403) {
				this.$router.push({ name: 'dashboard' })
			}
			this.$bvToast.toast(error.message, errorToas())
		}
	},
	mounted() {
		this.socket.open();
		this.socket.emit('getin', {
			user: this.authenticated,
			channel: this.channel
		});
	},
	watch: {
		async classlive() {
			try {
				if(this.authenticated.role == '1') {
					await this.getDataStudents(this.classlive.classroom_id)
				}
				await this.getAbcentToday({
					schedule_id: this.classlive.schedule_id
				})

				let index = this.abcents.map(function(item) { 
					return item.id; 
				}).indexOf(this.authenticated.id);

				if(index == '' || index == -1) {
					await this.storeAbcentToday({
						isabcent: true,
						schedule_id: this.classlive.schedule_id,
						reason: '0'
					})
				}
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	}
}
</script>