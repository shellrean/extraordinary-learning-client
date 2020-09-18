<template>
	<div>
		<div class="d-flex flex-column-fluid">
			<div class="container">
				<div class="row">
					<div class="col-md-8">	
						<div class="card card-custom">
							<div class="card-header flex-wrap border-0 pt-6 pb-0">
									<h3 class="card-title align-items-start flex-column">
									<span class="card-label font-weight-bolder text-dark">{{ task.title }}</span>
									<span class="text-muted mt-1 font-weight-bold font-size-sm">{{ task.created_at }}</span>
								</h3>
							</div>
							<div class="card-body" v-html="task.body">
								
							</div>
						</div>
						<SendTask v-if="authenticated.role == '2'"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import SendTask from '@/components/task/SendTask'

export default {
	name: 'LectureView',
	components: {
		SendTask
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user', ['authenticated']),
		...mapState('task',['task']),
	},
	methods: {
		...mapActions('task',['getDataTask'])
	},
	async created() {
		try {
			await this.getDataTask(this.$route.params.id)
		} catch (error) {
			this.$bvToast.toast(error.message, errorToas())
		}
	}
}
</script>