<template>
	<div>
		<div class="card card-custom gutter-b" v-for="task in classroom_tasks">
			<div class="card-body">
				<div class="d-flex align-items-center">
					<div class="symbol symbol-45 symbol-light mr-5">
						<span class="symbol-label">
							<span class="svg-icon svg-icon-lg svg-icon-primary">
								<inline-svg class="svg-icon" src="/media/svg/icons/General/Clipboard.svg" />
							</span>
						</span>
					</div>
					<div class="d-flex flex-column flex-grow-1">
						<router-link :to="{ name: 'task.view', params: { id: task.task.id }}" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">{{ task.task.title }}</router-link>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Home/Clock.svg" />
								</span>
								<span class="text-muted font-weight-bold">{{ task.created_at }}</span>
							</div>
							<div class="d-flex align-items-center">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Layout/Layout-arrange.svg" />
								</span>
								<span class="text-muted font-weight-bold"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-3">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">{{ task.body}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'TimelineTask',
	computed: {
		...mapState('task',['classroom_tasks']),
	},
	methods: {
		...mapActions('task',['getDataClassroomTasks'])
	},
	created() {
		this.getDataClassroomTasks(this.$route.params.id)
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>