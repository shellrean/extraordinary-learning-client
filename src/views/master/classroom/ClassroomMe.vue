<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Kelas</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Kelas saya mengajar</span>
					</h3>
				</div>
				<div class="card-body">
					<div class="table-responsive-md" >
						<b-table 
                        show-empty
                        :fields="fields"
                        :items="myclassrooms"
                        >
                        	<template v-slot:cell(no)="row">
                        		<span style="width: 40px;"><span class="font-weight-bolder" v-text="row.index+1"></span></span>
                        	</template>
                        	<template v-slot:cell(name)="row">
                        		<span style="width: 250px;">
                        			<div class="d-flex align-items-center">
                        				<div class="symbol symbol-40 symbol-light-info symbol-sm flex-shrink-0">			
                        					<span class="symbol-label font-size-h4 font-weight-bold"><i class="flaticon-earth-globe "></i></span>
                        				</div>								
                        				<div class="ml-4">									
                        					<div class="text-dark-75 font-weight-bolder font-size-lg mb-0" v-text="row.item.classroom.name"></div>									
                        					<a href="#" class="text-muted font-weight-bold text-hover-primary" v-text="row.item.subject.name"></a>								
                        				</div>							
                        			</div>
                        		</span>
                        	</template>
                        	<template v-slot:cell(actions)="row">
                        		<b-button :to="{ name: 'master.classroom.dashboard', params: { id: row.item.classroom_id }}" size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-buildings"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-clock-1"></i></b-button>
                        		<b-button size="sm" class="btn-text-primary btn-hover-primary btn-icon mr-2"><i class="flaticon-list"></i></b-button>
                        	</template>
                    	</b-table>
                    	<div class="d-flex justify-content-between align-items-center flex-wrap mt-5">
					      <div class="d-flex align-items-center py-3">
								<div class="d-flex align-items-center" v-if="isLoading">
									<div class="mr-2 text-muted">Loading...</div>
									<div class="spinner spinner-primary mr-10"></div>
								</div>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { successToas, errorToas } from '@/core/entities/notif'
import { BButton, BTable, BPagination } from 'bootstrap-vue'
import _ from 'lodash'

export default {
	name: 'MyClassrooms',
	components: {
		BButton, BTable, BPagination
	},
	data() {
		return {
			perPage: 10,
			search: '',
			fields: [
				{ key: 'no', label: '#' },
				{ key: 'name', label: 'Kelas' },
				{ key: 'actions', label: 'Aksi' }
			]
		}
	},
	computed: {
		...mapGetters(['isLoading']),
		...mapState(['errors']),
		...mapState('classroom',['myclassrooms'])
	},
	methods: {
		...mapActions('classroom', ['getDataClassromMine']),
		async changeData() {
			try {
				await this.getDataClassromMine()
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		this.changeData()
	}
}
</script>