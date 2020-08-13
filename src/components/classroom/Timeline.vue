<template>
	<div>
		<ShareToClass />
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
						<a href="#" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">WWII Quiz Pt 1</a>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Home/Clock.svg" />
								</span>
								<span class="text-muted font-weight-bold">Due 04 Sep</span>
							</div>
							<div class="d-flex align-items-center">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<inline-svg class="svg-icon" src="/media/svg/icons/Layout/Layout-arrange.svg" />
								</span>
								<span class="text-muted font-weight-bold">P1 U.S. History</span>
							</div>
						</div>
					</div>
				</div>
				<div class="pt-3">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">Outlines keep you honest. They stop you from indulging in poorly thought-out metaphors about driving and keep you focused on the overall structure of your post</p>
				</div>
			</div>
		</div>
		<div class="card card-custom gutter-b">
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
		...mapState('lecture',['classroom_lectures'])
	},
	methods: {
		...mapActions('lecture',['getDataLectureClassroom'])
	},
	async created() {
		try {
			await this.getDataLectureClassroom(this.$route.params.id)
		} catch (error) {

		}
	}
}
</script>