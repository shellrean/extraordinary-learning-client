<template>
	<div>	
		<div class="card card-custom gutter-b" v-for="lecture in classroom_lectures">
			<div class="card-body">
				<div class="d-flex align-items-center">
					<div class="symbol symbol-45 symbol-light mr-5">
						<span class="symbol-label">
							<span class="svg-icon svg-icon-lg svg-icon-primary">
								<i class="flaticon-notes text-primary"></i>
							</span>
						</span>
					</div>
					<div class="d-flex flex-column flex-grow-1">
						<router-link :to="{ name: 'lecture.view', params: { id: lecture.lecture.id }}" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">{{ lecture.lecture.title }}</router-link>
						<div class="d-flex">
							<div class="d-flex align-items-center pr-5">
								<span class="svg-icon svg-icon-md svg-icon-primary pr-1">
									<i class="flaticon-calendar-1 text-primary"></i>
								</span>
								<span class="text-muted font-weight-bold">{{ lecture.created_at }}</span>
							</div>
						</div>
					</div>
					<b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
						<template v-slot:button-content>
							<i class="flaticon-more-v2"></i>
						</template>
						<b-dropdown-item @click="">Hapus</b-dropdown-item>
					</b-dropdown>
				</div>
				<div class="pt-3">
					<p class="text-dark-75 font-size-lg font-weight-normal pt-5 mb-2">{{ lecture.body}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BDropdownItem, BDropdown } from 'bootstrap-vue'

export default {
	name: 'TimelineLecture',
	components: {
		BDropdownItem, BDropdown
	},
	computed: {
		...mapState('lecture',['classroom_lectures']),
	},
	methods: {
		...mapActions('lecture',['getDataLectureClassroom']),
	},
	created() {
		this.getDataLectureClassroom(this.$route.params.id)
		.then((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>