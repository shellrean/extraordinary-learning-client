<template>
	<div>
		<ShareToClass v-if="authenticated.role == '1'"/>
		<TimelineClassLive />
		<b-tabs pills align="center">
	    	<b-tab title="Materi" active>
				<TimelineLecture class="mt-5"/>
				<div class="card card-custom gutter-b mt-5" v-if="classroom_lectures.length == 0 ">
					<div class="card-body">
						<div class="text-center">
							<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
						</div>
					</div>
				</div>
	      	</b-tab>
	      	<b-tab title="Tugas">
	    		<TimelineTask class="mt-5"/>
				<div class="card card-custom gutter-b mt-5" v-if="classroom_tasks.length == 0 ">
					<div class="card-body">
						<div class="text-center">
							<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
						</div>
					</div>
				</div>
	      	</b-tab>
	    </b-tabs>
		
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ShareToClass from '@/components/classroom/ShareToClass'
import TimelineClassLive from './TimelineClassLive'
import TimelineLecture from './TimelineLecture'
import TimelineTask from './TimelineTask'
import { BTabs, BTab } from 'bootstrap-vue'

export default {
	name:'ClassroomTimeline',
	components: {
		ShareToClass,
		TimelineClassLive,
		TimelineLecture,
		TimelineTask,
		BTabs, BTab
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('task',['classroom_tasks']),
		...mapState('lecture',['classroom_lectures']),
	}
}
</script>