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
									<span class="text-muted mt-1 font-weight-bold font-size-sm">{{ classlive.created_at }}></span>
								</h3>
								<div class="card-toolbar">
									<div class="form-group">
										<button class="btn btn-warning">
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
						<div class="card-body" ><!-- 
							<youtube :video-id="videoId" ref="youtube" @playing="playing"></youtube> -->
							<!-- <iframe id="mainIframe" src="https://zoom.us/wc/2682642912/join?prefer=1&pwd=E1ATYf&&un=zhangc" allow="microphone;camera"  sandbox="allow-forms allow-scripts allow-same-origin"  style="height: 100vh;width: 100%;"  frameborder="0"></iframe> -->
   									
								<!-- <LiveFrame /> -->
							
						</div>
						<StudentAttend />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
// import LiveFrame from '@/components/classroom/LiveFrame'
import { mapGetters, mapState, mapActions } from 'vuex'
import StudentAttend from '@/components/classroom/StudentAttend'
import StudentComment from '@/components/classroom/StudentComment'

export default {
	name: 'ClassroomLive',
	data() {
		return {
			videoId: ''
		}
	},
	components: {
		StudentAttend,
		StudentComment,
		// LiveFrame
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('classroom',['classlive']),
		...mapState('abcent',['abcents']),
		player() {
      		// return this.$refs.youtube.player
    	}
	},
	methods: {
		...mapActions('classroom',['storeLiveClassroom', 'getDataliveClassroom', 'getDataStudents']),
		...mapActions('abcent',['getAbcentToday','storeAbcentToday']),
		playVideo() {
      		this.player.playVideo()
    	},
    	playing() {
      		console.log('\o/ we are watching!!!')
    	}
	},
	async created() {
		try {
			await this.getDataStudents(this.$route.params.id)
			await this.getDataliveClassroom(this.$route.params.id)
	      	// this.videoId = this.$youtube.getIdFromUrl('https://youtu.be/n7DtD2hfolI')
		} catch (error) {

		}
	},
	watch: {
		async classlive() {
			try {
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

			}
		}
	}
}
</script>
<style>
.container-zoom {

}
</style>