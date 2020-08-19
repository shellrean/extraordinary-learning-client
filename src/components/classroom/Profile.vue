<template>
	<div class="card card-custom gutter-b">
		<div class="card-body">
			<div class="d-flex justify-content-between flex-column h-100">
				<div class="h-100">
					<div class="d-flex flex-column flex-center">
						<div class="bgi-no-repeat bgi-size-cover rounded min-h-180px w-100" style="background-image: url(/media/svg/banner/svg-zoom.svg)"></div>
						<a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">{{ classroom.name }}</a>
						<div class="font-weight-bold text-dark-50 font-size-sm pb-7">{{ classroom.grade }}, {{ classroom.group }}</div>
					</div>
					<VuePerfectScrollbar
						class="aside-menu scroll liveclass_comment"
						style="max-height: 50vh; position: relative;"
					>
					<div class="d-flex align-items-center mt-2" v-for="subject in classroom_subjects">
                    	<div class="symbol symbol-40 symbol-light symbol-sm flex-shrink-0">					
                    		<span class="symbol-label font-size-h4 font-weight-bold">
                    			<i class="flaticon-medal"></i>
                    		</span>
                    	</div>								
                    	<div class="ml-4">									
                    		<div class="text-dark-75 font-weight-bolder font-size-lg mb-0">
                    			{{ subject.subject.name }}
                    		</div>									
                    	</div>							
                    </div>
                	</VuePerfectScrollbar>
					<div class="pt-1">
						<div class="d-flex flex-center" v-if="authenticated.role == '1'">
							<router-link :to="{ name: 'master.classroom.live.add', params: { id: $route.params.id }}" class="btn btn-primary font-weight-bolder font-size-sm py-3 px-14">
								Mulai Kelas
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
	name: 'ClassroomProfile',
	components: {
		VuePerfectScrollbar
	},
	data() {
		return {
			key: null
		}
	},
	computed: {
		...mapState('user', ['authenticated']),
		...mapState('classroom', ['classroom']),
		...mapState('subject', ['classroom_subjects'])
	},
	methods: {
		...mapActions('classroom', ['getDataClassroom']),
		...mapActions('subject',['getDataClassroomSubjects'])
	},
	created() {
		if(this.authenticated.role == '2') {
			if(typeof this.authenticated.classroom == 'undefined') {
				this.$router.push({ name: 'master.classroom.join' })
				return
			}
			this.key = this.authenticated.classroom.id
		} else {
			this.key = this.$route.params.id
		}

		this.getDataClassroom(this.key)
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
		this.getDataClassroomSubjects(this.key)
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>