<template>
	<div>
		<ShareToClass v-if="authenticated.role == '1'"/>
		<TimelineClassLive />
		<TimelineLecture />
		<TimelineTask />
		
		<div class="card card-custom gutter-b" v-if="classroom_lectures.length == 0 && classroom_tasks.length == 0 ">
			<div class="card-body">
				<div class="text-center">
					<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ShareToClass from '@/components/classroom/ShareToClass'
import TimelineClassLive from './TimelineClassLive'
import TimelineLecture from './TimelineLecture'
import TimelineTask from './TimelineTask'

export default {
	name:'ClassroomTimeline',
	components: {
		ShareToClass,
		TimelineClassLive,
		TimelineLecture,
		TimelineTask
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('task',['classroom_tasks']),
		...mapState('lecture',['classroom_lectures']),
	}
}
</script>