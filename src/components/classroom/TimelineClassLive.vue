<template>
	<div>
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
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'TimelineClassLive',
	computed: {
		...mapState('classroom', ['classlives'])
	},
	methods: {
		...mapActions('classroom', ['getDatalivesClassroom']),
	},
	created() {
		this.getDatalivesClassroom(this.$route.params.id)
		.then((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>