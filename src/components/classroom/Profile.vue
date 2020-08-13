<template>
	<div class="card card-custom gutter-b">
		<div class="card-body">
			<div class="d-flex justify-content-between flex-column h-100">
				<div class="h-100">
					<div class="d-flex flex-column flex-center">
						<div class="bgi-no-repeat bgi-size-cover rounded min-h-180px w-100" style="background-image: url(/media/svg/banner/svg-science.svg)"></div>
						<a href="#" class="card-title font-weight-bolder text-dark-75 text-hover-primary font-size-h4 m-0 pt-7 pb-1">XII MIPA</a>
						<div class="font-weight-bold text-dark-50 font-size-sm pb-7">Tingkat 12, IPA</div>
					</div>
					<div class="pt-1">
						<!---- -->
					</div>
					<div class="d-flex flex-center">
						<router-link :to="{ name: 'master.classroom.live.add', params: { id: $route.params.id }}" class="btn btn-primary font-weight-bolder font-size-sm py-3 px-14">Mulai Kelas</router-link>
					</div>
					<div class="d-flex flex-center mt-2">
						<router-link :to="{ name:'master.classroom.me' }" class="btn btn-light-primary font-weight-bolder font-size-sm py-3 px-14">
							<i class="flaticon2-left-arrow-1"></i>Kembali ke list</router-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'ClassroomProfile'
}
</script>