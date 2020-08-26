<template>
	<div class="card card-custom gutter-b">
		<div class="card-body">
			<div class="d-flex justify-content-between flex-column h-100" v-if="typeof school.settings != 'undefined'">
				<div class="h-100">
					<div class="d-flex flex-column flex-center">
						<span class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pb-1">{{ school.settings.name }}</span>
						<div class="font-weight-bold text-dark-50 font-size-sm pb-7">{{ school.settings.email }}</div>
					</div>
					<div class="pt-1 text-center">
						{{ school.settings.address }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapActions, mapState } from 'vuex'

export default {
	name: 'SchoolProfile',
	computed: {
		...mapState('setting', ['school'])
	},
	methods: {
		...mapActions('setting', ['getDataSettingSchool'])
	},
	created() {
		this.getDataSettingSchool()
	}
}	
</script>