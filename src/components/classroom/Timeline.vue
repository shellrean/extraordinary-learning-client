<template>
	<div>
		<ShareToClass />
		<div class="card card-custom gutter-b" v-for="liveclass in classlives">
			<div class="card-body">
				<div class="d-flex align-items-center">
					<div class="symbol symbol-45 symbol-light mr-5">
						<span class="symbol-label">
							<span class="svg-icon svg-icon-lg svg-icon-primary">
								<inline-svg class="svg-icon" src="/media/svg/icons/Code/Compiling.svg" />
							</span>
						</span>
					</div>
					<div class="d-flex flex-column flex-grow-1">
						<router-link :to="{}" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">{{ liveclass.teacher.name }}</router-link>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Home/Clock.svg" />
								</span>
								<span class="text-muted font-weight-bold">
									Live
								</span>
							</div>
							<div class="d-flex align-items-center">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Layout/Layout-arrange.svg" />
								</span>
								<span class="text-muted font-weight-bold">{{ liveclass.subject.name }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-3">
					<router-link :to="{ name: 'master.classroom.live', params: { id: liveclass.id }}" class="btn btn-success btn-lg btn-block">Masuk</router-link>
				</div>
			</div>
		</div>

		<div class="card card-custom gutter-b" v-for="lecture in classroom_lectures">
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
						<router-link :to="{ name: 'lecture.view', params: { id: lecture.lecture.id }}" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">{{ lecture.lecture.title }}</router-link>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Home/Clock.svg" />
								</span>
								<span class="text-muted font-weight-bold">{{ lecture.created_at }}</span>
							</div>
							<div class="d-flex align-items-center">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Layout/Layout-arrange.svg" />
								</span>
								<span class="text-muted font-weight-bold">{{ lecture.lecture.subject_id }}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-3">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">{{ lecture.body}}</p>
				</div>
			</div>
		</div>

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
		<div class="card card-custom gutter-b" v-if="classroom_lectures.length == 0 && classroom_tasks.length == 0 ">
			<div class="card-body">
				<div class="text-center">
					<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">Tidak ada  dibagikan di kelas ini</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ShareToClass from '@/components/classroom/ShareToClass'

export default {
	name:'ClassroomTimeline',
	components: {
		ShareToClass
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('lecture',['classroom_lectures']),
		...mapState('task',['classroom_tasks']),
		...mapState('classroom', ['classlives'])
	},
	methods: {
		...mapActions('lecture',['getDataLectureClassroom']),
		...mapActions('classroom', ['getDatalivesClassroom']),
		...mapActions('task',['getDataClassroomTasks'])
	},
	async created() {
		try {
			this.getDatalivesClassroom(this.$route.params.id)
			await this.getDataLectureClassroom(this.$route.params.id)
			await this.getDataClassroomTasks(this.$route.params.id)
		} catch (error) {

		}
	}
}
</script>