<template>
	<div>
		<ShareToClass v-if="authenticated.role == '1'"/>
		<TimelineClassLive />
		<b-tabs align="">
	    	<b-tab title="Materi" active>
				<TimelineLecture class="mt-5"/>
	      	</b-tab>
	      	<b-tab title="Tugas">
	    		<TimelineTask class="mt-5"/>
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