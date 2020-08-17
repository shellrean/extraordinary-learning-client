<template>
	<div v-if="typeof classroom_lectures.data != 'undefined'">	
		<div class="card card-custom gutter-b" v-for="lecture in classroom_lectures.data">
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
		<div class="card card-custom gutter-b mt-5" v-if="classroom_lectures.data.length == 0 ">
			<div class="card-body">
				<div class="text-center">
					<img src="/media/svg/banner/svg-notfound.svg" style="max-width: 130px">
				</div>
			</div>
		</div>
		<b-pagination
			v-if="classroom_lectures.data.length > 0"
			pills 
			v-model="page"
			:total-rows="classroom_lectures.total"
			:per-page="classroom_lectures.per_page"
			:disabled="isLoading"
			>
		</b-pagination>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BDropdownItem, BDropdown, BPagination } from 'bootstrap-vue'

export default {
	name: 'TimelineLecture',
	data() {
		return {
			key: null
		}
	},
	components: {
		BDropdownItem, BDropdown, BPagination
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState('user',['authenticated']),
		...mapState('lecture',['classroom_lectures']),
		page: {
			get() {
				return this.$store.state.lecture.classroom_lecture_page
			},
			set(val) {
				this.$store.commit('lecture/SET_CLASSROOM_LECTURE_PAGE', val)
			}
		}
	},
	methods: {
		...mapActions('lecture',['getDataLectureClassroom']),
	},
	created() {
		if(this.authenticated.role == '2') {
			this.key = this.authenticated.classroom.id
		} else {
			this.key = this.$route.params.id
		}

		this.getDataLectureClassroom(this.key)
		.then((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	},
	watch: {
		page() {
			this.getDataLectureClassroom(this.key)
			.catch((error) => {
				this.$bvToast.toast(error.message, errorToas())
			})
		}
	}
}
</script>