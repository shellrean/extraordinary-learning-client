<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Report absensi</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Laporan absensi hari ini</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="light-primary" v-b-modal.modal-create class="font-weight-bolder font-size-sm mr-2">
								<span class="svg-icon svg-icon">
						          <inline-svg
						            class="svg-icon"
						            src="/media/svg/icons/Design/PenAndRuller.svg"
						          />
						        </span>
								Export
							</b-button>
						</div>
					</div>
				</div>
				<div class="card-body">
					<div class="mb-10">
						<div class="row align-items-center">
							<div class="col-lg-9 col-xl-8">
								<div class="row align-items-center">
									<div class="col-md-4 my-2 my-md-0">
										<div class="input-icon">
											<input type="text" class="form-control form-control-solid" placeholder="Search..." id="kt_datatable_search_query" v-model="search"/>
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
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
import { BButton } from 'bootstrap-vue'

export default {
	name: 'AbcentReport',
	components: {
		BButton
	},
	data() {
		return {
			search: ''
		}
	},
	computed: {

	},
	methods: {

	},
	created() {

	}
}
</script>