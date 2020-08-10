<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-body" v-html="lecture.body">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
	name: 'LectureView',
	computed: {
		...mapGetters(['isLoading']),
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