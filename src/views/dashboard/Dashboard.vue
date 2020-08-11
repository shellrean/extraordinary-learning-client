<template>
	<div class="d-flex flex-column flex-root">
		<div class="d-flex flex-column-fluid">
			<div class="container">
				<div class="d-flex flex-column flex-md-row">
					<div class="flex-md-row-auto w-md-275px w-xl-325px">
						<SchoolProfile />
					</div>
					<div class="flex-md-row-fluid ml-md-6 ml-lg-8">
						<div class="row">
							<div class="col-xxl-6">
								<SchoolInfo />
							</div>
							<div class="col-xxl-6">
								<SchoolEvent />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import SchoolProfile from '@/components/school/Profile'
import SchoolInfo from '@/components/school/Information'
import SchoolEvent from '@/components/school/UpcommingEvent'

export default {
	name: 'SchoolDashboard',
	components: {
		SchoolProfile,
		SchoolInfo,
		SchoolEvent
	}
}

</script>