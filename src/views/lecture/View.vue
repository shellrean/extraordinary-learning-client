<template>
	<div>
		<div class="d-flex flex-column-fluid">
			<div class="container">
				<div class="row">
					<div class="col-md-8">	
						<div class="card card-custom">
							<div class="card-header flex-wrap border-0 pt-6 pb-0">
								<h3 class="card-title align-items-start flex-column">
									<span class="card-label font-weight-bolder text-dark">{{ lecture.title }}</span>
									<span class="text-muted mt-1 font-weight-bold font-size-sm">{{ lecture.created_at }}</span>
								</h3>
							</div>
							<div class="card-body" v-html="lecture.body">
								
							</div>
						</div>
						<div class="card card-custom">
							<div class="card-body">
								<DianComment />
							</div>
						</div>
					</div>

					<div class="col-md-4" v-if="authenticated.role == '1' || authenticated.role == '0'">
						<DianOnlineStudent />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import DianComment from '@/components/lecture/Comment'
import DianOnlineStudent from '@/components/lecture/OnlineStudent'

export default {
	name: 'LectureView',
	components: {
		DianComment,
		DianOnlineStudent
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('lecture',['lecture']),
	},
	methods: {
		...mapActions('lecture',['getDataLecture'])
	},
	async created() {
		try {
			await this.getDataLecture(this.$route.params.id)
		} catch (error) {

		}
	}
}
</script>