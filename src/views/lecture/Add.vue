<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-body">
					<lecture-form />
					<div class="form-group">
						<button class="btn btn-primary" :disabled="isLoading" @click="submit">{{ isLoading ? 'Processing...' : 'Submit' }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import LectureForm from './Form'

export default {
	name: 'AddLecture',
	components: {
		LectureForm
	},
	computed: {
		...mapGetters(['isLoading']),
	},
	methods: {
		...mapActions('lecture',['createNewLecture']),
		async submit() {
			try {
				await this.createNewLecture()
				this.$router.push({ name: 'lecture.index' })
			} catch (error) {
				
			}
		}
	}
}
</script>