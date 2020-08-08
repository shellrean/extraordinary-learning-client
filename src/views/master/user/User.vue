<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header flex-wrap border-0 pt-6 pb-0">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Teachers</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Manage over 2400 teachers</span>
					</h3>
					<div class="card-toolbar">
						<div class="dropdown dropdown-inline" data-toggle="tooltip" title="" data-placement="left" data-original-title="Quick actions">
							<b-button variant="success" v-b-modal.modal-create class="font-weight-bolder font-size-sm">New Teacher</b-button>
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
											<input type="text" class="form-control form-control-solid" placeholder="Search..." id="kt_datatable_search_query" />
											<span>
												<i class="flaticon2-search-1 text-muted"></i>
											</span>
										</div>
									</div>
									<div class="col-md-4 my-2 my-md-0">
										<select class="form-control form-control-solid" id="kt_datatable_search_status">
											<option value="">Status</option>
											<option value="1">Pending</option>
											<option value="2">Delivered</option>
											<option value="3">Canceled</option>
										</select>
									</div>
									<div class="col-md-4 my-2 my-md-0">
										<select class="form-control form-control-solid" id="kt_datatable_search_type">
											<option value="">Type</option>
											<option value="4">Success</option>
											<option value="5">Info</option>
											<option value="6">Danger</option>
										</select>
									</div>
								</div>
							</div>
							<div class="col-lg-3 col-xl-4 mt-5 mt-lg-0">
								<a href="#" class="btn btn-light-primary px-6 font-weight-bold">Search</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<b-modal id="modal-create" title="BootstrapVue">
			<p class="my-4">Hello from modal!</p>
		</b-modal>
	</div>
</template>
<script>
import { BButton, BTable } from 'bootstrap-vue'
export default {
	name: 'UserDataMaster',
	components: {
		BButton, BTable
	}
}
</script>