<template>
	<div class="d-flex flex-column flex-root">
		<!-- begin:: Header Mobile -->
	    <KTHeaderMobile></KTHeaderMobile>
	    <!-- end:: Header Mobile -->

		<!-- begin::Body -->
	    <div class="d-flex flex-row flex-column-fluid page" id="kt_body_content">

	    	<KTAside></KTAside>

	    	<div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
	    		<!-- begin:: Header -->
		        <KTHeader></KTHeader>
		        <!-- end:: Header -->

		        <!--begin::Content-->
				<div class="content d-flex flex-column flex-column-fluid" id="kt_content">
					<div class="subheader py-3 py-lg-8 subheader-transparent" id="kt_subheader">
						<div class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
							<div class="d-flex align-items-center flex-wrap mr-1">
								<div class="d-flex align-items-baseline flex-wrap mr-5">
									<h2 class="subheader-title text-dark font-weight-bold my-1 mr-3">Dashboard</h2>
									<!--begin::Breadcrumb-->
									<ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
										<li class="breadcrumb-item">
											<a href="" class="text-muted">Applications</a>
										</li>
										<li class="breadcrumb-item">
											<a href="" class="text-muted">Education</a>
										</li>
										<li class="breadcrumb-item">
											<a href="" class="text-muted">School</a>
										</li>
										<li class="breadcrumb-item">
											<a href="" class="text-muted">Dashboard</a>
										</li>
									</ul>
									<!--end::Breadcrumb-->
								</div>
							</div>
							<!--begin::Toolbar-->
							<div class="d-flex align-items-center">
								<a href="#" class="btn btn-fixed-height btn-white btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2">
									<span class="svg-icon svg-icon-success svg-icon-lg">
										<!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Add-user.svg-->
										<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
											<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<polygon points="0 0 24 0 24 24 0 24" />
												<path d="M18,8 L16,8 C15.4477153,8 15,7.55228475 15,7 C15,6.44771525 15.4477153,6 16,6 L18,6 L18,4 C18,3.44771525 18.4477153,3 19,3 C19.5522847,3 20,3.44771525 20,4 L20,6 L22,6 C22.5522847,6 23,6.44771525 23,7 C23,7.55228475 22.5522847,8 22,8 L20,8 L20,10 C20,10.5522847 19.5522847,11 19,11 C18.4477153,11 18,10.5522847 18,10 L18,8 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
												<path d="M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z" fill="#000000" fill-rule="nonzero" />
											</g>
										</svg>
									</span>
									New Member
								</a>
							</div>
						</div>
					</div>
					<!--end::Subheader-->
					<!--begin::Entry-->
					<div class="d-flex flex-column-fluid">
						<div class="container">
							<div class="d-flex flex-column flex-md-row">
								<div class="flex-md-row-auto w-md-275px w-xl-325px">
									<div class="card card-custom gutter-b">
										<div class="card-body">
											<div class="d-flex justify-content-between flex-column h-100">
												<div class="h-100">
													<div class="d-flex flex-column flex-center">
														<div class="bgi-no-repeat bgi-size-cover rounded min-h-180px w-100" style="background-image: url(/img/img-70.jpg)"></div>
														<a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">Hopkins High School</a>
														<div class="font-weight-bold text-dark-50 font-size-sm pb-7">CV38+2J Palo Alto</div>
													</div>
												</div>
												<div class="pt-1">
													<div class="d-flex align-items-center pb-9">
														<div class="symbol symbol-45 symbol-light mr-4">
															<span class="symbol-label">
																<span class="svg-icon svg-icon-2x svg-icon-dark-50">
																	<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																		<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																			<rect x="0" y="0" width="24" height="24" />
																			<rect fill="#000000" opacity="0.3" x="13" y="4" width="3" height="16" rx="1.5" />
																			<rect fill="#000000" x="8" y="9" width="3" height="11" rx="1.5" />
																			<rect fill="#000000" x="18" y="11" width="3" height="9" rx="1.5" />
																			<rect fill="#000000" x="3" y="13" width="3" height="7" rx="1.5" />
																		</g>
																	</svg>
																</span>
															</span>
														</div>
														<div class="d-flex flex-column flex-grow-1">
															<a href="#" class="text-dark-75 text-hover-primary mb-1 font-size-lg font-weight-bolder">Grade</a>
															<span class="text-muted font-weight-bold">Good Fellas</span>
														</div>
														<span class="font-weight-bolder label label-xl label-light-success label-inline px-3 py-5 min-w-45px">3.2</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="flex-md-row-fluid ml-md-6 ml-lg-8">
									<div class="row">
										<div class="col-xxl-6">
											<div class="card card-custom gutter-b">
												<div class="card-body">
													<div class="d-flex align-items-center">
														<div class="symbol symbol-40 symbol-light-success mr-5">
															<span class="symbol-label">
																<img src="/img/007-boy-2.svg" class="h-75 align-self-end" alt="" />
															</span>
														</div>
														<span class="text-muted font-weight-bold font-size-lg">
															What's on your mind, Jerry?
														</span>
													</div>
												</div>
											</div>
										</div>
										<div class="col-xxl-6">
											<div class="card card-custom gutter-b">
												<div class="card-header border-0 pt-5">
													<h3 class="card-title align-items-start flex-column">
														<span class="card-label font-weight-bolder text-dark">Upcoming Events</span>
														<span class="text-muted mt-3 font-weight-bold font-size-sm">Next Event is in
														<span class="text-primary">9 days</span></span>
													</h3>
													<div class="card-toolbar">
														<ul class="nav nav-pills nav-pills-sm nav-dark-75">
															<li class="nav-item">
																<a class="nav-link py-2 px-4 active font-weight-bolder" data-toggle="tab" href="#kt_tab_pane_3">Tomorrow</a>
															</li>
															<li class="nav-item">
																<a class="nav-link py-2 px-4 font-weight-bolder" data-toggle="tab" href="#kt_tab_pane_4">Today</a>
															</li>
														</ul>
													</div>
												</div>
												<div class="card-body pt-2 pb-0 mt-n3">
													<div class="tab-content mt-5" id="myTabContent">
														<div class="tab-pane fade show active" id="kt_tab_pane_3" role="tabpanel" aria-labelledby="kt_tab_pane_1">
															<div class="table-responsive">
																<table class="table table-borderless table-vertical-center">
																	<thead>
																		<tr>
																			<th class="p-0 w-50px"></th>
																			<th class="p-0 w-100 min-w-100px"></th>
																			<th class="p-0"></th>
																			<th class="p-0 min-w-130px w-100"></th>
																		</tr>
																	</thead>
																	<tbody>
																		<tr>
																			<td class="pl-0 py-5">
																				<div class="symbol symbol-45 symbol-light-info mr-2">
																					<span class="symbol-label">
																						<span class="svg-icon svg-icon-2x svg-icon-info">
																							<!--begin::Svg Icon | path:assets/media/svg/icons/Design/Color-profile.svg-->
																							<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																								<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																									<rect x="0" y="0" width="24" height="24" />
																									<path d="M12,10.9996338 C12.8356605,10.3719448 13.8743941,10 15,10 C17.7614237,10 20,12.2385763 20,15 C20,17.7614237 17.7614237,20 15,20 C13.8743941,20 12.8356605,19.6280552 12,19.0003662 C11.1643395,19.6280552 10.1256059,20 9,20 C6.23857625,20 4,17.7614237 4,15 C4,12.2385763 6.23857625,10 9,10 C10.1256059,10 11.1643395,10.3719448 12,10.9996338 Z M13.3336047,12.504354 C13.757474,13.2388026 14,14.0910788 14,15 C14,15.9088933 13.7574889,16.761145 13.3336438,17.4955783 C13.8188886,17.8206693 14.3938466,18 15,18 C16.6568542,18 18,16.6568542 18,15 C18,13.3431458 16.6568542,12 15,12 C14.3930587,12 13.8175971,12.18044 13.3336047,12.504354 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" />
																									<circle fill="#000000" cx="12" cy="9" r="5" />
																								</g>
																							</svg>
																							<!--end::Svg Icon-->
																						</span>
																					</span>
																				</div>
																			</td>
																			<td class="pl-0">
																				<a href="#" class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg">The School Art Leads</a>
																				<span class="text-muted font-weight-bold d-block">By Ellie Cole</span>
																			</td>
																			<td class="text-left">
																				<span class="text-dark-75 font-weight-bolder d-block font-size-lg">03 Sep, 4:20PM</span>
																				<span class="text-muted font-weight-bold d-block font-size-sm">Time</span>
																			</td>
																			<td class="text-right pr-0">
																				<a href="#" class="btn btn-icon btn-light btn-sm">
																					<span class="svg-icon svg-icon-md svg-icon-success">
																						<!--begin::Svg Icon | path:assets/media/svg/icons/Navigation/Arrow-right.svg-->
																						<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
																							<g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
																								<polygon points="0 0 24 0 24 24 0 24" />
																								<rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-90.000000) translate(-12.000000, -12.000000)" x="11" y="5" width="2" height="14" rx="1" />
																								<path d="M9.70710318,15.7071045 C9.31657888,16.0976288 8.68341391,16.0976288 8.29288961,15.7071045 C7.90236532,15.3165802 7.90236532,14.6834152 8.29288961,14.2928909 L14.2928896,8.29289093 C14.6714686,7.914312 15.281055,7.90106637 15.675721,8.26284357 L21.675721,13.7628436 C22.08284,14.136036 22.1103429,14.7686034 21.7371505,15.1757223 C21.3639581,15.5828413 20.7313908,15.6103443 20.3242718,15.2371519 L15.0300721,10.3841355 L9.70710318,15.7071045 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.999999, 11.999997) scale(1, -1) rotate(90.000000) translate(-14.999999, -11.999997)" />
																							</g>
																						</svg>
																						<!--end::Svg Icon-->
																					</span>
																				</a>
																			</td>
																		</tr>
																	</tbody>
																</table>
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
					</div>
				</div>
				<!--begin::Footer-->
				<div class="footer bg-white py-4 d-flex flex-lg-column" id="kt_footer">
					<!--begin::Container-->
					<div class="container d-flex flex-column flex-md-row align-items-center justify-content-between">
						<!--begin::Copyright-->
						<div class="text-dark order-2 order-md-1">
							<span class="text-muted font-weight-bold mr-2">2020©</span>
							<a href="#" target="_blank" class="text-dark-75 text-hover-primary">Dian E Learning Application</a>
						</div>
						<!--end::Copyright-->
						<!--begin::Nav-->
						<div class="nav nav-dark order-1 order-md-2">
							<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pr-3 pl-0">About</a>
							<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link px-3">Team</a>
							<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-3 pr-0">Contact</a>
						</div>
						<!--end::Nav-->
					</div>
					<!--end::Container-->
				</div>
				<!--end::Footer-->
	    	</div>
	    </div>

	</div>
</template>

<script>
import KTAside from '@/components/aside/Aside'
import KTHeader from '@/components/header/Header'
import KTHeaderMobile from '@/components/header/HeaderMobile'

export default {
	name: 'Coba',
	components: {
		KTHeader,
		KTAside,
		KTHeaderMobile
	}
}
</script>