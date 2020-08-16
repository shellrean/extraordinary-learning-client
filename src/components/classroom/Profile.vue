<template>
	<div class="card card-custom gutter-b">
		<div class="card-body">
			<div class="d-flex justify-content-between flex-column h-100">
				<div class="h-100">
					<div class="d-flex flex-column flex-center">
						<div class="bgi-no-repeat bgi-size-cover rounded min-h-180px w-100" style="background-image: url(/media/svg/banner/svg-science.svg)"></div>
						<a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">{{ classroom.name }}</a>
						<div class="font-weight-bold text-dark-50 font-size-sm pb-7">Tingkat {{ classroom.grade }}, {{ classroom.group }}</div>
					</div>
					<div class="d-flex align-items-center">
                    	<div class="symbol symbol-40 symbol-light symbol-sm flex-shrink-0">					
                    		<span class="symbol-label font-size-h4 font-weight-bold">
                    			<i class="flaticon-medal"></i>
                    		</span>
                    	</div>								
                    	<div class="ml-4">									
                    		<div class="text-dark-75 font-weight-bolder font-size-lg mb-0">
                    			Bahasa Indoneisa
                    		</div>									
                    	</div>							
                    </div>
					<div class="pt-1">
						<div class="d-flex flex-center" v-if="authenticated.role == '1'">
							<router-link :to="{ name: 'master.classroom.live.add', params: { id: $route.params.id }}" class="btn btn-primary font-weight-bolder font-size-sm py-3 px-14">
								Mulai Kelas
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'

export default {
	name: 'ClassroomProfile',
	computed: {
		...mapState('user', ['authenticated']),
		...mapState('classroom', ['classroom']),
	},
	methods: {
		...mapActions('classroom', ['getDataClassroom'])
	},
	created() {
		this.getDataClassroom(this.$route.params.id)
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>