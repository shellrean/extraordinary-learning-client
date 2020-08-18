<template>
	<div class="d-flex flex-column-fluid">
		<div class="container">
			<div class="card card-custom">
				<div class="card-header pt-6">
					<h3 class="card-title align-items-start flex-column">
						<span class="card-label font-weight-bolder text-dark">Data sekolah</span>
						<span class="text-muted mt-1 font-weight-bold font-size-sm">Setting informasi & data sekolah</span>
					</h3>
					<div class="card-toolbar">
						<div class="form-group">
							<router-link :to="{ name: 'setting.dashboard' }" class="btn btn-light-primary mr-2">
								<i class="flaticon2-left-arrow-1"></i>Kembali
							</router-link>
							<button class="btn btn-primary" :disabled="isLoading" @click="submit">
								<i class="flaticon-doc"></i>{{ isLoading ? 'Processing...' : 'Simpan' }}
							</button>
						</div>
					</div>
				</div>
				<div class="card-body" v-if="typeof setting.settings != 'undefined'">
					<div class="form-group row">
						<label class="col-xl-3 col-lg-3 col-form-label text-right">Logo</label>
						<div class="col-lg-9 col-xl-6">
							<div class="image-input image-input-outline">
								<div class="image-input-wrapper" v-if="typeof setting.settings.logo != 'undefined'" :style="`background-image: url(${baseURL}/storage/${setting.settings.logo})`"></div>
								<div class="image-input-wrapper" v-else style="background-image: url(/img/logo.ico)"></div>
							</div>
							<div class="input-group">
								<b-form-file
								  accept=".jpg, .png, .jpeg"
							      v-model="file"
							      :state="Boolean(file)"
							      placeholder="Choose school's logo or drop it here..."
							      drop-placeholder="Drop file here..."
							    ></b-form-file>
							  	<div class="input-group-append">
							    	<button class="btn btn-primary" type="button" :disabled="isLoading" @click="upload">{{ isLoading ? 'Processing...' : 'Upload' }}</button>
							  	</div>
							</div>
							<span class="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-xl-3 col-lg-3 col-form-label text-right">Nama</label>
						<div class="col-lg-9 col-xl-6">
							<input class="form-control form-control-lg form-control-solid" type="text" v-model="setting.settings.name">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-xl-3 col-lg-3 col-form-label text-right">Email</label>
						<div class="col-lg-9 col-xl-6">
							<input class="form-control form-control-lg form-control-solid" type="email" v-model="setting.settings.email">
						</div>
					</div>
					<div class="form-group row">
						<label class="col-xl-3 col-lg-3 col-form-label text-right">Alamat</label>
						<div class="col-lg-9 col-xl-6">
							<input class="form-control form-control-lg form-control-solid" type="alamat" v-model="setting.settings.address">
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
import { BFormFile } from 'bootstrap-vue'

export default {
	name: 'SchoolSetting',
	components: {
		BFormFile
	},
	data: () => ({
		file: null
	}),
	computed: {
		...mapGetters(['isLoading', 'baseURL']),
		...mapState(['errors']),
		...mapState('setting', ['setting'])
	},
	methods: {
		...mapActions('setting', ['getDataSetting', 'storeDataSetting', 'storeDataSettingLogo']),
		async upload() {
			try {
				let formData = new FormData()
				formData.append('file', this.file)
				formData.append('name', 'school')

				await this.storeDataSettingLogo(formData)
				this.file = null
				this.$bvToast.toast('Logo berhasil diupload', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		},
		async submit() {
			try {
				await this.storeDataSetting()
				this.$bvToast.toast('Data informasi sekolah berhasil disimpan', successToas())
			} catch (error) {
				this.$bvToast.toast(error.message, errorToas())
			}
		}
	},
	created() {
		this.getDataSetting('school')
		.catch((error) => {
			this.$bvToast.toast(error.message, errorToas())
		})
	}
}
</script>